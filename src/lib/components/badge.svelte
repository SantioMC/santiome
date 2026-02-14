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
		<img {src} alt="{name}'s 88x31" />
	</a>
{:else}
	<img {src} alt="{name}'s 88x31" />
{/if}

<style>
	img {
		image-rendering: auto;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
		image-rendering: -webkit-optimize-contrast;
		width: 6rem;
		height: auto;
	}
</style>
