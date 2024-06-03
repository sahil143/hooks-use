import fs from "node:fs";
import { HOOKS_JSON } from "./const";

type HooksList = {
  name: string;
  slug: string;
};

export const getHookList = (): HooksList[] => {
  const hooks = fs.readFileSync(HOOKS_JSON).toString();
  try {
    return JSON.parse(hooks);
  } catch (e) {
    console.log("Error while parsing the list of hooks", e);
  }
  return [];
};
