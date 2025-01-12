import { defineConfig, envField } from "astro/config";

import type { AstroUserConfig } from "astro";

const schema: NonNullable<AstroUserConfig["env"]>["schema"] = {
	OGP_SITENAME: envField.string({ access: "public", context: "client" }),
};

export default defineConfig({
	env: { schema },
});
