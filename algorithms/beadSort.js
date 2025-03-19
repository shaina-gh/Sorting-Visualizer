const beadSort = {
    name: "Bead Sort",
    description: "Bead Sort is a natural sorting algorithm that works by simulating the process of gravity acting on beads. It is also known as Gravity Sort.",
    timeComplexity: "O(n)", // For practical purposes, it can be O(S), where S is the sum of the input integers
    spaceComplexity: "O(n²)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        // Find the maximum value in the array
        const max = Math.max(...array);

        // Create a grid of beads
        const grid = Array.from({ length: n }, () => Array(max).fill(0));

        // Drop the beads
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < array[i]; j++) {
                grid[i][j] = 1;
                yield {
                    array: [...array],
                    selected: [i],
                    sorted: [],
                    comparisons,
                    swaps,
                };
            }
        }

        // Let the beads fall
        for (let j = 0; j < max; j++) {
            let sum = 0;
            for (let i = 0; i < n; i++) {
                sum += grid[i][j];
                grid[i][j] = 0;
            }
            for (let i = n - sum; i < n; i++) {
                grid[i][j] = 1;
                yield {
                    array: [...array],
                    selected: [i],
                    sorted: [],
                    comparisons,
                    swaps,
                };
            }
        }

        // Reconstruct the sorted array
        for (let i = 0; i < n; i++) {
            array[i] = grid[i].reduce((acc, val) => acc + val, 0);
            yield {
                array: [...array],
                selected: [i],
                sorted: Array.from({ length: i + 1 }, (_, j) => j),
                comparisons,
                swaps,
            };
        }

        // Return final state
        return {
            array,
            selected: [],
            sorted: Array.from({ length: n }, (_, i) => i),
            comparisons,
            swaps,
        };
    },
};

export default beadSort;