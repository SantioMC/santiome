<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	const props: {
		icon: string;
		onclick?: () => void;
		class?: ClassValue;
		filled?: boolean;
	} = $props();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/tabler-icons/3.35.0/tabler-icons.min.css"
	/>
</svelte:head>

<i
	aria-hidden="true"
	onclick={() => props.onclick?.()}
	class="ti ti-{props.icon}{props.filled ? '-filled' : ''} {props.class}"
></i>
