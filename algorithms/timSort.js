const timSort = {
    name: "Tim Sort",
    description: "Tim Sort is a hybrid sorting algorithm derived from Merge Sort and Insertion Sort. It is the default sorting algorithm in Python and Java (for objects).",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",

    * sort(array) {
        const n = array.length;
        const RUN = 32; // Size of the run (can be adjusted)
        let comparisons = 0;
        let swaps = 0;

        // Sort individual subarrays of size RUN
        for (let i = 0; i < n; i += RUN) {
            yield* this.insertionSort(array, i, Math.min(i + RUN - 1, n - 1), comparisons, swaps);
        }

        // Merge the sorted runs
        for (let size = RUN; size < n; size = 2 * size) {
            for (let left = 0; left < n; left += 2 * size) {
                const mid = left + size - 1;
                const right = Math.min(left + 2 * size - 1, n - 1);

                yield* this.merge(array, left, mid, right, comparisons, swaps);
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

    * insertionSort(array, left, right, comparisons, swaps) {
        for (let i = left + 1; i <= right; i++) {
            const temp = array[i];
            let j = i - 1;

            while (j >= left && array[j] > temp) {
                comparisons++;
                yield {
                    array: [...array],
                    selected: [j, j + 1],
                    sorted: [],
                    comparisons,
                    swaps,
                };
                array[j + 1] = array[j];
                swaps++;
                j--;
            }

            array[j + 1] = temp;
            swaps++;
            yield {
                array: [...array],
                selected: [j + 1],
                sorted: [],
                comparisons,
                swaps,
            };
        }
    },

    * merge(array, left, mid, right, comparisons, swaps) {
        const len1 = mid - left + 1;
        const len2 = right - mid;
        const leftArray = array.slice(left, mid + 1);
        const rightArray = array.slice(mid + 1, right + 1);

        let i = 0,
            j = 0,
            k = left;

        while (i < len1 && j < len2) {
            comparisons++;
            yield {
                array: [...array],
                selected: [left + i, mid + 1 + j],
                sorted: [],
                comparisons,
                swaps,
            };
            if (leftArray[i] <= rightArray[j]) {
                array[k] = leftArray[i];
                i++;
            } else {
                array[k] = rightArray[j];
                j++;
            }
            swaps++;
            k++;
        }

        while (i < len1) {
            array[k] = leftArray[i];
            i++;
            k++;
            swaps++;
            yield {
                array: [...array],
                selected: [k],
                sorted: [],
                comparisons,
                swaps,
            };
        }

        while (j < len2) {
            array[k] = rightArray[j];
            j++;
            k++;
            swaps++;
            yield {
                array: [...array],
                selected: [k],
                sorted: [],
                comparisons,
                swaps,
            };
        }
    },
};

export default timSort;