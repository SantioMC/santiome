<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { strapi, strapiImage, type Post } from '$lib/strapi';
	import { Button } from '$component/ui/button';
	import SvelteMarkdown from 'svelte-markdown';
	import { page } from '~/store/page';

	let latestPost: Post | undefined;
	let hasImage = false;

	onMount(async () => {
		const posts = await strapi<[Post]>({
			endpoint: 'blogs?populate=*&sort=createdAt:desc&pagination[pageSize]=1&filters[hidden][$ne]=true',
			wrappedByKey: 'data',
		});
		
		latestPost = posts[0]; 
		hasImage = latestPost.image !== null;
	})

	const open = (event: MouseEvent) => {
		if (!latestPost) return;
		event.preventDefault();
		window.open(`/b/${latestPost.slug}`);
	}
</script>

{#if latestPost && $page !== 'blog'}
	<div in:slide={{ duration: 300, axis: 'x' }} class="flex flex-col items-center gap-4 p-8 bg-card rounded-md grow text-clip w-full h-full" style={
		!hasImage ? 'height: auto; max-height: 100%;' : ''
	}>
		<h3 class="w-full text-lg font-bold select-none">
			Latest Blog
		</h3>
		{#if latestPost.image}
			<img src={strapiImage(latestPost.image)} alt="Latest Blog Post" class="w-full h-32 m-4" style={`object-fit: ${latestPost.banner_fit ?? 'fit'};`} />
		{/if}

		<h4 class="text-lg font-semibold" style={
			!hasImage ? 'width: 100%; font-weight: normal;' : ''
		}>{latestPost.title}</h4>
		<div class="markdown w-full text-sm overflow-hidden text-ellipsis">
			<SvelteMarkdown source={latestPost.short_description ?? latestPost.body} />
		</div>
		<Button variant="outline" class="bg-transparent mt-auto" on:click={open}>Read Article</Button>
	</div>
{/if}

<style>
	.grow {
		transition: all 0.2s ease-in-out;
	}
	
	.grow:hover {
		transform: scale(1.025);
	}
</style>