<script lang="ts">
	import Icon from '$lib/components/icon.svelte';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	const {
		name,
		children
	}: {
		name: string;
		children?: Snippet;
	} = $props();

	let expanded = $state<boolean>(false);

	const toggle = () => {
		expanded = !expanded;
	};
</script>

<div class={expanded ? 'mb-6' : 'mb-1'}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="flex cursor-pointer items-center justify-between gap-2 rounded px-2 py-1 transition-all hover:bg-background"
		onclick={toggle}
	>
		<h2 class="text-lg font-semibold select-none">{name}</h2>
		<Icon icon={expanded ? 'chevron-up' : 'chevron-down'} />
	</div>

	{#if expanded}
		<div in:fly={{ y: -5, duration: 200 }}>
			{@render children?.()}
		</div>
	{/if}
</div>
