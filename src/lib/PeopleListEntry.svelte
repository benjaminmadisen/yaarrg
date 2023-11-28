<script lang="ts">
    import type { Person } from './yaarrg';
    import { people } from './yaarrg';

    export let person: Person;
</script>

<div>
    <input bind:value={person.name} />
    {#if person.encoded_assignment !== null}
        <a href={person.encoded_assignment}>{person.encoded_assignment}</a>
    {/if}
</div>