<script lang="ts">
	import { onMount, type Snippet } from "svelte";

	type SVGs = "hamburger" | "rss" | "search" | "themer";
	type Props = { activeURLPath: string } & Record<SVGs, Snippet>;
	const { activeURLPath, hamburger, rss, search, themer }: Props = $props();

	type Item = { name: string; path: string };
	const navigationList: Item[] = [
		{ name: "/home", path: "/playground" },
		{ name: "/tech", path: "/tech" },
	];

	const iconList = [
		{ name: "/rss.xml", snippet: rss },
		{ name: "Search content", snippet: search },
		{ name: "Change Theme", snippet: themer },
	];

	const isActive = (item: Item) => activeURLPath === item.path;

	let autoToggle = $state(true);
	let burger = $state(true);
	let toggleBurger = () => {
		burger = !burger;
	};

	let ticking: number | boolean = false;
	const listener = () => {
		if (!autoToggle) return;
		ticking ||= requestAnimationFrame(() => {
			burger = window.scrollY === 0;
			ticking = false;
		});
	};

	onMount(() => {
		const sizer = window.matchMedia("(min-width: 768px)");
		burger = sizer.matches;
		autoToggle = sizer.matches;
		sizer.addEventListener("change", (e) => {
			autoToggle = e.matches;
		});
	});
</script>

<svelte:document onscroll={listener} />

<header>
	<nav>
		<h2 class="sr-only">Sections of the website</h2>
		<button
			type="button"
			aria-label="Link navigation list"
			aria-controls="link-navigation"
			aria-expanded={burger}
			onclick={toggleBurger}>{@render hamburger()}</button
		>
		<ol id="link-navigation" style:--total-count={navigationList.length}>
			{#each navigationList as item, index}
				<li style:--count={index + 1} data-visible={burger}>
					<a href={item.path} data-active={isActive(item)}>{item.name}</a>
				</li>
			{/each}
		</ol>
		<ol style:--total-count={iconList.length}>
			{#each iconList as item, index}
				<li
					style:--count={index + 1}
					data-visible={!burger}
					data-disabled={autoToggle}
				>
					{#if item.name.startsWith("/")}
						<a href={item.name}>{@render item.snippet()}</a>
					{:else}
						<button type="button" aria-label={item.name}
							>{@render item.snippet()}</button
						>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
</header>

<style>
	header {
		z-index: var(--z-header);
		position: sticky;
		top: 0;

		max-width: 56rem;
		padding: 18px 24px;
		margin: 0 auto;
	}

	nav,
	ol {
		display: flex;
		align-items: center;
		gap: 24px;
		--slide-coefficient: -2em;
	}

	nav {
		position: relative;
		padding: 6px 16px;
		border: 1px solid #1d1d1b;

		&:after {
			content: "";
			height: 100%;
			width: 100%;
			z-index: -2;

			position: absolute;
			top: 5px;
			left: 5px;

			background-color: oklch(100% 0 0 / 33%);
			box-shadow: 0 4px 30px oklch(0% 0 0 / 10%);
			backdrop-filter: blur(8.2px);
		}
	}

	[aria-controls="link-navigation"] {
		position: relative;
		border: none;
		background-color: inherit;

		&:after {
			content: "";
			height: 0px;
			width: 0px;
			z-index: -1;

			position: absolute;
			top: 50%;
			left: 50%;

			transform: translate(-50%, -50%);
			border-radius: 25%;
			background-color: var(--color-divider);
			transition:
				width 200ms,
				height 200ms;
		}

		:global(path) {
			fill: none;
			stroke-width: 6;
			transition:
				stroke-dasharray 200ms ease-in,
				stroke-dashoffset 200ms ease-in;

			&:nth-child(1) {
				stroke-dasharray: 40 130;
			}
			&:nth-child(2) {
				stroke-dasharray: 40 140;
			}
			&:nth-child(3) {
				stroke-dasharray: 40 205;
			}
		}

		:global(svg) {
			transition: transform 400ms;
		}

		&[aria-expanded="true"] {
			&:after {
				height: 40px;
				width: 40px;
			}

			:global(path) {
				&:nth-child(1) {
					stroke-dasharray: 75 130;
					stroke-dashoffset: -63px;
				}
				&:nth-child(2) {
					stroke-dashoffset: -102px;
				}
				&:nth-child(3) {
					stroke-dasharray: 110 205;
					stroke-dashoffset: -86px;
				}
			}
		}
	}

	li:not([data-disabled="true"]) {
		transition:
			transform ease-out 500ms,
			opacity ease-out 500ms;
		font: var(--fonts-lg) var(--fonts-header);

		transition-delay: calc(var(--count) * 50ms);
		transform: translateX(calc(var(--count) * var(--slide-coefficient)));
		opacity: 0;

		&[data-visible="true"] {
			transition-delay: calc((var(--total-count) - var(--count)) * 50ms);
			transform: translateX(0);
			opacity: 1;
		}
	}

	a {
		display: block;
		text-decoration-line: none;
		color: var(--color-main);

		background: no-repeat 100% 100%/ 0% 0.1em
			linear-gradient(var(--color-main), var(--color-focus));
		transition: background-size 200ms ease-in-out;

		&:focus,
		&:hover {
			background-size: 100% 0.1em;
			background-position-x: 0%;
			outline: none;
		}

		&[data-active] {
			color: var(--color-focus);
			font-weight: 700;
		}
	}

	ol:nth-child(4) {
		margin: 0 7px 0 auto;
		gap: 8px;
		--slide-coefficient: 0.3em;

		:global(li),
		:global(a),
		:global(button) {
			display: grid;
			place-items: center;
			width: 40px;
			height: 40px;
		}

		:global(a),
		:global(button) {
			padding: 0;
			background: inherit;
			color: inherit;
			border: 0;
		}
	}
</style>
