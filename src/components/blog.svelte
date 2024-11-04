<script lang="ts">
	import { blogs as blogStore } from './../store/strapi';
	import Blog from '$component/blog/blog.svelte';
	import { fade } from "svelte/transition";
	import { strapi, type Post } from '$lib/strapi';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let blogs: Post[] = []
	let loaded = false;

	const refresh = () => {
		window.location.reload();
	}

	onMount(async () => {
		if (get(blogStore).length > 0) {
			blogs = get(blogStore);
			loaded = true;
			return;
		}

		blogs = (await strapi<[Post]>({
			endpoint: 'blogs?populate=tags&sort=publishedAt:desc',
			wrappedByKey: 'data',
		}));

		loaded = true;
		blogStore.set(blogs);
	})
</script>

<div in:fade={{ duration: 300 }} class="p-1 flex flex-row flex-wrap gap-4 h-auto md:overflow-y-auto md:overflow-x-hidden">
	{#if loaded && blogs.length > 0}
		{#each blogs as blog}
			<Blog 
				image={blog.image ?? undefined}
				name={blog.title ?? 'Unknown'}
				tags={blog.tags ?? {}} 
				shortDescription={blog.short_description}
				slug={blog.slug}  
			/>
		{/each}
	{:else if loaded}
		<span>Sorry! No available blogs were found, try again later.</span>
	{:else}
		<span>Loading blogs, if this takes long please try <button class="text-blue-500" on:click={refresh}>refreshing the page</button></span>
	{/if}
</div>