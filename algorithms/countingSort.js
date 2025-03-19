const countingSort = {
    name: "Counting Sort",
    description: "Counting Sort is a non-comparison-based sorting algorithm that works well for integers within a specific range. It counts the occurrences of each element and uses this information to place elements in the correct position.",
    timeComplexity: "O(n + k)", // k is the range of input
    spaceComplexity: "O(k)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        // Find the maximum value in the array
        const max = Math.max(...array);
        const count = Array(max + 1).fill(0);

        // Count the occurrences of each element
        for (let i = 0; i < n; i++) {
            count[array[i]]++;
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
        for (let i = 0; i <= max; i++) {
            while (count[i] > 0) {
                array[index] = i;
                count[i]--;
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

export default countingSort;