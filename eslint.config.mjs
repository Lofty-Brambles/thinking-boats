import astro from "eslint-plugin-astro";
import ts from "typescript-eslint";
import js from "@eslint/js";
import { browser } from "globals";

const ignores = ["dist/", ".astro/", "node_modules/", "pnpm-lock.yaml"];
const browserScriptPath = "src/assets/scripts/**";

export default ts.config(
	{ ignores },
	js.configs.recommended,
	ts.configs.strict,
	ts.configs.stylistic,
	astro.configs["recommended"],
	astro.configs["jsx-a11y-strict"],
	{
		files: [browserScriptPath],
		languageOptions: { globals: browser },
	},
);
