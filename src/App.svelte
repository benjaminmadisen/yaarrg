<script lang="ts">
    import { people } from './lib/yaarrg';
    import PeopleList from './lib/PeopleList.svelte';
	import AssignButton from './lib/AssignButton.svelte';
    import HeaderBar from './lib/HeaderBar.svelte';
    import Assignment from './lib/Assignment.svelte';
    import FooterBar from './lib/FooterBar.svelte';
    import Description from './lib/Description.svelte';
	const path_name = window.location.pathname;
	let show_assignment: boolean = false;
	if (path_name.length > 1 && path_name.split('/').length == 3) {
		show_assignment = true;
	}
</script>

<main>
	<HeaderBar />
	{#if show_assignment}
		<Assignment />
	{:else}
		<Description />
		<PeopleList />
		{#if $people.length > 0}
			<AssignButton />
		{/if}
	{/if}
	<FooterBar />
</main>

<style>
</style>
