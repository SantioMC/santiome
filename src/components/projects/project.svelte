<script lang="ts">
	import Icon from "$component/ui/icon.svelte";
	import { slide } from 'svelte/transition';
	import Button from "$component/ui/button/button.svelte";
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import { reference } from "~/store/page";
	import { strapiImage, type Image, type Tag } from "$lib/strapi";
	import contrast from 'font-color-contrast';
	import SvelteMarkdown from "svelte-markdown";

	export let image: Image | undefined;
	export let name: string;
	export let tags: {[key: number]: Tag};
	export let description: string = '';
	export let link: string | undefined = undefined;
	export let source: string | undefined = undefined;

	$: tagArray = Object.values(tags);

	let open = false;

	const toggle = () => {
		if (description === '') return;
		open = !open;
	}

	onMount(async () => {
		const ref = get(reference);
		if (!ref) return;
		
		if (ref.toLowerCase() == name.toLowerCase()) {
			open = true;
			document.getElementById(name.toLowerCase())?.scrollIntoView();
		}
	})
</script>

<div class="flex flex-col gap-2 h-fit bg-card p-2 rounded-sm">
	<button on:click={toggle} class="flex flex-row items-center gap-2 rounded-md grow text-clip w-full h-16 cursor-default hover-custom-scale transition-all">
		{#if image}
			<img class="w-12 h-12 object-cover rounded-md" src={strapiImage(image)} alt={name} />
		{/if}
		<p class="font-bold">{name}</p>
		<div class="flex flex-row gap-2">
			{#each tagArray as tag}
				<div class="rounded-full text-xs h-4 px-2 text-black select-none" style={`background-color: ${tag.color}; color: ${contrast(tag.color)}`}>
					{tag.name}
				</div>
			{/each}
		</div>

		<div class="flex flex-col items-center ml-auto mr-8"> 
			{#if description !== ''}
				<Icon icon={open ? "chevron-up" : "chevron-down"} size={1.2} />
			{/if}
		</div>
	</button>
	{#if open}
	
		<div transition:slide={{ duration: 300 }} class="flex flex-col gap-2 h-fit">
			<hr class="w-auto border-muted ml-8 mr-16" />
			<div class="py-4">
				<div class="markdown w-full px-8">
					<SvelteMarkdown source={description} />
				</div>

				<div class="flex flex-row gap-2 items-center justify-end m-4 mb-0">
					{#if source}
						<a href={source} target="_blank">
							<Button variant="ghost">
								<Icon icon="brand-github" size={1.4} />
								<span class="ml-1">View Source</span>
							</Button>
						</a>
					{/if}
					{#if link}
						<a href={link} target="_blank">
							<Button variant="ghost">
								<Icon icon="link" size={1.4} />
								<span class="ml-1">Open Website</span>
							</Button>
						</a>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.hover-custom-scale:hover {
		transform: scale(1.005);
	}
</style>