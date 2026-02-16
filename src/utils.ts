import * as beacon from "@tezos-x/octez.connect-sdk";
import * as ts from "typescript";

import * as taquito from "@tezos-x/octez.js";
import * as taquitoWallet from "@tezos-x/octez.js-dapp-wallet";

function replaceAll(string: string, search: string, replace: string) {
  return string.split(search).join(replace);
}

const rewriteImportsForRunner = (code: string) => {
  const lines = code.split("\n");
  const rewritten: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Convert supported imports into destructuring from the injected modules.
    // Example: import { DAppClient } from "@tezos-x/octez.connect-sdk";
    //   => const { DAppClient } = beacon;
    let match = trimmed.match(
      /^import\s+\{([^}]+)\}\s+from\s+["']@tezos-x\/octez\.connect-sdk["'];?\s*$/,
    );
    if (match) {
      rewritten.push(`const { ${match[1].trim()} } = beacon;`);
      continue;
    }

    match = trimmed.match(
      /^import\s+\{([^}]+)\}\s+from\s+["']@tezos-x\/octez\.js["'];?\s*$/,
    );
    if (match) {
      rewritten.push(`const { ${match[1].trim()} } = taquito;`);
      continue;
    }

    match = trimmed.match(
      /^import\s+\{([^}]+)\}\s+from\s+["']@tezos-x\/octez\.js-dapp-wallet\/dist\/octez\.js-beacon-wallet\.es6\.js["'];?\s*$/,
    );
    if (match) {
      rewritten.push(`const { ${match[1].trim()} } = taquitoWallet;`);
      continue;
    }

    // Drop any remaining import lines so TS transpile/eval won't choke.
    if (trimmed.startsWith("import ")) {
      continue;
    }

    rewritten.push(line);
  }

  return rewritten.join("\n");
};

const ensureBeaconIndexedDbStores = async () => {
  if (typeof window === "undefined" || !("indexedDB" in window)) {
    return;
  }

  const dbName = "beacon";
  const requiredStores = ["bug_report", "metrics"];

  const openDb = (version?: number) =>
    new Promise<IDBDatabase>((resolve, reject) => {
      const request =
        typeof version === "number"
          ? indexedDB.open(dbName, version)
          : indexedDB.open(dbName);

      request.onblocked = () =>
        reject(
          new Error(
            `IndexedDB upgrade blocked for '${dbName}'. Close other tabs using Octez Connect Docs and retry.`,
          ),
        );

      request.onupgradeneeded = () => {
        const db = request.result;
        requiredStores.forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
        });
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

  const db = await openDb();
  const missingStores = requiredStores.filter(
    (storeName) => !db.objectStoreNames.contains(storeName),
  );

  if (missingStores.length === 0) {
    db.close();
    return;
  }

  // Trigger an IndexedDB version upgrade to create missing stores.
  const nextVersion = (db.version || 1) + 1;
  db.close();
  const upgradedDb = await openDb(nextVersion);
  upgradedDb.close();
};

const patchBeaconMetricsStorage = () => {
  // In the bundled SDK, metrics persistence uses IndexedDB and can throw if
  // storage init is still in-flight. For docs/examples, metrics are non-critical,
  // so we swallow these errors to avoid crashing the runner.
  const maybeDAppClient = (beacon as any)?.DAppClient;
  const proto = maybeDAppClient?.prototype;
  if (!proto || typeof proto.updateMetricsStorage !== "function") {
    return;
  }

  if ((proto.updateMetricsStorage as any).__octezDocsPatched) {
    return;
  }

  // Metrics are not essential for the docs live runner; disable persistence.
  proto.updateMetricsStorage = async function () {
    return;
  };

  (proto.updateMetricsStorage as any).__octezDocsPatched = true;
};

const patchIndexedDbStorageTransaction = () => {
  const IndexedDBStorage = (beacon as any)?.IndexedDBStorage;
  const proto = IndexedDBStorage?.prototype;
  if (!proto || typeof proto.transaction !== "function") {
    return;
  }
  if ((proto.transaction as any).__octezDocsPatched) {
    return;
  }

  const original = proto.transaction;
  proto.transaction = async function (...args: any[]) {
    // Best-effort wait for async init (SDK initializes IDB in constructor).
    for (let i = 0; i < 50 && !this.db; i++) {
      await new Promise((r) => setTimeout(r, 10));
    }
    return original.apply(this, args);
  };

  (proto.transaction as any).__octezDocsPatched = true;
};

// Apply patches as soon as this module is imported.
patchBeaconMetricsStorage();
patchIndexedDbStorageTransaction();

export const runBeaconCode = (
  rawCode: string,
  setOutput: (str: string) => void,
) => {
  let code = rawCode;

  let output = "";
  const appendOutput = (str: string) => {
    output += "\n" + str;
    setOutput(output.trim());
  };

  const myLog = (...args: any[]) => {
    console.log("CODE_RUNNER:", ...args);
    appendOutput(
      args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg,
        )
        .join(" "),
    );
  };

  code = replaceAll(code, "console.log(", "progress(");
  code = rewriteImportsForRunner(code);
  code = ts.transpile(`({
      run: async (beacon: any, taquito: any, taquitoWallet: any, progress: any): string => {
        Object.keys(beacon).forEach(key => {
          window[key] = beacon[key]
        })
        Object.keys(taquito).forEach(key => {
          window[key] = taquito[key]
        })
        Object.keys(taquitoWallet).forEach(key => {
          window[key] = taquitoWallet[key]
        })
        return (async () => {
          ${code};
          if (typeof result !== 'undefined') {
            return result
          }
        })()
      })`);
  let runnable: any;
  // console.log("TRANSPILED code", code);
  return new Promise((resolve) => {
    // Keep patching here too in case of hot reload or import order.
    patchBeaconMetricsStorage();
    patchIndexedDbStorageTransaction();
    ensureBeaconIndexedDbStores()
      .catch((e) => {
        console.warn("Failed to init IndexedDB stores", e);
      })
      .finally(() => {
        try {
          runnable = eval(code);
          runnable
            .run(beacon, taquito, taquitoWallet, myLog)
            .then((result: string) => {
              if (result) {
                appendOutput("Returned:\n" + JSON.stringify(result, null, 2));
              }
              resolve(result);
            })
            .catch((err: any) => {
              console.warn(err);
              appendOutput(JSON.stringify(err, null, 2));
              resolve(err);
            });
        } catch (e) {
          appendOutput(e);
          console.error(e);
          resolve(e);
        }
      });
  });
};

export const copyShareUrl = (input: string) => {
  const url = `https://${window.location.host}/playground?code=${btoa(input)}`;

  navigator.clipboard
    .writeText(url)
    .catch((err) => console.error("Failed to copy to url!", err));
};

export const reset = async () => {
  const dAppClient = new beacon.DAppClient({ name: "Cleanup" });
  await dAppClient.destroy();
};
