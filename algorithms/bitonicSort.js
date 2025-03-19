const bitonicSort = {
    name: "Bitonic Sort",
    description: "Bitonic Sort is a parallel sorting algorithm that works by building bitonic sequences and then merging them. It is primarily used in parallel computing environments.",
    timeComplexity: "O(n log² n)",
    spaceComplexity: "O(n log² n)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        yield* this.bitonicSortHelper(array, 0, n, true, comparisons, swaps);

        // Return final state
        return {
            array,
            selected: [],
            sorted: Array.from({ length: n }, (_, i) => i),
            comparisons,
            swaps,
        };
    },

    * bitonicSortHelper(array, low, cnt, dir, comparisons, swaps) {
        if (cnt > 1) {
            const k = Math.floor(cnt / 2);

            // Sort in ascending order if dir is true, else descending
            yield* this.bitonicSortHelper(array, low, k, true, comparisons, swaps);
            yield* this.bitonicSortHelper(array, low + k, k, false, comparisons, swaps);

            // Merge the whole sequence
            yield* this.bitonicMerge(array, low, cnt, dir, comparisons, swaps);
        }
    },

    * bitonicMerge(array, low, cnt, dir, comparisons, swaps) {
        if (cnt > 1) {
            const k = this.greatestPowerOfTwoLessThan(cnt);

            for (let i = low; i < low + cnt - k; i++) {
                comparisons++;
                yield {
                    array: [...array],
                    selected: [i, i + k],
                    sorted: [],
                    comparisons,
                    swaps,
                };
                if (dir === (array[i] > array[i + k])) {
                    [array[i], array[i + k]] = [array[i + k], array[i]];
                    swaps++;
                    yield {
                        array: [...array],
                        selected: [i, i + k],
                        sorted: [],
                        comparisons,
                        swaps,
                    };
                }
            }

            yield* this.bitonicMerge(array, low, k, dir, comparisons, swaps);
            yield* this.bitonicMerge(array, low + k, cnt - k, dir, comparisons, swaps);
        }
    },

    greatestPowerOfTwoLessThan(n) {
        let k = 1;
        while (k < n) {
            k = k << 1;
        }
        return k >> 1;
    },
};

export default bitonicSort;