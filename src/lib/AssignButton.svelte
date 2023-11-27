<script lang="ts">
    import { people, assign_people } from './yaarrg';

    function run_assignment() {
        $people = assign_people($people);
    }
</script>

<button on:click={run_assignment}>Assign</button>