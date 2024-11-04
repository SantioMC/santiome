<script lang="ts">
	import { page } from "~/store/page";

	export let name: string;
	export let image: string | undefined = undefined;
	export let link: string;
	export let color: string = '#777777';

	$: transparentColor = `${color}44`;

	const forward = (event: MouseEvent) => {
		if (!link.startsWith('#')) return;
		event.preventDefault();
		window.location.hash = link;
		page.set('projects');
	}
</script>

<!-- Badge style reference -->
<a class="rounded-full inline-flex flex-row w-fit px-2 py-1 text-xs" style={`background-color: ${transparentColor}`} href={link} on:click={forward}>
	{#if image}
		<img class="w-4 h-4 object-cover rounded-full" src={image} alt={name} />
	{/if}

	{name}
</a>