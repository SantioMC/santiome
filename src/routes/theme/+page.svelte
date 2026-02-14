<script>
	import Color from '$lib/components/color.svelte';
</script>

<div class="flex h-lvh items-center justify-center">
	<div class="flex flex-wrap gap-8">
		<Color name="primary" class="bg-primary" />
		<Color name="secondary" class="bg-secondary" />
		<Color name="text" class="bg-text text-black!" />
		<Color name="background" class="border border-white bg-background" />
		<Color name="card" class="bg-card" />
	</div>
</div>
