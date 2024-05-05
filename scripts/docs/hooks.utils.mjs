import { fs, path } from "zx";
import { DOCS_DIR, HOOKS_DIR, TYPEDOC_DIR } from "./const.mjs";

const findAllIndexes = (arr, element) =>
  arr.reduce((indexes, el, i) => {
    if (el === element) indexes.push(i);
    return indexes;
  }, []);

/**
 * get the name from the hook path
 * @param {String} str string containing hook path ex: useHook/useHook
 * @returns hook name ex: useHook
 */
const getName = (str) => {
  return str.split("/")[1];
};

/**
 *
 * @param {String} name string containing hook name ex: useHook
 * @returns hook slug ex: use-hook;
 */
const getSlug = (name) => {
  return name.replace(/([A-Z])/g, (l) => `-${l.toLowerCase()}`);
};

/**
 * generate a object that contains all the hooks that has type definitions
 */
export const getHooksObj = () => {
  const buffer = fs.readFileSync(path.join(TYPEDOC_DIR, "hooks.json"));
  const hooksJSON = buffer.toString();
  return JSON.parse(hooksJSON).children.map((h) => {
    const name = getName(h.name);
    const slug = getSlug(name);
    const source = path.join(HOOKS_DIR, `${h.name}.ts`);
    const docsDir = path.join(DOCS_DIR, `${slug}.md`);
    return {
      name,
      slug,
      source,
      dirName: h.name,
      docsDir,
    };
  });
};

/** Read/Write file utils */

export const readFile = (path) => {
  return fs.readFileSync(path).toString();
};

/**
 * @param {Object} hook Object containing hook name, slug, path, source directory
 * @returns return type doc definition for the given hook
 */
export const readTypeDoc = (hook) => {
  const mdFileName = `${hook.dirName.split("/").join("_")}.md`;
  const filePath = path.join(TYPEDOC_DIR, "modules", mdFileName);
  return readFile(filePath);
};

/**
 * @param {Object} hook Object containing hook name, slug, path, source directory
 * @returns return README file content for the given hook
 */
export const readReadMe = (hook) => {
  const readmeFilePath = path.join(HOOKS_DIR, hook.name, "README.md");
  return readFile(readmeFilePath);
};

/**
 * @param {Object} hook Object containing hook name, slug, path, source directory
 * @returns hook file content from src/hooks/*
 */
export const readHook = (hook) => {
  return readFile(hook.source);
};

export const writeFile = (content, path) => {
  fs.writeFileSync(path, content);
};

/** transform data utils */

const setupExtractDocs = (start, end) => (str) => {
  const lines = str.split("\n");

  const startIndex = lines.findIndex((l) => l === start);
  if (startIndex === -1) return "";
  const endIndex = end ? lines.findIndex((l) => l === end) : undefined;

  return lines.slice(startIndex + 1, endIndex).join("\n");
};

/**
 *
 * @param {String} str content of md file
 * @returns type aliases section from content
 */
const extractTypeAliases = setupExtractDocs("## Type Aliases", "## Functions");

/**
 *
 * @param {String} str content of md file
 * @returns hook definition section from content
 */
const extractHookDocs = setupExtractDocs(`## Functions`);

/**
 *
 * @param {String} str content of md file
 * @returns removes "#### Defined in" senction from content
 */
const removeDefinedInSection = (str) => {
  let lines = str.split("\n");
  const allOccurences = findAllIndexes(lines, "#### Defined in");

  for (const i in allOccurences) {
    lines.splice(allOccurences[i] - i * 3, 3);
  }

  return lines.join("\n");
};

const removeSignatureFromReadme = (str) => {
  let lines = str.split("\n");
  const startIndex = lines.findIndex((l) => l === "#### Signature");
  const endIndex = lines.findIndex((l) => l === "## Usage");
  const start = lines.slice(0, startIndex);
  const end = lines.slice(endIndex);
  return [...start, ...end].join("\n");
};

const setUpChangeFileReferences = (hook) => (content) => {
  return content.replace(
    new RegExp(`${hook.name}_${hook.name}.md`, "g"),
    `${hook.slug}.md`,
  );
};

const removeTypeDocsFromCode = (code) =>
  code.replace(/\/\*\*(.|[\r\n])*?\*\//g, "");

/**
 *
 * @param {Object} hook Object containing hook name, slug, path, source directory
 */
export const generateMdxDoc = (hook) => {
  const typeDocContent = readTypeDoc(hook);
  const changeFileReferences = setUpChangeFileReferences(hook);
  const typeAlias = changeFileReferences(
    removeDefinedInSection(extractTypeAliases(typeDocContent)),
  );
  const hookDefinition = changeFileReferences(
    removeDefinedInSection(extractHookDocs(typeDocContent)),
  );

  const readMeData = removeSignatureFromReadme(readReadMe(hook));

  const hookCode = removeTypeDocsFromCode(readHook(hook));

  const content = `
${readMeData}

## API

${hookDefinition}
${
  typeAlias.length > 1
    ? `

## Type Aliases
${typeAlias}

`
    : ""
}
## Code

\`\`\`tsx
${hookCode}
\`\`\`
`;

  fs.ensureDirSync(DOCS_DIR);
  writeFile(content, hook.docsDir);
};
