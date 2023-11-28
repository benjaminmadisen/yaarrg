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

<button on:click={addPerson}>Add Person</button>