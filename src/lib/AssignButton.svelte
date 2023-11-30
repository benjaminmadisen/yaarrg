<script lang="ts">
    import { people, assign_people } from './yaarrg';

    function run_assignment() {
        $people = assign_people($people);
    }
</script>

<div>
    <button on:click={run_assignment}>Assign</button>
</div>

<style>
    div {
        margin-top: 2em;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    button {
        background-color: #666;
        color: #fff;
        border: none;
        border-radius: 0.5em;
        padding: 0.5em;
        cursor: pointer;
    }
</style>