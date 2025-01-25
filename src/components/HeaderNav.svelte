<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = { activeURLPath: string; children: Snippet };
	const { activeURLPath, children }: Props = $props();

	type Item = { name: string; path: string };
	const navigationList: Item[] = [
		{ name: "Home", path: "/" },
		{ name: "Tech", path: "/tech" },
	];

	const isActive = (item: Item) => activeURLPath === item.path;

	let burger = $state(false);
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
		position: sticky;
	}
</style>

<!-- <style>
	:root {
		--border-black: #1d1d1b80;
		--button-svg-stroke: #1d1d1b;
		--prose-extent: 80ch;
		--z-topmost: 3;
		--font-size-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
		--icon-button-dimensions: 40px;
		--font-size-lg: clamp(1.12rem, 0.5vw + 1rem, 1.3rem);
		--line-height-lg: 1.75rem;
		--font-wt-bold: 700;
	}

	header {
		position: sticky;
		z-index: var(--z-topmost);
		top: 0;

		background-image: url(./paper-pattern.jpg);
		border-bottom: 1px solid var(--border-black);
	}

	nav,
	ul {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	nav {
		width: 100%;
		max-width: var(--prose-extent);
		margin: 0 auto;
		padding: 0.75rem;

		font: var(--font-size-base);
	}

	button {
		:global(path) {
			stroke: var(--button-svg-stroke);
			stroke-linecap: round;
			stroke-width: 10;
			fill: none;

			--burger-bezier: cubic-bezier(0.4, 0, 0.2, 1);
			transition:
				stroke-dasharray 0.6s var(--burger-bezier),
				stroke-dashoffset 0.6s var(--burger-bezier);

			&:nth-child(1),
			&:nth-child(3) {
				stroke-dasharray: 60 207;
			}

			&:nth-child(2) {
				stroke-dasharray: 60 60;
			}
		}

		:global(svg) {
			width: var(--icon-button-dimensions);
		}

		&[aria-expanded="true"] :global(path) {
			&:nth-child(1),
			&:nth-child(3) {
				stroke-dasharray: 90 207;
				stroke-dashoffset: -134;
			}

			&:nth-child(2) {
				stroke-dasharray: 1 60;
				stroke-dashoffset: -30;
			}
		}
	}

	li {
		transition:
			transform ease-out 500ms,
			visibility ease-out 500ms,
			opacity ease-out 500ms;
		font: var(--font-size-lg) / var(--line-height-lg);

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

		&[data-active] {
			/* color: ; */
			font-weight: var(--font-wt-bold);
			transform: scale(1.05);
		}
	}
</style> -->
