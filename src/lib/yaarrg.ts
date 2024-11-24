import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const people: Writable<Person[]> = writable([]);

export const assignment_cycles: Writable<number> = writable(1);

export type Person = {
    name: string;
    excludes: Person[];
    requires: Person[];
    assignment: Person[] | null;
    encoded_assignment: string | null;
}

export function assign_people(people: Person[], assignment_cycles: number): Person[] {
    // Assign people to each other, if possible.
    //
    // Args:
    //   people: A list of people to assign.
    //   assignment_cycles: The number of gift cycles to attempt to assign.
    //
    // Returns:
    //   A list of people with assignments.

    // We reset prior assignments, whether or not this version finds a cycle.
    people.forEach((person) => {
        person.assignment = null;
    });

    // We create a copy of the input people to return.
    const assigned_people = people.map((person) => {
        return { ...person };
    });

    // We start by creating a map of exclude indices.
    const excludes = new Map<number, number[]>();
    people.forEach((person, index) => {
        excludes.set(index, person.excludes.map((x) => people.indexOf(x)));
    });

    // And a map of require indices.
    const requires = new Map<number, number[]>();
    people.forEach((person, index) => {
        requires.set(index, person.requires.map((x) => people.indexOf(x)));
    });

    // Attempt to find a cycle x times, excluding the assignments of prior cycles in later searches.
    for (let i = 0; i < assignment_cycles; i++) {
        // We get the edge map.
        const edge_map = get_edge_map(people.length, excludes, requires);

        // We find a cycle if one exists.
        const cycle = find_cycle(edge_map);

        // If cycle is null, there is no cycle, and we return null assignments.
        if (cycle === null) {
            return people;
        }

        // If there is a cycle, we assign each person to the next person in the cycle.
        // We also exclude these assignments in future cycles.
        assigned_people.forEach((person, index) => {
            if (person.assignment !== null) {
                person.assignment.push(people[cycle[(cycle.indexOf(index) + 1) % cycle.length]]);
            } else {
                person.assignment = [people[cycle[(cycle.indexOf(index) + 1) % cycle.length]]];
            }
            if (excludes.has(index)) {
                excludes.set(index, excludes.get(index)!.concat([cycle[(cycle.indexOf(index) + 1) % cycle.length]]));
            } else {
                excludes.set(index, [cycle[(cycle.indexOf(index) + 1) % cycle.length]]);
            }
        });
    }

    // Once all assignments are made, we encode them.
    const max_length_name = Math.max(...people.map((person) => person.name.length));
    assigned_people.forEach((person) => {
        const combined_name = person.assignment!.map((x) => x.name).join('___');
        person.encoded_assignment = get_encoded_assignment(person.name, combined_name, (max_length_name * person.assignment!.length) + (3 * (person.assignment!.length - 1)));
    });

    return assigned_people;
}

function find_cycle(edge_map: Map<number, number[]>): number[] | null {
    // Find a cycle containing every node in a directed graph, if one exists.
    //
    // Args:
    //   edge_map: A map from each node to the nodes it points to.
    //
    // Returns:
    //   A cycle of the graph as a list of nodes if one exists, or null if not.

    // This is a depth-first search. We keep track of the current path by
    // track of which nodes we've visited from each node, so we don't repeat.
    const path: number[] = [];
    const visited = new Map<number, number[]>();
    // We randomly choose a starting node.
    path.push(Math.floor(Math.random() * edge_map.size));
    visited.set(path[0], []);

    while (true) {
        const options = edge_map.get(path[path.length - 1])!.filter((x) => !visited.get(path[path.length - 1])!.includes(x) && !path.includes(x));
        if (path.length === edge_map.size && edge_map.get(path[path.length - 1])!.includes(path[0])) {
            // We've visited every node, and we're back at the beginning, so we have a cycle.
            return path;
        } else if (options.length === 0) {
            // We've visited all the nodes we can from this node, so we backtrack.
            if (path.length === 1) {
                // We've backtracked all the way to the beginning, so there's no cycle.
                return null;
            }
            visited.delete(path.pop()!);
        } else {
            // We haven't visited all the nodes we can from this node, so we visit one.
            const next = options[Math.floor(Math.random() * options.length)];
            visited.get(path[path.length - 1])!.push(next);
            path.push(next);
            visited.set(next, []);
        }
    }
}

function get_edge_map(edges: number, excludes: Map<number, number[]>, requires: Map<number, number[]>): Map<number, number[]> {
    // Get a map from each node to the nodes it points to.
    //
    // Args:
    //   edges: The number of edges in the graph.
    //   excludes: A map for each node of nodes that cannot be connected.
    //   requires: A map for each node of nodes where connections must come from.
    //
    // Returns:
    //   A map from each node to the nodes it points to.

    // We start with a map from each node to an empty list.
    const edge_map = new Map<number, number[]>();

    // We add edges between nodes that must be connected.
    requires.forEach((options, index) => {
        edge_map.set(index, options);
    });

    // We add all edges to nodes with no requirements.
    const all_options = Array.from(Array(edges).keys());
    for (let i = 0; i < edges; i++) {
        edge_map.set(i, all_options.filter((x) => x !== i));
    }

    // We remove edges between nodes that cannot be connected.
    excludes.forEach((options, index) => {
        edge_map.set(index, edge_map.get(index)!.filter((x) => !options.includes(x)));
    });

    return edge_map;
}

