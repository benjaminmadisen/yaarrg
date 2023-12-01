<script lang="ts">
	import { get_decoded_assignment } from './yaarrg';

	const search_params = new URLSearchParams(window.location.search);
	const name = search_params.get('n');
	const assignment_code = search_params.get('a');
    let assignment: string | null = null;
	if (name !== null && assignment_code !== null) {
		assignment = get_decoded_assignment(name, assignment_code);
	}
</script>

<div>
    {#if assignment !== null}
        <p>You've been assigned {assignment}!</p>
    {:else}
        <p>Hmm, this address didn't work!</p>
    {/if}
</div>