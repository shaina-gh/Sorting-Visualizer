// Implementation of Insertion Sort algorithm

const insertionSort = {
    name: "Insertion Sort",
    description: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It works by taking elements from the unsorted part and inserting them at the correct position in the sorted part.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",

    // Generator function that yields at each comparison/swap for visualization
    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;
        let sorted = [0]; // First element is considered sorted initially

        for (let i = 1; i < n; i++) {
            const key = array[i];
            let j = i - 1;

            // Highlight the current element being inserted
            yield {
                array: [...array],
                selected: [i],
                sorted: [...sorted],
                comparisons,
                swaps
            };

            while (j >= 0) {
                // Highlight the comparison
                yield {
                    array: [...array],
                    selected: [j, i],
                    sorted: [...sorted],
                    comparisons,
                    swaps
                };

                comparisons++;

                if (array[j] > key) {
                    // Move elements greater than key one position ahead
                    array[j + 1] = array[j];
                    j--;
                    swaps++;

                    // Show the shift
                    yield {
                        array: [...array],
                        selected: [j + 1, i],
                        sorted: [...sorted],
                        comparisons,
                        swaps
                    };
                } else {
                    break;
                }
            }

            // Place the key at its correct position
            array[j + 1] = key;

            // Add current index to sorted portion
            sorted.push(i);

            // Show the insertion
            yield {
                array: [...array],
                selected: [j + 1],
                sorted: [...sorted],
                comparisons,
                swaps
            };
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

export default insertionSort;