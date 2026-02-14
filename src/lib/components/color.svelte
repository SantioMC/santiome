<script lang="ts">
	import { toast } from 'svelte-sonner';
	import type { ClassValue } from 'svelte/elements';

	const {
		name,
		class: className
	}: {
		name: string;
		class?: ClassValue;
	} = $props();

	let element = $state<HTMLDivElement>();

	const copyColor = () => {
		const bg = window.getComputedStyle(element!).getPropertyValue('background-color');
		navigator.clipboard.writeText(bg);
		toast.success('Copied color to clipboard');
	};
</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	bind:this={element}
	role="button"
	onclick={copyColor}
	class="overshoot relative h-24 w-24 cursor-pointer rounded text-white transition-all hover:scale-105 hover:rotate-2 {className}"
>
	<p class="absolute right-2 bottom-1 text-sm select-none">{name.toLowerCase()}</p>
</div>
