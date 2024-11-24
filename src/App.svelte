<script lang="ts">
    import { people } from './lib/yaarrg';
    import PeopleList from './lib/PeopleList.svelte';
	import AssignButton from './lib/AssignButton.svelte';
    import HeaderBar from './lib/HeaderBar.svelte';
    import Assignment from './lib/Assignment.svelte';
	import AdvancedOptions from './lib/AdvancedOptions.svelte';
    import FooterBar from './lib/FooterBar.svelte';
    import Description from './lib/Description.svelte';
	const search_params = new URLSearchParams(window.location.search);
	const name = search_params.get('n');
	const assignment = search_params.get('a');
	let show_assignment: boolean = false;
	if (name !== null && assignment !== null) {
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
			{#if $people.length > 0}
				<AdvancedOptions />
			{/if}
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
