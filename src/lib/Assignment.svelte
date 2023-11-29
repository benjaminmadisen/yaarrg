<script lang="ts">
	import { get_decoded_assignment } from './yaarrg';

	const path_name = window.location.pathname;
    let assignment: null | string = null;
	if (path_name.length > 1 && path_name.split('/').length == 3) {
		assignment = get_decoded_assignment(path_name.slice(1));
	}
</script>

<div>
    {#if assignment !== null}
        <p>You've been assigned {assignment}!</p>
    {:else}
        <p>Hmm, this address didn't work!</p>
    {/if}
</div>