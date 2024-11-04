<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { strapi, type Post } from "$lib/strapi";
	import Icon from "$component/ui/icon.svelte";
	import Button from "$component/ui/button/button.svelte";
	import SvelteMarkdown from "svelte-markdown";
	import { page } from "~/store/page";
	export let slug: string;

	let loaded: boolean = false;
	let data: Post | undefined = undefined;
	
	const goBack = (event: MouseEvent) => {
		event.preventDefault();
		window.history.back();
	}

	onMount(async () => {
		data = (await strapi<[Post]>({
			endpoint: `blogs?filters\[slug\][$eq]=${slug}&populate=*`,
			wrappedByKey: 'data',
		}))[0];

		loaded = true;
	})

	const refresh = () => {
		window.location.reload();
	}
</script>

<main class="blog-post bg-background text-foreground flex flex-col gap-4 w-auto h-fit">
	<Button class="flex flex-row items-center gap-2 w-fit -translate-x-6" variant="ghost" on:click={goBack}>
		<Icon icon="arrow-left" size={1.5} />
		Back
	</Button>

	{#if loaded && data}
		<div class="flex flex-col gap-1">
			<h1 class="text-3xl font-bold">{data.title}</h1>
			<p class="text-sm text-muted select-none">Created by {data.author?.name ?? 'Unknown Author'}</p>
		</div>

		<SvelteMarkdown source={data.body} />
	{:else if !loaded}
		<span>Attempting to load post, if this takes long please try <button class="text-blue-500" on:click={refresh}>refreshing the page</button></span>
	{:else}
		<span>Failed to find this post, make sure the slug you provided is correct, alternatively you can <button class="text-blue-500" on:click={goBack}>go back</button> and try finding the post again</span>
	{/if}
</main>

<style>
	main {
		padding: 6rem 30%; 
	}

	:global(.blog-post h1) {
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: bold;
	}

	:global(.blog-post h2) {
		font-size: 1.3rem;
		line-height: 1.2;
		font-weight: bold;
	}

	:global(.blog-post h3) {
		font-size: 1.2rem;
		line-height: 1.15;
	}

	:global(.blog-post h4) {
		font-size: 1.1rem;
		line-height: 1.1;
	}

	:global(.blog-post h5) {
		font-size: 1rem;
		line-height: 1.1;
	}

	:global(.blog-post ul > li) {
		display: list-item;
		list-style-type: disc;
		margin-left: 1em;
	}

	:global(.blog-post ol > li) {
		display: list-item;
		list-style-type: decimal;
		margin-left: 1em;
	}

	:global(.blog-post a) {
		color: #3b82f6;
	}

	:global(.blog-post a:hover) {
		color: #2d69f3;
	}

	:global(.blog-post pre:has(code)) {
		width: 100%;
		color: hsl(var(--card-foreground));
		background-color: hsl(var(--card)); 
		border-radius: 3px;
		padding: 1em 1em;
	}

	:global(.blog-post blockquote) {
		border-left: 4px solid hsl(var(--card));
		padding-left: 1em;
	}

	@media (max-width: 768px) {
		main {
			padding: 6rem 10%;
		}
	}
</style>