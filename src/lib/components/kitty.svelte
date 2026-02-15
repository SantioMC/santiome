<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';

	type State = 'idle' | 'walking';

	const MOVE_DISTANCE = 200;
	const SPEED = 3;

	let x = $state<number>(0);
	let y = $state<number>(0);
	let currentState = $state<State>('idle');
	let direction = $state<number>(1);

	let targetX = $state<number>(0);
	let targetY = $state<number>(0);

	let ticker = $state<number | null>(null);
	let debounce = $state<number | null>(null);

	let mouseX = $state<number>(0);
	let mouseY = $state<number>(0);

	let debugging = $derived(page.url.searchParams.has('debug'));

	const images = {
		idle: '/cat/cat-idle.gif',
		walking: '/cat/cat-walk.gif'
	} as const as Record<State, string>;

	const onMouseMove = (e: MouseEvent) => {
		mouseX = e.clientX;
		mouseY = e.clientY;

		if (debounce) clearTimeout(debounce);
		debounce = setTimeout(() => {
			const distance = Math.pow(mouseX - targetX, 2) + Math.pow(mouseY - targetY, 2);
			if (distance < MOVE_DISTANCE * MOVE_DISTANCE) return;
			updatePosition(e.clientX, e.clientY);
		}, 200);
	};

	const updatePosition = (mouseX: number, mouseY: number) => {
		const newX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 50 + 25);
		const newY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 50 + 25);

		targetX = Math.max(0, Math.min(document.documentElement.scrollWidth - 20, newX + mouseX));
		targetY = Math.max(0, Math.min(document.documentElement.scrollHeight - 20, newY + mouseY));
	};

	const handleCatMovement = () => {
		const shouldMove = Math.abs(targetX - x) > 10 || Math.abs(targetY - y) > 10;
		const continuingMovement = shouldMove && currentState === 'walking';

		if (!continuingMovement) {
			if (!shouldMove && currentState === 'walking') {
				currentState = 'idle';
			} else if (shouldMove && currentState === 'idle') {
				currentState = 'walking';
			} else {
				return;
			}
		}

		const vector = {
			x: targetX - x,
			y: targetY - y
		};

		const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
		if (length === 0) return;

		vector.x /= length;
		vector.y /= length;

		direction = vector.x > 0 ? 1 : -1;

		x += vector.x * SPEED;
		y += vector.y * SPEED;
	};

	const onTick = () => {
		handleCatMovement();
	};

	onMount(() => {
		if (!browser) return;
		document.addEventListener('mousemove', onMouseMove);
		ticker = setInterval(onTick, 1000 / 60);
	});

	onDestroy(() => {
		if (!browser) return;
		document.removeEventListener('mousemove', onMouseMove);
		if (ticker) clearInterval(ticker);
	});
</script>

{#if debugging}
	<div id="debug" class="overshoot" style="--x: {targetX}px; --y: {targetY}px;"></div>
{/if}

<img
	src={images[currentState] ?? images['idle']!}
	alt="kitty"
	style="--x: {x}px; --y: {y}px; --direction: {direction};"
/>

<style>
	img {
		image-rendering: auto;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
		image-rendering: -webkit-optimize-contrast;
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(var(--x), var(--y)) scaleY(1.5) scaleX(calc(var(--direction) * 1.5));
		transition: transform 0.2s linear;
	}

	#debug {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(var(--x), var(--y));
		transition: transform 0.25s linear;
		width: 2px;
		height: 2px;
		background-color: red;
	}
</style>
