import { defineConfig, envField } from "astro/config";
import svelte from "@astrojs/svelte";

import type { AstroIntegration, AstroUserConfig } from "astro";

const schema: NonNullable<AstroUserConfig["env"]>["schema"] = {
	OGP_SITENAME: envField.string({ access: "public", context: "client" }),
};

const integrations: AstroIntegration[] = [svelte()];

export default defineConfig({
	experimental: { contentIntellisense: true, svg: { mode: "sprite" } },
	env: { schema },
	integrations,
});
