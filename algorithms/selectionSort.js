// Implementation of Selection Sort algorithm

const selectionSort = {
    name: "Selection Sort",
    description: "Selection Sort is a simple sorting algorithm that repeatedly selects the smallest (or largest) element from the unsorted portion of the list and swaps it with the first unsorted element.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;
        let sorted = [];

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;

            // Highlight the current minimum element
            yield {
                array: [...array],
                selected: [minIndex],
                sorted: [...sorted],
                comparisons,
                swaps
            };

            for (let j = i + 1; j < n; j++) {
                // Highlight the comparison
                yield {
                    array: [...array],
                    selected: [minIndex, j],
                    sorted: [...sorted],
                    comparisons,
                    swaps
                };

                comparisons++;

                if (array[j] < array[minIndex]) {
                    minIndex = j;

                    // Highlight the new minimum element
                    yield {
                        array: [...array],
                        selected: [minIndex],
                        sorted: [...sorted],
                        comparisons,
                        swaps
                    };
                }
            }

            if (minIndex !== i) {
                // Swap the found minimum element with the first element
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
                swaps++;

                // Highlight the swap
                yield {
                    array: [...array],
                    selected: [i, minIndex],
                    sorted: [...sorted],
                    comparisons,
                    swaps
                };
            }

            // Mark the current element as sorted
            sorted.push(i);
        }

        // Mark the last element as sorted
        sorted.push(n - 1);

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

export default selectionSort;