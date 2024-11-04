<script lang="ts">
	import { fade } from 'svelte/transition';
	import Ref from '~/components/ui/ref.svelte';
</script>

<div in:fade={{ duration: 300 }} class="flex flex-col items-center gap-4 p-8 bg-card rounded-md grow text-clip w-full">
	<p class="w-full">
		Hello there 👋, I'm Santio, a backend and infrastructure developer from
		Canada. I'm primarily a backend developer but in recent years I've been working with tools such as Kubernetes, Terraform, and other CI/CD tools to help manage and scale infrastructure for some of my work (For example, <Ref name="Hideaway" image="/img/hideaway.png" link="#hideaway" />).
	</p>
</div>