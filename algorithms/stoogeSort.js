const stoogeSort = {
    name: "Stooge Sort",
    description: "Stooge Sort is a recursive sorting algorithm with a time complexity of O(n^(log 3 / log 1.5)). It is more of a theoretical curiosity than a practical sorting algorithm.",
    timeComplexity: "O(n^(log 3 / log 1.5))", // Approximately O(n^2.709)
    spaceComplexity: "O(n)",

    * sort(array, l = 0, r = array.length - 1, comparisons = 0, swaps = 0) {
        if (l >= r) return { comparisons, swaps };

        // If the first element is greater than the last, swap them
        comparisons++;
        yield {
            array: [...array],
            selected: [l, r],
            sorted: [],
            comparisons,
            swaps,
        };
        if (array[l] > array[r]) {
            [array[l], array[r]] = [array[r], array[l]];
            swaps++;
            yield {
                array: [...array],
                selected: [l, r],
                sorted: [],
                comparisons,
                swaps,
            };
        }

        // If there are more than 2 elements in the array
        if (r - l + 1 > 2) {
            const t = Math.floor((r - l + 1) / 3);

            // Recursively sort the first 2/3 of the array
            yield* this.sort(array, l, r - t, comparisons, swaps);

            // Recursively sort the last 2/3 of the array
            yield* this.sort(array, l + t, r, comparisons, swaps);

            // Recursively sort the first 2/3 of the array again
            yield* this.sort(array, l, r - t, comparisons, swaps);
        }

        // Return final state
        return {
            array,
            selected: [],
            sorted: Array.from({ length: array.length }, (_, i) => i),
            comparisons,
            swaps,
        };
    },
};

export default stoogeSort;