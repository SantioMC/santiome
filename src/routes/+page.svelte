<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import Project from '$lib/components/project.svelte';
	const emailHash = '131a65afa8070a377c3a960ad3af1787e5af2df38961727510e2e1a93de576dd';
</script>

<div class="card flex flex-col gap-8">
	<div class="flex items-center gap-3">
		<img
			src="https://gravatar.com/avatar/{emailHash}?s=260&d=mp"
			alt="Avatar"
			class="h-12 w-12 rounded-full"
		/>

		<div class="flex flex-col">
			<h1 class="text-lg leading-6">Santio</h1>
			<p class="font-mono text-sm leading-4 text-secondary">Software Engineer</p>
		</div>
	</div>

	<section>
		<p>
			Hello there 👋, I'm Santio, a backend and infrastructure developer from Canada. I'm primarily
			a backend developer but in recent years I've been working with tools such as Kubernetes,
			Terraform, and other CI/CD tools to help manage and scale infrastructure for some of my work.
			Check out my <a href="https://github.com/SantioMC" target="_blank">Github</a>, or reach out to
			me on <a href="https://discord.com/users/239752804468654090" target="_blank">Discord</a>
		</p>
	</section>

	<section>
		<h2 class="text-lg font-bold">Projects</h2>
		<p>
			I've worked on quite a few various projects, and a bit all over the place. See some of the
			more prominent ones below, these are also places I've both contributed to and also worked at.
			Check them out 😋.
		</p>

		<div class="mt-4 flex flex-wrap gap-4">
			<Project name="play.hosting" src="/project/playhosting.svg" href="https://play.hosting/" />
			<Project
				name="soul studios"
				src="/project/soulstudios.svg"
				href="https://www.soulstudios.io/"
			/>
			<Project name="lilypad studios" src="/project/lilypad.svg" href="https://lilypad.gg/" />
		</div>
	</section>

	<section>
		<h2 class="text-lg font-bold">Friends</h2>
		<p>
			Check out some of these awesome people who are so extremely talented in what they do. Click on
			their 88x31 badge to see their website.
		</p>

		<div class="mt-4 flex flex-wrap gap-2">
			<Badge name="Santio" src="/badge.png" />
			<Badge name="Aroze" src="https://aroze.me/images/88x31/aroze.png" href="https://aroze.me" />
			<Badge
				name="Eva"
				src="https://kibty.town/files/img/buttons/kibty.town-badge.gif"
				href="https://kibty.town/"
			/>
			<Badge
				name="Astrid"
				src="https://www.astrid.sh/buttons/astrid-badge.png"
				href="https://www.astrid.sh/"
			/>
		</div>
	</section>
</div>
