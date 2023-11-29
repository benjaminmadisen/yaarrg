<script lang="ts">
    import ExcludeList from './ExcludeList.svelte';
    import type { Person } from './yaarrg';

    export let person: Person;
</script>

<div>
    <input bind:value={person.name} />
    <ExcludeList {person} />
    {#if person.encoded_assignment !== null}
        <a href={person.encoded_assignment}>{person.encoded_assignment}</a>
    {/if}
</div>