const pancakeSort = {
    name: "Pancake Sort",
    description: "Pancake Sort is a sorting algorithm that sorts an array by repeatedly flipping portions of the array, similar to flipping pancakes in a pan.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        for (let i = n; i > 1; i--) {
            // Find the index of the maximum element in the unsorted portion
            let maxIndex = 0;
            for (let j = 1; j < i; j++) {
                comparisons++;
                yield {
                    array: [...array],
                    selected: [j, maxIndex],
                    sorted: Array.from({ length: n - i }, (_, k) => i + k),
                    comparisons,
                    swaps,
                };
                if (array[j] > array[maxIndex]) {
                    maxIndex = j;
                }
            }

            // Flip the array to bring the maximum element to the front
            if (maxIndex !== i - 1) {
                yield* this.flip(array, maxIndex, comparisons, swaps);
                yield* this.flip(array, i - 1, comparisons, swaps);
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

    * flip(array, end, comparisons, swaps) {
        let start = 0;
        while (start < end) {
            [array[start], array[end]] = [array[end], array[start]];
            swaps++;
            yield {
                array: [...array],
                selected: [start, end],
                sorted: [],
                comparisons,
                swaps,
            };
            start++;
            end--;
        }
    },
};

export default pancakeSort;