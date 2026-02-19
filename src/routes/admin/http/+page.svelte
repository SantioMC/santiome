<script>
	import RequestGroup from '$lib/components/http/request-group.svelte';
	import Request from '$lib/components/http/request.svelte';
</script>

<div class="flex">
	<aside class="flex h-lvh w-56 flex-col overflow-auto bg-card p-2">
		<h1 class="w-full py-2 text-center text-lg">HTTP Client</h1>
		<RequestGroup name="sillies">
			<Request name="Untitled request" method="GET" />
			<Request name="Untitled request" method="GET" />
			<Request name="Untitled request" method="GET" />
			<Request name="Untitled request" method="DELETE" />
			<Request name="Untitled request" method="PUT" />
			<Request name="Untitled request" method="PATCH" />
			<Request name="Untitled request" method="POST" />
		</RequestGroup>
		<RequestGroup name="sillies 2">
			<Request name="Untitled request" method="GET" />
			<Request name="Untitled request" method="GET" />
			<Request name="Untitled request" method="GET" />
			<Request name="Untitled request" method="DELETE" />
			<Request name="Untitled request" method="PUT" />
			<Request name="Untitled request" method="PATCH" />
			<Request name="Untitled request" method="POST" />
		</RequestGroup>
	</aside>

	<main class="w-full p-4">
		<div class="flex items-stretch gap-4 px-4">
			<select class="w-auto">
				<option value="GET">GET</option>
				<option value="POST">POST</option>
				<option value="PUT">PUT</option>
				<option value="PATCH">PATCH</option>
				<option value="DELETE">DELETE</option>
			</select>
			<input class="w-full" type="text" placeholder="https://google.com" />
		</div>
	</main>
</div>
