<script lang="ts">
    import { people } from './yaarrg';

    function addPerson() {
        $people = [...$people, { 
            name: 'new person',
            excludes: [],
            requires: [],
            assignment: null,
            encoded_assignment: null,
        }];
        return null;
    }
</script>

<div>
    {#if $people.length > 0}
        <button id="addPerson" on:click={addPerson}>Add Person</button>
    {:else}
        <button id="getStarted" on:click={addPerson}>Get Started</button>
    {/if}
</div>

<style>
    div {
        margin-top: 1em;
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