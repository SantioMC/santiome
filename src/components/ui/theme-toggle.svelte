<script lang="ts">
	import Icon from '$component/ui/icon.svelte';
	import { resetMode, setMode, mode } from "mode-watcher";
	import { Button } from "$component/ui/button";
	import * as DropdownMenu from "$component/ui/dropdown-menu";
	import type { Mode } from 'node_modules/mode-watcher/dist/types';

	const updateMode = (mode: Mode | undefined) => {
		if (mode === 'light') {
			document.documentElement.classList.remove('dark');
		} else if (mode === 'dark') {
			document.documentElement.classList.add('dark');
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	$: updateMode($mode);
</script>
 
<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon">
			<Icon icon={$mode === 'light' ? 'sun' : 'moon'} />
			<span class="sr-only">Toggle theme</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
			<DropdownMenu.Item on:click={() => setMode("light")}>Light</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => setMode("dark")}>Dark</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>