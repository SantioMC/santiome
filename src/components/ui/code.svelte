<script lang="ts">
	type Action = 'copy';
	export let actions: [Action] = ['copy'];

	export let expected: number = 1;
	export let content: string | undefined;
	export let language: string = 'language-bash';

	let timeout: NodeJS.Timeout | undefined = undefined;
	const copy = (event: MouseEvent) => {
		if (!content) return;
		if (timeout) clearTimeout(timeout);
		
		navigator.clipboard.writeText(content);
		const element = event.target as HTMLElement;

		element.innerText = 'Copied!'; 

		timeout = setTimeout(() => {
			timeout = undefined;
			element.innerText = 'Copy';
		}, 1000);
	};
</script>

<div class="bg-card rounded-sm grow p-2">
	<div class="word-wrap">
		{#if !content}
			<div class="flex justify-center items-center text-muted" style={`height: ${expected * 1.5}em`}>
				Loading...
			</div> 
		{:else}
			<code class={language}>{content}</code>
		{/if}
	</div>
	<div class="float-right">
		{#each actions as action}
			{#if action === 'copy'}
				<button on:click={copy} class="text-sm mt-3 text-muted">Copy</button>
			{/if}
		{/each}
	</div>
</div>

<style>
	.word-wrap {
		word-wrap: break-word;
		white-space: pre-wrap;
		overflow-wrap: break-word;
	}
</style>