const cocktailShakerSort = {
    name: "Cocktail Shaker Sort",
    description: "Cocktail Shaker Sort is a variation of Bubble Sort that sorts in both directions (left to right and right to left) in each pass. It is slightly more efficient than Bubble Sort.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;
        let sorted = false;

        while (!sorted) {
            sorted = true;

            // Left to right pass
            for (let i = 0; i < n - 1; i++) {
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

            if (sorted) break;

            // Right to left pass
            for (let i = n - 1; i > 0; i--) {
                comparisons++;
                yield {
                    array: [...array],
                    selected: [i, i - 1],
                    sorted: [],
                    comparisons,
                    swaps,
                };
                if (array[i] < array[i - 1]) {
                    [array[i], array[i - 1]] = [array[i - 1], array[i]];
                    swaps++;
                    sorted = false;
                    yield {
                        array: [...array],
                        selected: [i, i - 1],
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

export default cocktailShakerSort