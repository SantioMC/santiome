<script lang="ts">
	const {
		name,
		src,
		href,
		larger
	}: {
		name: string;
		src: string;
		href?: string;
		larger?: boolean;
	} = $props();
</script>

{#if href}
	<a {href}>
		<img {src} alt={name} class:larger />
	</a>
{:else}
	<img {src} alt={name} class:larger />
{/if}

<style>
	img {
		width: 8rem;
		height: 3rem;
		padding: 0.25rem;
	}

	img.larger {
		padding: 0;
	}
</style>
