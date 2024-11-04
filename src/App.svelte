<script lang="ts">
	import ThemeToggle from './components/ui/theme-toggle.svelte';
	import BlogPost from './pages/BlogPost.svelte';
  	import { Router, Route } from "svelte-routing";
	import Index from "~/pages/Index.svelte";
	import Resume from "~/pages/Resume.svelte";
	
  	export let url = "";
</script>

<Router {url}>
	<Route path="/b/:id" let:params>
		<BlogPost slug={params.id} />
	</Route>
	<Route path="/resume" component={Resume} />
	<Route path="/" component={Index} />
</Router>

<div class="actions">
	<ThemeToggle />
</div>

<style>
	.actions {
		position: fixed;
		bottom: 2rem;
		right: 3rem;
		display: flex;
		gap: 0.5rem;
	}
</style>