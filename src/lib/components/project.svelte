<script lang="ts">
	const {
		name,
		src,
		href
	}: {
		name: string;
		src: string;
		href?: string;
	} = $props();
</script>

{#if href}
	<a {href}>
		<img {src} alt={name} />
	</a>
{:else}
	<img {src} alt={name} />
{/if}

<style>
	img {
		width: 8rem;
		height: 3rem;
		padding: 0.25rem;
	}
</style>
