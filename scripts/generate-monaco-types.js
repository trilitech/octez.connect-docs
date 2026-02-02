const fs = require("fs");
const getFilesRecursively = require("./get-files-in-folder");

const files = getFilesRecursively(
  "./node_modules/@tezos-x/"
).filter((file) => file.endsWith(".d.ts"));
files.push(
  ...getFilesRecursively("./node_modules/@tezos-x/").filter((file) =>
    file.endsWith(".d.ts")
  )
);

const getFile = (filename) => {
  const text = fs.readFileSync(filename, { encoding: "utf8" });

  return text;
};

const outArray = files.map((dir) => ({
  // Normalize the virtual library name for Monaco by stripping the local
  // node_modules prefix and some common build subpaths.
  name: dir.substring(15).split("/dist/cjs/").join("/").split("/dist/types/").join("/"),
  dts: getFile(dir),
}));

fs.writeFileSync(
  "./src/components/monaco-types.ts",
  `export const libs = ${JSON.stringify(outArray)}`
);
