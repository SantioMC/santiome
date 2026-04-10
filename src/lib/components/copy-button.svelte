<script lang="ts">
	import { toast } from 'svelte-sonner';
	import Icon from './icon.svelte';

	const {
		icon,
		text,
		copy
	}: {
		icon: string;
		text: string;
		copy: string;
	} = $props();

    const onclick = () => {
        navigator.clipboard.writeText(copy);
        toast.success('Copied to clipboard');
    }
</script>

<button
    {onclick}
	class="card overshoot flex w-full cursor-pointer flex-row items-center gap-2 border-2 border-transparent text-sm transition-all select-none hover:scale-[1.02] hover:rotate-[0.5deg] hover:border-primary"
>
	<Icon {icon} />
	{text}
</button>