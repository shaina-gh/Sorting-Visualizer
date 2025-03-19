const oddEvenSort = {
    name: "Odd-Even Sort",
    description: "Odd-Even Sort is a variation of Bubble Sort that compares and swaps adjacent elements in two phases: odd-indexed elements and even-indexed elements.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;
        let sorted = false;

        while (!sorted) {
            sorted = true;

            // Odd phase
            for (let i = 1; i < n - 1; i += 2) {
                comparisons++;
                yield {
                    array: [...array],
                    selected: [i, i + 1],
                    sorted: [],
                    comparisons,
                    swaps,
                };
                if (array[i] > array[i + 1]) {
                    [array[i], array[i + 1]] = [array[i + 1], array[i]];
                    swaps++;
                    sorted = false;
                    yield {
                        array: [...array],
                        selected: [i, i + 1],
                        sorted: [],
                        comparisons,
                        swaps,
                    };
                }
            }

            // Even phase
            for (let i = 0; i < n - 1; i += 2) {
                comparisons++;
                yield {
                    array: [...array],
                    selected: [i, i + 1],
                    sorted: [],
                    comparisons,
                    swaps,
                };
                if (array[i] > array[i + 1]) {
                    [array[i], array[i + 1]] = [array[i + 1], array[i]];
                    swaps++;
                    sorted = false;
                    yield {
                        array: [...array],
                        selected: [i, i + 1],
                        sorted: [],
                        comparisons,
                        swaps,
                    };
                }
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

export default oddEvenSort;