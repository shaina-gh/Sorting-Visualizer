const pigeonholeSort = {
    name: "Pigeonhole Sort",
    description: "Pigeonhole Sort is a non-comparison-based sorting algorithm that works well for integers within a specific range. It places each element into its corresponding 'pigeonhole.'",
    timeComplexity: "O(n + range)", // range is the difference between max and min
    spaceComplexity: "O(range)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        // Find the range of the array
        const min = Math.min(...array);
        const max = Math.max(...array);
        const range = max - min + 1;

        // Create pigeonholes
        const pigeonholes = Array(range).fill(0);

        // Populate pigeonholes
        for (let i = 0; i < n; i++) {
            pigeonholes[array[i] - min]++;
            yield {
                array: [...array],
                selected: [i],
                sorted: [],
                comparisons,
                swaps,
            };
        }

        // Reconstruct the sorted array
        let index = 0;
        for (let i = 0; i < range; i++) {
            while (pigeonholes[i] > 0) {
                array[index] = i + min;
                pigeonholes[i]--;
                index++;
                swaps++;
                yield {
                    array: [...array],
                    selected: [index - 1],
                    sorted: Array.from({ length: index }, (_, j) => j),
                    comparisons,
                    swaps,
                };
            }
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

export default pigeonholeSort;