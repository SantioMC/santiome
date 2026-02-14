<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import './layout.css';

	let { children } = $props();
</script>

<Toaster position="bottom-right" theme="dark" richColors />
{@render children()}
