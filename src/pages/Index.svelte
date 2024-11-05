<script lang="ts">
	import { page } from './../store/page';
	import Me from '$component/me.svelte';
	import Intro from '$component/intro.svelte';
	import { Button } from '$component/ui/button';
	import Projects from '$component/projects.svelte';
	import Identity from '$component/identity.svelte'; 
	import Blog from '~/components/blog.svelte';
	import { onMount } from 'svelte';
	import Latest from '~/components/latest.svelte';
	
	const goto = (newPage: string) => {
		page.set(newPage);
	}

	onMount(() => {
		if (window.location.hash) {
			console.log(window.location.hash)
			page.set('projects');
		}
	})
</script>

<svelte:head>
	<meta property="og:title" content="santio.me" />
	<meta property="og:description" content="Welcome to my personal site, come check out some of my projects or past work experience." />
	<meta name="description" content="Welcome to my personal site, come check out some of my projects or past work experience.">
</svelte:head>

<main
	class="flex flex-col items-center gap-2 w-full justify-center h-full"
>
	<div class="h-full w-full m-0 p-0 layout">
		<div class="col-start-2 content-end">
			<Button variant="ghost" on:click={() => goto('about')}>About</Button>
			<Button variant="ghost" on:click={() => goto('projects')}>Projects</Button>
			<Button variant="ghost" on:click={() => goto('blog')}>Blog</Button>
			<Button variant="ghost" on:click={() => goto('identity')}>Identity</Button>
		</div>
		<div
			class="col-start-1 flex flex-col items-center gap-4 p-8 bg-card rounded-md grow"
		>
            <Me />
		</div>
		{#if $page === 'about'} <Intro />
		{:else if $page === 'projects'} <Projects />
		{:else if $page === 'blog'} <Blog />
		{:else if $page === 'identity'} <Identity />
		{/if}
		<div><Latest /></div>
	</div>
</main>

<style>
	.layout {
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		grid-template-rows: 4rem 1fr;
		gap: 1rem;
		padding: 0 12rem;
		height: 36rem;
	}

	:global(.layout > div:not(:first-child)) {
		height: inherit;
	}
 
	.grow {
		transition: all 0.2s ease-in-out;
	}

	.grow:hover {
		transform: scale(1.01);
	}

	@media (max-width: 1470px) {
		.layout {
			padding: 0 4rem;
		}
	}

	@media (max-width: 1220px) {
		.layout {
			padding: 0 1rem;
		}
	}

	@media (max-width: 1115px) {
		main {
			height: auto;
			min-width: 100%;
		}

		.layout {
			display: flex;
			flex-direction: column;
			padding: 10%;
		}
	}
</style>
