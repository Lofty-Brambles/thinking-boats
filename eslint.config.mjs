import astro from "eslint-plugin-astro";
import ts from "typescript-eslint";
import js from "@eslint/js";
import globals from "globals";

const ignores = ["dist/", ".astro/", "node_modules/", "pnpm-lock.yaml"];
const browserScriptPath = "src/assets/scripts/**";

export default ts.config(
	{ ignores },
	js.configs.recommended,
	ts.configs.strict,
	ts.configs.stylistic,
	{
		rules: {
			"@typescript-eslint/consistent-type-imports": {
				fixStyle: "inline-type-imports",
			},
		},
	},
	astro.configs["recommended"],
	astro.configs["jsx-a11y-strict"],
	{
		files: [browserScriptPath],
		languageOptions: { globals: globals.browser },
	},
);
