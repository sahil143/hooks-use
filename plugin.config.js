// import type { Plugin } from 'rollup';

export const contentPlugin = () => {
  return {
    name: "rollup-plugin-content",
    buildEnd(error) {
      console.log("Error at build end", error);
    },
    buildStart(options) {
      console.log("Build started", options);
    },
    load(id) {
      console.log("Load", id);
      return null;
    },
    moduleParsed(args) {
      console.log("moduleParsed", args);
    },
  };
};
