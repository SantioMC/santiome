<script lang="ts">
	import { Button } from "$component/ui/button";
	import Icon from "$component/ui/icon.svelte";

	const imageHash ='131a65afa8070a377c3a960ad3af1787e5af2df38961727510e2e1a93de576dd';
</script>

<img
	class='rounded-full w-32 h-32 object-cover'
	src={`https://gravatar.com/avatar/${imageHash}?s=260&d=mp`}
	alt='Santio'
/>

<h1 class='w-full text-center text-xl select-none'>Santio</h1>
<p class='w-full text-gray text-sm select-none text-center'>
	Backend & Infrastructure Developer
</p>

<hr class='w-full' />

<div class='flex gap-2 items-center'>
	<a href='https://github.com/SantioMC' target='_blank'>
		<Button variant='outline' size='icon'>
			<Icon icon='brand-github' size={1.4} />
		</Button>
	</a>
	<a href='https://bsky.app/profile/santio.me' target='_blank'>
		<Button variant='outline' size='icon'>
			<Icon icon='brand-bluesky' size={1.4} />
		</Button>
	</a>
	<a href='https://linkedin.com/in/santio' target='_blank'>
		<Button variant='outline' size='icon'>
			<Icon icon='brand-linkedin' size={1.4} />
		</Button>
	</a>
</div>

<div class='mt-2 flex flex-col items-center'>
	<a href='/resume'>
		<Button variant='ghost'>
			<Icon icon='briefcase-2' size={1.4} />
			<span class="ml-1">View Resume</span>
		</Button>
	</a>
	<a href='https://cv.santio.me' target='_blank'>
		<Button variant='ghost'>
			<Icon icon='script' size={1.4} />
			<span class="ml-1">Read CV</span>
		</Button>
	</a>
</div>
