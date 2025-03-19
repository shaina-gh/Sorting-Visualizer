// Implementation of Merge Sort algorithm

const mergeSort = {
    name: "Merge Sort",
    description: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;
        let sorted = [];

        function* merge(arr, left, mid, right) {
            const leftArr = arr.slice(left, mid + 1);
            const rightArr = arr.slice(mid + 1, right + 1);

            let i = 0,
                j = 0,
                k = left;

            while (i < leftArr.length && j < rightArr.length) {
                // Highlight the comparison
                yield {
                    array: [...arr],
                    selected: [left + i, mid + 1 + j],
                    sorted: [...sorted],
                    comparisons,
                    swaps
                };

                comparisons++;

                if (leftArr[i] <= rightArr[j]) {
                    arr[k] = leftArr[i];
                    i++;
                } else {
                    arr[k] = rightArr[j];
                    j++;
                }
                k++;
                swaps++;

                // Highlight the merge
                yield {
                    array: [...arr],
                    selected: [k - 1],
                    sorted: [...sorted],
                    comparisons,
                    swaps
                };
            }

            while (i < leftArr.length) {
                arr[k] = leftArr[i];
                i++;
                k++;
                swaps++;

                // Highlight the merge
                yield {
                    array: [...arr],
                    selected: [k - 1],
                    sorted: [...sorted],
                    comparisons,
                    swaps
                };
            }

            while (j < rightArr.length) {
                arr[k] = rightArr[j];
                j++;
                k++;
                swaps++;

                // Highlight the merge
                yield {
                    array: [...arr],
                    selected: [k - 1],
                    sorted: [...sorted],
                    comparisons,
                    swaps
                };
            }
        }

        function* mergeSortHelper(arr, left, right) {
            if (left < right) {
                const mid = Math.floor((left + right) / 2);

                yield* mergeSortHelper(arr, left, mid);
                yield* mergeSortHelper(arr, mid + 1, right);
                yield* merge(arr, left, mid, right);
            }
        }

        yield* mergeSortHelper(array, 0, n - 1);

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

export default mergeSort;