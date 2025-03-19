// Implementation of Bubble Sort algorithm

const bubbleSort = {
    name: "Bubble Sort",
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",

    // Generator function that yields at each comparison/swap for visualization
    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;
        let sorted = []; // Keep track of sorted positions

        for (let i = 0; i < n; i++) {
            let swapped = false;

            for (let j = 0; j < n - i - 1; j++) {
                // Highlight elements being compared
                yield {
                    array: [...array],
                    selected: [j, j + 1],
                    sorted: [...sorted],
                    comparisons,
                    swaps
                };

                comparisons++;

                if (array[j] > array[j + 1]) {
                    // Swap elements
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    swapped = true;
                    swaps++;

                    // Yield after swap to show the change
                    yield {
                        array: [...array],
                        selected: [j, j + 1],
                        sorted: [...sorted],
                        comparisons,
                        swaps
                    };
                }
            }

            // Mark the last element in this pass as sorted
            sorted.push(n - i - 1);

            // Yield to show the newly sorted element
            yield {
                array: [...array],
                selected: [],
                sorted: [...sorted],
                comparisons,
                swaps
            };

            // If no swaps were made in this pass, the array is sorted
            if (!swapped) {
                // Mark all remaining elements as sorted
                for (let k = 0; k < n - i - 1; k++) {
                    if (!sorted.includes(k)) {
                        sorted.push(k);
                    }
                }
                break;
            }
        }

        // Return final state
        return {
            array,
            selected: [],
            sorted: Array.from({
                length: n
            }, (_, i) => i),
            comparisons,
            swaps
        };
    }
};

export default bubbleSort;