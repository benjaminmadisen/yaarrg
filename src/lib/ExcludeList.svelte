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

<div id="excludeList">
    <div id="excludeDesc">
        Exclude: 
    </div>
    {#each person.excludes as exclude}
        <div class="excludee">
            <select bind:value={exclude}>
                {#each $people as other_person}
                    {#if other_person !== person}
                        <option value={other_person}>{other_person.name}</option>
                    {/if}
                {/each}
            </select>
            <button class="removeExcludee" on:click={() => removeExclude(exclude)}>
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div>
    {/each}
    <button on:click={() => addExclude()}>
        <span class="material-symbols-outlined">
            add_circle
        </span>
    </button>
</div>

<style>
    #excludeList {
        max-width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        flex-flow: wrap;
    }
    #excludeDesc {
        margin-right: 0.5em;
    }
    .excludee {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #666;
        border-radius: 0.5em;
        padding: 0.25em;
    }
    select {
        border: none;
        background-color: inherit;
        color: inherit;
        font-size: inherit;
    }
    select:hover {
        border-bottom: 1px solid gray;
    }
    select:focus {
        outline: none;
        border-bottom: 1px solid white;
    }
    button {
        border: none;
        background-color: inherit;
        color: inherit;
        font-size: inherit;
    }
</style>