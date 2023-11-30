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
	<div id="content">
		{#if show_assignment}
			<Assignment />
		{:else}
			{#if $people.length > 0}
				<AssignButton />
			{:else}
				<Description />
			{/if}
			<PeopleList />
		{/if}
	</div>
	<FooterBar />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		max-width: 840px;
		margin: 0 auto;
	}
	#content {
		width: 100%;
        max-width: 40em;
        margin-left: 2em;
        margin-right: 2em;
	}
</style>
