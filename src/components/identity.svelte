<script lang="ts">
	import { key } from './../store/key';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Code from '$component/ui/code.svelte';
	import { get } from 'svelte/store';

	const host = document.location.host;

	onMount(async () => {
		if (get(key)) return;

		const response = await fetch('/key');
		key.set(await response.text());
	});
</script>

<div in:fade={{ duration: 300 }} class="flex flex-col">
	<div>
		<p class="my-2 text-lg">Public SSH Key</p>
		<Code content={$key} />
	</div>
	<div>
		<p class="my-2 text-lg">Quick-add SSH</p>
		<Code content={
			`curl -s ${host}/ssh >> ~/.ssh/authorized_keys`
		} />
	</div>
</div>