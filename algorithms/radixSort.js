const radixSort = {
    name: "Radix Sort",
    description: "Radix Sort is a non-comparison-based sorting algorithm that sorts numbers by processing individual digits. It can be implemented using either Least Significant Digit (LSD) or Most Significant Digit (MSD).",
    timeComplexity: "O(nk)", // k is the number of digits
    spaceComplexity: "O(n + k)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        // Find the maximum number to know the number of digits
        const max = Math.max(...array);

        // Do counting sort for every digit
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            yield* this.countingSort(array, n, exp, comparisons, swaps);
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

    * countingSort(array, n, exp, comparisons, swaps) {
        const output = Array(n).fill(0);
        const count = Array(10).fill(0);

        // Store count of occurrences in count[]
        for (let i = 0; i < n; i++) {
            count[Math.floor(array[i] / exp) % 10]++;
            yield {
                array: [...array],
                selected: [i],
                sorted: [],
                comparisons,
                swaps,
            };
        }

        // Change count[i] so that it contains the actual position of this digit in output[]
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        for (let i = n - 1; i >= 0; i--) {
            output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
            count[Math.floor(array[i] / exp) % 10]--;
            swaps++;
            yield {
                array: [...output],
                selected: [i],
                sorted: [],
                comparisons,
                swaps,
            };
        }

        // Copy the output array to the original array
        for (let i = 0; i < n; i++) {
            array[i] = output[i];
            yield {
                array: [...array],
                selected: [i],
                sorted: [],
                comparisons,
                swaps,
            };
        }
    },
};

export default radixSort;