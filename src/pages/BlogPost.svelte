<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { strapi, strapiImage, type Post } from '$lib/strapi';
	import Icon from '$component/ui/icon.svelte';
	import Button from '$component/ui/button/button.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { writable } from 'svelte/store';
	import { navigate } from 'svelte-routing';
	export let slug: string;

	const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });
	const WPM = 200;

	// Used for open graph
	let title = writable<string | undefined>(undefined);
	let description = writable<string | undefined>(undefined);
	let image = writable<string | undefined>(undefined);

	let bannerFit = 'fill';
	let loaded: boolean = false;
	let data: Post | undefined = undefined;
	let published: Date | undefined = undefined;
	let readTime = 1;

	const goBack = (event: MouseEvent) => {
		event.preventDefault();
		navigate('/');
	};

	onMount(async () => {
		data = (
			await strapi<[Post]>({
				endpoint: `posts?filters\[slug\][$eq]=${slug}&populate=*`,
				wrappedByKey: 'data'
			})
		)[0];

		published = new Date(data.publishedAt);
		title.set(data.title);
		description.set(data.short_description ?? data.body);

		if (data.image) image.set(strapiImage(data.image));
		if (data.banner_fit) bannerFit = data.banner_fit.toLowerCase();

		readTime = Math.max(1, Math.ceil(data.body.split(' ').length / WPM));
		loaded = true;
	});

	const refresh = () => {
		window.location.reload();
	};
</script>

<svelte:head>
	{#if $title}
		<meta property="og:site_name" content="santio.me" />
		<meta property="og:title" content={$title} />
		<title>santio.me | {$title}</title>
	{:else}
		<meta property="og:title" content="santio.me" />
		<title>santio.me</title>
	{/if}

	{#if $description}
		<meta property="og:description" content={$description} />
		<meta name="description" content={$description} />
	{:else}
		<meta
			property="og:description"
			content="A blog about topics that interest me or that I've experienced, come check it out!"
		/>
		<meta
			name="description"
			content="A blog about topics that interest me or that I've experienced, come check it out!"
		/>
	{/if}

	{#if $image}
		<meta property="og:image" content={$image} />
	{/if}
</svelte:head>

<main
	class="blog-post bg-background text-foreground flex flex-col gap-4 w-auto h-fit"
>
	<Button
		class="flex flex-row items-center gap-2 w-fit -translate-x-6"
		variant="ghost"
		on:click={goBack}
	>
		<Icon icon="arrow-left" size={1.5} />
		Back
	</Button>

	{#if loaded && data}
		<div class="flex flex-col gap-1">
			{#if $image}
				<!-- Image banner -->
				<img
					class="w-full h-24 my-8 rounded-md"
					style={`object-fit: ${bannerFit}`}
					src={$image}
					alt={data.title}
				/>
			{/if}

			<h1 class="text-3xl font-bold">{data.title}</h1>
			<div
				class="text-sm text-muted select-none flex flex-row flex-wrap items-center gap-1 metadata"
			>
				<p>Created by {data.author?.name ?? 'Unknown Author'}</p>
				{#if published}
					<span>•</span>
					<p>Published on {formatter.format(published)}</p>
				{/if}
				{#if data.hidden}
					<span>•</span>
					<p>Hidden post</p>
				{:else}
					<span>•</span>
					<p>{readTime} min read</p>
				{/if}
			</div>
		</div>

		<div class="markdown">
			<SvelteMarkdown source={data.body} />
		</div>
	{:else if !loaded}
		<span
			>Attempting to load post, if this takes long please try <button
				class="text-blue-500"
				on:click={refresh}>refreshing the page</button
			></span
		>
	{:else}
		<span
			>Failed to find this post, make sure the slug you provided is correct,
			alternatively you can <button class="text-blue-500" on:click={goBack}
				>go back</button
			> and try finding the post again</span
		>
	{/if}
</main>

<style>
	main {
		padding: 6rem 30%;
	}

	@media (max-width: 1100px) {
		.metadata {
			display: block;
			margin-bottom: 1rem;
		}

		.metadata > span {
			display: none;
		}
	}

	@media (max-width: 768px) {
		main {
			padding: 6rem 10%;
		}
	}
</style>
