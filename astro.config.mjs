// @ts-check
import { defineConfig, envField } from "astro/config";

const schema = {
	OGP_SITENAME: envField.string({ access: "public", context: "client" }),
};

// https://astro.build/config
export default defineConfig({ env: { schema } });
