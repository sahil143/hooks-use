#!/usr/bin/env zx

import { path, argv, fs, chalk } from "zx";
import Handlebars from "handlebars";

const newHookName = argv["n"] || argv["name"];

if (!newHookName) {
  throw new Error(
    `add flag -n or --name. It is required to determine the file name
     Example: --name useInterval
    `,
  );
}

const HOOKS_PATH = path.resolve(__dirname, "../../src/hooks");
const TEMPLATE_PATH = path.resolve(__dirname, "./template");

const getSourcePathForDir = (dirName) => {
  return `${HOOKS_PATH}/${dirName}`;
};

const generateTemplate = (blob, path, data) => {
  const template = Handlebars.compile(blob)(data);
  fs.outputFileSync(path, template);
};

const setupToGenerateFile = (source, destination) => {
  return (sourceFileName, destinationFileName) => {
    const blob = fs.readFileSync(path.join(source, sourceFileName));
    return (data) => {
      const dest = path.join(destination, destinationFileName);
      generateTemplate(blob.toString(), dest, data);
      console.log(
        chalk.green(
          `Generated file: src/hooks/${newHookName}/${destinationFileName}`,
        ),
      );
    };
  };
};

const newDir = getSourcePathForDir(newHookName);

/**
 * create a new dir in the hooks dir based on the name provided as argument
 */
await $`mkdir ${newDir}`;

/**
 * create __tests__ folder for *.spec.ts file
 */
await $`mkdir ${newDir}/__tests__`;

const generateFile = setupToGenerateFile(TEMPLATE_PATH, newDir);

const templateData = { hookName: newHookName };

/**
 * Generate test file
 */
generateFile(
  "hook.spec.ts.hbs",
  `__tests__/${newHookName}.spec.ts`,
)(templateData);

/**
 * Generate hook file
 */
generateFile("hook.ts.hbs", `${newHookName}.ts`)(templateData);

/**
 * Generate README.md
 */
generateFile("README.md.hbs", `README.md`)(templateData);

/**
 * Generate index.ts
 */
generateFile("index.ts.hbs", `index.ts`)(templateData);

/**
 * append new generate file export to hooks index.ts
 */
fs.appendFileSync(
  path.resolve(HOOKS_PATH, "index.ts"),
  `export * from './${newHookName}';\n`,
);
console.log(chalk.green("Updated file: /src/hooks/index.ts"));
