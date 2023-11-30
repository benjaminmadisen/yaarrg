<script lang="ts">
    import ExcludeList from './ExcludeList.svelte';
    import type { Person } from './yaarrg';
    import { people } from './yaarrg';

    export let person: Person;

    function removePerson() {
        $people = $people.filter((p) => p !== person);
    }

    function copyAssignment() {
        if (person.encoded_assignment !== null){
            navigator.clipboard.writeText(window.location + person.encoded_assignment);
        } else {
            navigator.clipboard.writeText('')
        }
    }

    let expanded = false;
</script>

<div class="entryCard">
    <div class="topBar">
        <div class="nameBox">
            <input type="text" bind:value={person.name} />
            <button class="removePerson" on:click={() => removePerson()}>
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div>
        <div class="buttonBox">
            {#if person.encoded_assignment !== null}
                <button class="copyAssignment" on:click={() => copyAssignment()}>
                    <span class="material-symbols-outlined">
                        content_copy
                    </span>
                </button>
            {/if}
            <button class="expand" on:click={() => expanded = !expanded}>
                {#if expanded}
                    <span class="material-symbols-outlined">
                        expand_less
                    </span>
                {:else}
                    <span class="material-symbols-outlined">
                        expand_more
                    </span>
                {/if}
            </button>
        </div>
    </div>
    {#if expanded}
        <hr>
        <div class="excludeRow">
            <ExcludeList {person} />
        </div>
        {#if person.encoded_assignment !== null}
            <div class="assignRow">
                <div class="assignDesc"> 
                    Full link:
                </div>
                <a href={window.location + person.encoded_assignment}>
                    {window.location + person.encoded_assignment}
                </a>
            </div>
        {/if}
    {/if}
</div>


<style>
    .entryCard {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-bottom: 0.5em;
        padding: 0.5em;
        border-radius: 0.5em;
        background-color: #333;
    }
    .excludeRow {
        align-items: center;
        justify-content: space-between;
        margin: 0.5em;
    }
    .assignRow {
        align-items: center;
        justify-content: space-between;
        padding: 0.5em;
    }
    .entryCard > hr {
        width: 100%;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }
    .topBar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .nameBox {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .nameBox > button {
        margin-right: 0.5em;
        visibility: hidden;
    }
    .nameBox:hover > button {
        visibility: visible;
    }
    input {
        border: none;
        background-color: inherit;
        color: inherit;
        font-size: inherit;
    }
    .nameBox:hover > input {
        border-bottom: 1px solid gray;
    }
    .nameBox > input:focus {
        outline: none;
        border-bottom: 1px solid white;
    }
    button {
        border: none;
        background-color: inherit;
        color: inherit;
        cursor: pointer;
    }
    .assignRow {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .assignDesc {
        margin-right: 0.5em;
    }
    .assignRow > a {
        color: inherit;
    }
</style>