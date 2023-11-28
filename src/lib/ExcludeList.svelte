<script lang="ts">
    import type { Person } from './yaarrg';
    import { people } from './yaarrg';

    export let person: Person;

    function removeExclude(exclude: Person) {
        person.excludes = person.excludes.filter((e) => e !== exclude);
    }

    function addExclude() {
        person.excludes = [...person.excludes, $people.filter((p) => p !== person)[0]];
    }
</script>

<div>
    {#each person.excludes as exclude}
        <div>
            <select bind:value={exclude}>
                {#each $people as other_person}
                    {#if other_person !== person}
                        <option value={other_person}>{other_person.name}</option>
                    {/if}
                {/each}
            </select>
            <button on:click={() => removeExclude(exclude)}>Remove</button>
        </div>
    {/each}
    <button on:click={() => addExclude()}>Add Exclude</button>
</div>