const fs = require("fs");

function patchIndexedDBStorageInitAwait() {
  const storagePath =
    "./node_modules/@tezos-x/octez.connect-core/dist/cjs/src/storage/IndexedDBStorage.js";

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

patchIndexedDBStorageInitAwait();
