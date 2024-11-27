<script lang="ts">
	import { mockImage } from './../lib/strapi';
	import { get } from 'svelte/store';
	import { projects as projectStore } from './../store/strapi';
	import Project from '$component/projects/project.svelte';
	import { strapi, type Project as ProjectData } from '$lib/strapi';
	import { onMount } from 'svelte';

	import { fade } from 'svelte/transition';

	const trimIndent = (str: string): string => {
		return str
			.split('\n')
			.map((line) => line.trim())
			.join('\n');
	};

	const now = new Date().toISOString();
	let projects: ProjectData[] = [
		{
			id: 5,
			name: 'Lilypad',
			description: trimIndent(`
			Lilypad is a server hosting platform, allowing anyone to run a Minecraft server, either for their friends or for a larger community. The platform collaborated with various personalities and companies such as [The Sidemen](https://www.youtube.com/watch?v=e8nrpyUFY7Y), [Opera GX](https://www.opera.com/gx), [TommyInnit](https://www.youtube.com/@TommyInnit) and more. While at the time of writing I do not work on the core platform, I am working on new features for the platform which I can't talk about *just yet* - stay tuned!
			`),
			image: mockImage('/img/lilypad.png'),
			website: 'https://lilypad.gg',
			source_code: null,
			documentId: '5',
			tags: {},
			createdAt: now,
			updatedAt: now,
			publishedAt: now
		},
		{
			id: 4,
			name: 'Starfury Studios',
			description: trimIndent(`
			Starfury Studios is a UGC creation studio that creates content for various UGC platforms. Our main platform we focused on is the Minecraft platform. We collaborate with various companies to create content for massive userbases.

			I worked alongside the team as an Infrastructure and Backend Engineer, creating highly-scalable, efficient, and cost effective systems for the entire company and almost every project we worked on. This resulted in thousands of dollars a month in savings from the work I contributed.
			`),
			image: mockImage('/img/starfury.png'),
			website: 'https://starfury.gg',
			source_code: null,
			documentId: '4',
			tags: {},
			createdAt: now,
			updatedAt: now,
			publishedAt: now
		},
		{
			id: 3,
			name: 'Hideaway',
			description: trimIndent(`
			Hideaway is a Minecraft network owned by the influencers [Graser10](https://www.youtube.com/user/Graser10) and [kiingtong](https://www.youtube.com/user/Kiinqtonq). I assisted in working on both the network's infrastructure and the development of the platform. 
			`),
			image: mockImage('/img/hideaway.png'),
			website: 'https://hideaway.gg',
			source_code: null,
			documentId: '3',
			tags: {},
			createdAt: now,
			updatedAt: now,
			publishedAt: now
		},
		{
			id: 2,
			name: 'Glass',
			description: trimIndent(`
			Glass was a next-generation server management platform that was created to fix the issues with the standard available solutions. The platform was built with a focus on user experience and ease of use, while focusing on the expandability of the platform to allow for tooling that would otherwise not be possible in certain environments.

			This project was a massive learning experience for me, and I learned a lot about specific technologies and how they worked, such as FTP, Sockets, and more. However as solutions for managing servers began to become more fully-featured, Glass became obsolete so I stopped development of the project.
			`),
			image: mockImage('/img/glass.png'),
			website: null,
			source_code: 'https://github.com/GlassDashboard',
			documentId: '2',
			tags: {},
			createdAt: now,
			updatedAt: now,
			publishedAt: now
		},
		{
			id: 1,
			name: 'Minehut',
			description: trimIndent(`
			Minehut is a network for users to create, manage, and share their own Minecraft servers. The project is worked on by a company called GamerSafer and has thousands of concurrent users. I volunteer my time to assist with the moderation of the network platforms (both on the service and some social media platforms like their forums and Discord).

			I also work on the MinehutUtils bot, which is a Discord bot used by the community to view information about the network and their own servers. This bot is considered the official bot for the Minehut discord (which has over 100,000 members).
			`),
			image: mockImage('/img/minehut.png'),
			website: 'https://minehut.com',
			source_code: 'https://github.com/SantioMC/MinehutUtils',
			documentId: '1',
			tags: {},
			createdAt: now,
			updatedAt: now,
			publishedAt: now
		}
	];
	let loaded = true;

	const refresh = () => {
		window.location.reload();
	};

	onMount(async () => {
		// todo: put this back once the CMS is fixed
		// if (get(projectStore).length > 0) {
		// 	projects = get(projectStore);
		// 	loaded = true;
		// 	return;
		// }
		// projects = (await strapi<[ProjectData]>({
		// 	endpoint: 'projects?populate=*&sort=ordinal:desc',
		// 	wrappedByKey: 'data',
		// }));
		// loaded = true;
		// projectStore.set(projects);
	});
</script>

<div
	in:fade={{ duration: 300 }}
	class="flex flex-col gap-2 h-auto md:overflow-y-auto md:overflow-x-hidden"
>
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
		<span
			>Loading projects, if this takes long please try <button
				class="text-blue-500"
				on:click={refresh}>refreshing the page</button
			></span
		>
	{/if}
</div>
