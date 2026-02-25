<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import Project from '$lib/components/project.svelte';
</script>

<div class="card flex flex-col gap-8">
	<div class="flex items-center gap-3">
		<img src="/img/profile-picture.webp" alt="Avatar" class="h-12 w-12 rounded-full" />

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
			more prominent ones below, these are also places I've both contributed to or worked at. Check
			them out 😋.
		</p>

		<div class="mt-4 flex flex-wrap gap-4">
			<Project
				name="GamerSafer"
				src="/project/gamersafer.webp"
				href="https://gamersafer.com/"
				larger
			/>
			<Project name="play.hosting" src="/project/playhosting.svg" href="https://play.hosting/" />
			<Project
				name="Soul Studios"
				src="/project/soulstudios.svg"
				href="https://www.soulstudios.io/"
			/>
			<Project name="Lilypad Studios" src="/project/lilypad.svg" href="https://lilypad.gg/" />
		</div>
	</section>

	<section>
		<h2 class="text-lg font-bold">Friends</h2>
		<p>
			Check out some of these awesome people who are so extremely talented in what they do. Click on
			their 88x31 badge to see their website.
		</p>

		<div class="mt-4 flex flex-wrap gap-2">
			<Badge name="Santio" src="/badge/santio.webp" />
			<Badge name="Aroze" src="/badge/aroze.png" href="https://aroze.me" />
			<Badge name="Eva" src="/badge/eva.gif" href="https://kibty.town/" />
			<Badge name="Astrid" src="/badge/astrid.png" href="https://www.astrid.sh/" />
			<Badge name="Lily" src="/badge/lily.webp" href="https://lily.pet/" />
			<Badge name="Ollie" src="/badge/ollie.png" href="https://ollie.lol/" />
		</div>
	</section>
</div>
