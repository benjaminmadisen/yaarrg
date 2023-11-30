<script lang="ts">
    import AddPersonButton from './AddPersonButton.svelte';
    import PeopleListEntry from './PeopleListEntry.svelte';
    import { people } from './yaarrg';
</script>

<div>
    {#if $people.length > 0}
        {#each $people as person}
            <PeopleListEntry {person} />
        {/each}
    {/if}
    <AddPersonButton />
</div>

<style>
    div {
        margin-top: 2em;
    }
</style>