function get_encoded_assignment(name: string, assignment: string, max_length_name: number): string {
    // Get an encoded assignment string.
    //
    // Args:
    //   name: The name of the person.
    //   assignment: The name of the person they are assigned to.
    //
    // Returns:
    //   An encoded assignment string.

    const input_alphabet = 'abcdefghijklmnopqrstuvwxyz_';
    const output_alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Get a random 3 character seed from the input alphabet.
    let seed = '';
    while (seed.length < 3) {
        seed += input_alphabet[Math.floor(Math.random() * input_alphabet.length)];
    }

    // Convert spaces in name into underscores.
    name = name.replaceAll(' ', '_');
    assignment = assignment.replaceAll(' ', '_');

    return `?n=${name}&a=${seed}${encode(assignment, name+seed, max_length_name, input_alphabet, output_alphabet)}`;
}

export function get_decoded_assignment(name: string, assignment: string): string {
    // Get a decoded assignment string.
    //
    // Args:
    //   encoded_assignment: The encoded assignment string.
    //
    // Returns:
    //   The decoded assignment string.

    const input_alphabet = 'abcdefghijklmnopqrstuvwxyz_';
    const output_alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // We get the seed from the encoded name.
    const seed = assignment.slice(0, 3);
    const encoded_name = assignment.slice(3);
    name = name.replaceAll(' ', '_');
    return decode(encoded_name, name+seed, input_alphabet, output_alphabet).replaceAll('___',' and ').replaceAll('_', ' ');
}

function encode(input: string, seed: string, padded_input_length: number, input_alphabet: string, output_alphabet: string) {
    // Encode a string.
    //
    // Args:
    //   input: The string to encode.
    //   seed: The seed to use for the random number generator.
    //   padded_input_length: The length of the input after padding.
    //   input_alphabet: The alphabet to use for the input.
    //   output_alphabet: The alphabet to use for the output.
    //
    // Returns:
    //   The encoded string.

    // We get the shuffled alphabet to use.
    const shuffled_alphabet = get_shuffled_alphabet(seed, input_alphabet, output_alphabet);

    // We pad the input.
    let input_padding = '';
    while (input_padding.length + input.length + 1 < padded_input_length) {
        input_padding += input_alphabet[shuffled_alphabet.length * input_padding.length % input_alphabet.length];
    }

    // We create an integer from the input.
    let input_integer = BigInt(0);
    for (let i = 0; i < input.length; i++) {
        input_integer += BigInt(input_alphabet.indexOf(input[i])) * BigInt(input_alphabet.length+1) ** BigInt(i);
    }
    input_integer += BigInt(input_alphabet.length) * BigInt(input_alphabet.length+1) ** BigInt(input.length);
    for (let i = 0; i < input_padding.length; i++) {
        input_integer += BigInt(input_alphabet.indexOf(input_padding[i])) * BigInt((input_alphabet.length+1)) ** BigInt((input.length + i + 1));
    }

    // We create the output string.
    let output = '';
    while (input_integer > 0) {
        output += shuffled_alphabet.at(Number(input_integer % BigInt(shuffled_alphabet.length)));
        input_integer = input_integer / BigInt(shuffled_alphabet.length);
    }
    return output;
}

function decode(input: string, seed: string, input_alphabet: string, output_alphabet: string): string {
    // Decode a string.
    //
    // Args:
    //   input: The string to decode.
    //   seed: The seed to use for the random number generator.
    //   input_alphabet: The alphabet to use for the input.
    //   output_alphabet: The alphabet to use for the output.
    //
    // Returns:
    //   The decoded string.

    // We get the shuffled alphabet to use.
    const shuffled_alphabet = get_shuffled_alphabet(seed, input_alphabet, output_alphabet);

    // We create an integer from the input.
    let input_integer = BigInt(0);
    for (let i = 0; i < input.length; i++) {
        input_integer += BigInt(shuffled_alphabet.indexOf(input[i])) * BigInt(shuffled_alphabet.length) ** BigInt(i);
    }

    // We create the output string.
    let output = '';
    while (input_integer > 0) {
        const output_index = input_integer % BigInt(input_alphabet.length+1);
        if (Number(output_index) === input_alphabet.length) {
            break;
        } else {
            output += input_alphabet.at(Number(output_index));
        }
        input_integer = input_integer / BigInt(input_alphabet.length+1);
    }
    return output;
}

function get_shuffled_alphabet(seed: string, input_alphabet: string, output_alphabet: string): string[] {
    // Get a shuffled alphabet.
    //
    // Args:
    //   seed: The seed to use for the random number generator.
    //
    // Returns:
    //   A shuffled alphabet.

    // We get the alphabet.
    const alphabet = output_alphabet.split('');
    const input_alphabet_length = input_alphabet.length;

    // We find the pattern in the seed string.
    const pattern = [0];
    for (let i = 0; i < seed.length; i++) {
        pattern.push((input_alphabet_length+alphabet.indexOf(seed[i])-pattern[i]+i) % input_alphabet_length);
    }
    pattern.reverse().pop();

    // We create a shuffled alphabet by taking elements from the alphabet based on the next available character in the pattern.
    const shuffled_alphabet: string[] = [];
    let pattern_index = 0;
    let alphabet_index = 0;
    while (true) {
        if (shuffled_alphabet.length === alphabet.length) {
            break;
        }
        if (shuffled_alphabet.includes(alphabet[alphabet_index])) {
            alphabet_index = (alphabet_index + 1) % alphabet.length;
        } else {
            shuffled_alphabet.push(alphabet[alphabet_index]);
            alphabet_index = (alphabet_index + pattern[pattern_index]) % alphabet.length;
            pattern_index = (pattern_index + 1) % pattern.length;
        }
    }
    return shuffled_alphabet;
}