import { chalk, path } from "zx";
import { DOCS_DIR, TYPEDOC_DIR } from "./const.mjs";
import { generateMdxDoc, getHooksObj, writeFile } from "./hooks.utils.mjs";

// remove generated files and folders
await $`rm -rf ${TYPEDOC_DIR}`;
await $`rm -rf ${DOCS_DIR}`;

// generate docs using typedoc
await $`typedoc`;

const hooks = getHooksObj();

for (const hk of hooks) {
  generateMdxDoc(hk);
  console.log(chalk.green(`Generated docs for ${hk.name}`));
}

const hooksJSONPath = path.join(DOCS_DIR, "..", "hooks.json");

writeFile(JSON.stringify(hooks), hooksJSONPath);
console.log(chalk.green(`Generated JSON file for hooks:`, hooksJSONPath));
