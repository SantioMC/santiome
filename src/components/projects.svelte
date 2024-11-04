<script lang="ts">
	import { get } from 'svelte/store';
	import { projects as projectStore } from './../store/strapi';
	import Project from "$component/projects/project.svelte";
	import { strapi, type Project as ProjectData } from '$lib/strapi';
	import { onMount } from "svelte";

	import { fade } from 'svelte/transition';

	let projects: ProjectData[] = []
	let loaded = false;

	const refresh = () => {
		window.location.reload();
	}

	onMount(async () => {
		if (get(projectStore).length > 0) {
			projects = get(projectStore);
			loaded = true;
			return;
		}

		projects = (await strapi<[ProjectData]>({
			endpoint: 'projects?populate=*&sort=publishedAt:desc',
			wrappedByKey: 'data',
		}));

		loaded = true;
		projectStore.set(projects);
	})
</script>

<div in:fade={{ duration: 300 }} class="flex flex-col gap-2 h-auto md:overflow-y-auto md:overflow-x-hidden">
	{#if loaded && projects.length > 0}
		{#each projects as project} 
			<Project 
				image={project.image ?? undefined}
				name={project.name ?? 'Unknown'}
				tags={project.tags ?? {}} 
				description={project.description ?? 'No description available'}
				link={project.website ?? undefined}
				source={project.source_code ?? undefined}
			/>
		{/each}
	{:else if loaded}
		<span>Sorry! No available projects were found, try again later.</span>
	{:else}
		<span>Loading projects, if this takes long please try <button class="text-blue-500" on:click={refresh}>refreshing the page</button></span>
	{/if}
</div>
