<script lang="ts">
    import PeopleList from './lib/PeopleList.svelte';
	import AssignButton from './lib/AssignButton.svelte';
	import { get_decoded_assignment } from './lib/yaarrg';
	const path_name = window.location.pathname;
	let assignment: null | string = null;
	if (path_name.length > 1 && path_name.split('/').length == 3) {
		console.log(path_name.slice(1));
		assignment = get_decoded_assignment(path_name.slice(1));
	}
</script>

<main>
  	<h1>YAARRG</h1>

	{#if assignment !== null}
		<p>Assignment: {assignment}</p>
	{:else}
		<div >
			<PeopleList />
			<AssignButton />
		</div>
	{/if}
</main>

<style>
</style>
