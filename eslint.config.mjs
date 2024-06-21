import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc"

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            globals: globals.node,
            sourceType: "module",
            ecmaVersion: "latest"
        },
        rules: {
            "indent": ["error", 4],
            "quotes": ["error", "double"],
            "arrow-spacing": ["warn", { "before": true, "after": true }],
            "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
            "semi": ["error", "always"],
        },
    },
    jsdoc.configs["flat/recommended"],
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
