import fs from "fs";
import path from "path";

const DIST_PATH = path.resolve("./dist");
const DOCS_PATH = path.join(DIST_PATH, "docs");
const HOOKS_JSON = path.join(DIST_PATH, "hooks.json");

export const getHooksList = () => fs.readFileSync(HOOKS_JSON).toString();

export const getHooksContent = () => {
  const hooksList = getHooksList();
  return JSON.parse(hooksList).reduce((docsObj, h: { slug: string }) => {
    const mdContent = fs
      .readFileSync(path.join(DOCS_PATH, `${h.slug}.md`))
      .toString();
    docsObj[h.slug] = mdContent;
    return docsObj;
  }, {});
};
