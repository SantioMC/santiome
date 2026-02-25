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
		<img width="88" height="31" {src} alt="{name}'s 88x31" />
	</a>
{:else}
	<img width="88" height="31" {src} alt="{name}'s 88x31" />
{/if}

<style>
	img {
		image-rendering: auto;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
		width: 6rem;
		height: auto;
	}
</style>
