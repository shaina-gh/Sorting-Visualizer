// Implementation of Quick Sort algorithm

const quickSort = {
    name: "Quick Sort",
    description: "Quick Sort is a divide-and-conquer algorithm that selects a 'pivot' element and partitions the array into two halves, one with elements less than the pivot and the other with elements greater than the pivot. It then recursively sorts the two halves.",
    timeComplexity: "O(n log n) average, O(n²) worst case",
    spaceComplexity: "O(log n)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;
        let sorted = [];

        function* partition(arr, low, high) {
            const pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                // Highlight the comparison
                yield {
                    array: [...arr],
                    selected: [j, high],
                    sorted: [...sorted],
                    comparisons,
                    swaps
                };

                comparisons++;

                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    swaps++;

                    // Highlight the swap
                    yield {
                        array: [...arr],
                        selected: [i, j],
                        sorted: [...sorted],
                        comparisons,
                        swaps
                    };
                }
            }

            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            swaps++;

            // Highlight the final swap
            yield {
                array: [...arr],
                selected: [i + 1, high],
                sorted: [...sorted],
                comparisons,
                swaps
            };

            return i + 1;
        }

        function* quickSortHelper(arr, low, high) {
            if (low < high) {
                const pi = yield* partition(arr, low, high);

                yield* quickSortHelper(arr, low, pi - 1);
                yield* quickSortHelper(arr, pi + 1, high);
            }
        }

        yield* quickSortHelper(array, 0, n - 1);

        // Mark all elements as sorted
        sorted = Array.from({
            length: n
        }, (_, i) => i);

        // Return final state
        return {
            array,
            selected: [],
            sorted,
            comparisons,
            swaps
        };
    }
};

export default quickSort;