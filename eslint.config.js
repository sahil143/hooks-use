import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    ignores: [
      "*.config.{cjs,js,mjs}",
      "node_modules/*",
      "static/*",
      "*/dist/*",
      "@types/*",
      ".eslintrc.js",
    ],
  },
];
