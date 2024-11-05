<script lang="ts">
	import { Button } from '$component/ui/button';
	import { strapiImage, type Image, type Tag } from '$lib/strapi';
	import { navigate } from 'svelte-routing';
	import contrast from 'font-color-contrast';
	import SvelteMarkdown from 'svelte-markdown';
	
	export let image: Image | undefined = undefined;
	export let name: string;
	export let tags: {[key: number]: Tag};
	export let shortDescription: string | null;
	export let body: string | null;
	export let slug: string;

	$: tagArray = Object.values(tags);

	const open = (event: MouseEvent) => {
		event.preventDefault();
		navigate("/b/" + slug);
	}
</script>

<div class="flex flex-col gap-2 bg-card p-4 rounded-xl hover:rounded-md blog hover-custom-scale transition-all">
	{#if image}
		<img class="w-full h-24 object-contain rounded-md" src={strapiImage(image)} alt={name} />
	{/if}
	<p class="text-lg font-bold">{name}</p>
	<div class="flex flex-row gap-2">
		{#each tagArray as tag}
			<div 
				class="rounded-full text-xs h-4 px-2 text-black select-none"
				style={`background-color: ${tag.color}; color: ${contrast(tag.color)}`}
			>
				{tag.name}
			</div>
		{/each}
	</div>
	<div class="markdown overflow-hidden text-ellipsis">
		<SvelteMarkdown source={shortDescription ?? body} />
	</div>
	<Button variant="outline" class="bg-transparent mt-auto" on:click={open}>Read Article</Button>
</div>

<style>
	.hover-custom-scale:hover {
		transform: scale(1.015);
	}

	.blog {
		--per-row: 3;
		width: calc(100% / var(--per-row) - (0.5rem * (var(--per-row) - 1)));
		height: 24rem;
	}

	@media (max-width: 1470px) {
		.blog {
			--per-row: 2;
		}
	}

	@media (max-width: 768px) {
		.blog {
			--per-row: 1;
		}
	}
</style>