<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	const {
		name,
		method
	}: {
		name: string;
		method: string;
	} = $props();

	const colors = {
		GET: 'text-blue-300',
		POST: 'text-green-300',
		PUT: 'text-yellow-300',
		PATCH: 'text-purple-300',
		DELETE: 'text-red-300'
	} as const as Record<string, ClassValue>;
</script>

<div
	class="overshoot flex cursor-pointer items-baseline gap-2 rounded px-2 py-1 transition-all hover:scale-[1.04] hover:bg-background"
>
	<code class="font-mono select-none {colors[method] ?? colors['GET']!}">{method}</code>
	<span class="select-none">{name.length > 64 ? `${name.slice(0, 60)}...` : name}</span>
</div>
