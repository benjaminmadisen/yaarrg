<script lang="ts">
    import AddPersonButton from './AddPersonButton.svelte';
    import PeopleListEntry from './PeopleListEntry.svelte';
    import PeopleListHeader from './PeopleListHeader.svelte';
    import { people } from './yaarrg';
</script>

<div>
    {#if $people.length > 0}
        <PeopleListHeader />
        {#each $people as person}
            <PeopleListEntry {person} />
        {/each}
    {/if}
    <AddPersonButton />
</div>