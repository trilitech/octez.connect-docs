const fs = require("fs");

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

content = fs.readFileSync(
  "./node_modules/@tezos-x/octez.connect-sdk/dist/walletbeacon.min.js",
  { encoding: "utf8" }
);

const newContent = content;

fs.writeFileSync(
  "./node_modules/@tezos-x/octez.connect-sdk/dist/cjs/index.js",
  newContent,
  {
    encoding: "utf8",
  }
);

try {
  // remove if exists
  fs.rmdirSync("./node_modules/@tezos-x/octez.connect-sdk/dist/esm", { recursive: true });
} catch(_) {} 
