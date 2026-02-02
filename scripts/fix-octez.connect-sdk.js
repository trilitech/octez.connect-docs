const fs = require("fs");

function patchIndexedDBStorageInitAwait() {
  const storagePath =
    "./node_modules/@tezos-x/octez.connect-core/dist/cjs/storage/IndexedDBStorage.js";

  try {
    let source = fs.readFileSync(storagePath, { encoding: "utf8" });

    // Already patched?
    if (source.includes("this.dbInit = this.initDB()")) {
      return;
    }

    // 1) Store the init promise on the instance so transaction can await it.
    source = source.replace(
      /this\.initDB\(\)\s*\n\s*\.then\(\(db\) => \(this\.db = db\)\)\s*\n\s*\.catch\(\(err\) => logger\.error\(err\.message\)\);/,
      "this.dbInit = this.initDB()\n            .then((db) => (this.db = db))\n            .catch((err) => {\n            logger.error(err.message);\n            throw err;\n        });",
    );

    // 2) Await initialization at the top of `transaction`.
    source = source.replace(
      /return __awaiter\(this, void 0, void 0, function\* \(\) \{\s*\n\s*return new Promise\(\(resolve, reject\) => \{/, 
      "return __awaiter(this, void 0, void 0, function* () {\n            // Ensure DB initialization has completed before using `this.db`.\n            if (this.dbInit) {\n                try {\n                    yield this.dbInit;\n                }\n                catch (_) {\n                    // ignore, handled via isSupported/db checks below\n                }\n            }\n            return new Promise((resolve, reject) => {",
    );

    fs.writeFileSync(storagePath, source, { encoding: "utf8" });
  } catch (_) {
    // Best-effort: docs should still work even if patching fails.
  }
}

// const content = fs.readFileSync(
//     "./node_modules/@tezos-x/octez.connect-sdk/package.json",
//     { encoding: "utf8" }
//   );

//   const newContent = content
//     .split("dist/cjs/index.js")
//     .join("./dist/walletbeacon.min.js");

//   fs.writeFileSync("./node_modules/@tezos-x/octez.connect-sdk/package.json", newContent, {
//     encoding: "utf8",
//   });

const content = fs.readFileSync(
  "./node_modules/@tezos-x/octez.connect-sdk/dist/walletbeacon.min.js",
  { encoding: "utf8" }
);

// Keep the published entrypoints working for both webpack (ESM) and CJS consumers.
// Some bundlers (like Docusaurus/webpack) prefer the ESM export and will fail hard
// if `dist/esm/index.js` is missing.
fs.writeFileSync(
  "./node_modules/@tezos-x/octez.connect-sdk/dist/cjs/index.js",
  content,
  { encoding: "utf8" }
);

fs.mkdirSync("./node_modules/@tezos-x/octez.connect-sdk/dist/esm", {
  recursive: true,
});
fs.writeFileSync(
  "./node_modules/@tezos-x/octez.connect-sdk/dist/esm/index.js",
  content,
  { encoding: "utf8" }
);

// Ensure types can still be resolved via `types: dist/esm/index.d.ts`.
try {
  const cjsTypes = fs.readFileSync(
    "./node_modules/@tezos-x/octez.connect-sdk/dist/cjs/index.d.ts",
    { encoding: "utf8" }
  );
  fs.writeFileSync(
    "./node_modules/@tezos-x/octez.connect-sdk/dist/esm/index.d.ts",
    cjsTypes,
    { encoding: "utf8" }
  );
} catch (_) {}

patchIndexedDBStorageInitAwait();
