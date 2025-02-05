<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = { activeURLPath: string; children: Snippet };
	const { activeURLPath, children }: Props = $props();

	type Item = { name: string; path: string };
	const navigationList: Item[] = [
		{ name: "/home", path: "/playground" },
		{ name: "/tech", path: "/tech" },
	];

	const isActive = (item: Item) => activeURLPath === item.path;

	let burger = $state(true);
	let toggleBurger = () => {
		burger = !burger;
	};

	let ticking: number | boolean = false;
	const listener = () => {
		ticking ||= requestAnimationFrame(() => {
			burger = window.scrollY === 0;
			ticking = false;
		});
	};
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
			onclick={toggleBurger}>{@render children()}</button
		>
		<ul
			role="list"
			id="link-navigation"
			style:--total-count={navigationList.length}
		>
			{#each navigationList as item, index}
				{@render NavigationItem(item, index)}
			{/each}
		</ul>
	</nav>
</header>

{#snippet NavigationItem(item: Item, index: number)}
	<li style:--count={index + 1} data-visible={burger}>
		<a href={item.path} data-active={isActive(item)}>{item.name}</a>
	</li>
{/snippet}

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
	ul {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	nav {
		position: relative;
		padding: 6px 16px;
		border: 1px solid #1d1d1b;

		&:after {
			content: "";
			height: 100%;
			width: 100%;
			z-index: -1;

			position: absolute;
			top: 7px;
			left: 7px;

			background-color: oklch(100% 0 0 / 33%);
			box-shadow: 0 4px 30px oklch(0% 0 0 / 10%);
			backdrop-filter: blur(8.2px);
		}
	}

	button {
		border: none;
		background-color: inherit;

		:global(path) {
			stroke: #1d1d1b;
			stroke-linecap: round;
			stroke-width: 6;
			fill: none;

			transition:
				stroke-dasharray 0.2s ease-in,
				stroke-dashoffset 0.2s ease-in;

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

		&[aria-expanded="true"] :global(path) {
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

	li {
		transition:
			transform ease-out 500ms,
			visibility ease-out 500ms,
			opacity ease-out 500ms;
		font: var(--fonts-lg) var(--fonts-header);

		transition-delay: calc(var(--count) * 50ms);
		transform: translateX(calc(var(--count) * -2em));
		visibility: hidden;
		opacity: 0;

		&[data-visible="true"] {
			transition-delay: calc((var(--total-count) - var(--count)) * 50ms);
			transform: translateX(0);
			visibility: visible;
			opacity: 1;
		}
	}

	a {
		display: block;
		text-decoration-line: none;
		color: var(--color-main);

		background: no-repeat 100% 100%/ 0% 0.1em
			linear-gradient(var(--color-main), var(--color-focus));
		transition: background-size 0.2s ease-in-out;

		&:focus,
		&:hover {
			background-size: 100% 0.1em;
			background-position-x: 0%;
		}

		&[data-active] {
			color: var(--color-focus);
			font-weight: 700;
		}
	}
</style>
