<script lang="ts">
    import PeopleListEntry from './PeopleListEntry.svelte';

    import type { Person } from './yaarrg';
    import { people } from './yaarrg';

    function addPerson() {
        $people = [...$people, { 
            name: 'New Person',
            color: 'red',
            excludes: [],
            requires: [],
            assignment: null,
            encoded_assignment: null,
        }];
        return null;
    }
</script>

<div>
    {#each $people as person}
        <PeopleListEntry {person} />
    {/each}
    <button on:click={addPerson}>Add Person</button>
</div>