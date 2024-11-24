<script lang="ts">
    import { assignment_cycles } from "./yaarrg";

    let expanded = false;
</script>

<div class="advancedOptions">
    <button class="expand" on:click={() => expanded = !expanded}>
        {#if expanded}
            Advanced Options
            <span class="material-symbols-outlined">
                expand_less
            </span>
        {:else}
        Advanced Options
            <span class="material-symbols-outlined">
                expand_more
            </span>
        {/if}
    </button>
    {#if expanded}
        <div class="optionBox">
            <label for="assignment-cycles">Number of gift cycles:</label>
            <input type="number" id="assignment-cycles" bind:value={$assignment_cycles} />
        </div>
    {/if}
</div>

<style>
    .advancedOptions {
        margin-top: 4em;
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
    .optionBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1em;
    }
</style>