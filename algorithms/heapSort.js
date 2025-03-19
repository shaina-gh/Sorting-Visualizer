const heapSort = {
    name: "Heap Sort",
    description: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It builds a max-heap from the input array and repeatedly extracts the maximum element to sort the array.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        // Build a max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            yield* this.heapify(array, n, i, comparisons, swaps);
        }

        // Extract elements from the heap one by one
        for (let i = n - 1; i > 0; i--) {
            // Move the current root to the end
            [array[0], array[i]] = [array[i], array[0]];
            swaps++;
            yield {
                array: [...array],
                selected: [0, i],
                sorted: Array.from({ length: n - i - 1 }, (_, j) => i + j + 1),
                comparisons,
                swaps,
            };

            // Heapify the reduced heap
            yield* this.heapify(array, i, 0, comparisons, swaps);
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

    * heapify(array, n, i, comparisons, swaps) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        // Compare with left child
        if (left < n) {
            comparisons++;
            yield {
                array: [...array],
                selected: [i, left],
                sorted: [],
                comparisons,
                swaps,
            };
            if (array[left] > array[largest]) {
                largest = left;
            }
        }

        // Compare with right child
        if (right < n) {
            comparisons++;
            yield {
                array: [...array],
                selected: [i, right],
                sorted: [],
                comparisons,
                swaps,
            };
            if (array[right] > array[largest]) {
                largest = right;
            }
        }

        // If the largest is not the root, swap and heapify
        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            swaps++;
            yield {
                array: [...array],
                selected: [i, largest],
                sorted: [],
                comparisons,
                swaps,
            };
            yield* this.heapify(array, n, largest, comparisons, swaps);
        }
    },
};

export default heapSort;