const bucketSort = {
    name: "Bucket Sort",
    description: "Bucket Sort is a distribution-based sorting algorithm that works by distributing elements into a number of buckets and then sorting each bucket individually.",
    timeComplexity: "O(n + k)", // k is the number of buckets
    spaceComplexity: "O(n + k)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        // Find the maximum and minimum values in the array
        const max = Math.max(...array);
        const min = Math.min(...array);

        // Create buckets
        const bucketSize = 5; // Number of buckets (can be adjusted)
        const bucketCount = Math.floor((max - min) / bucketSize) + 1;
        const buckets = Array.from({ length: bucketCount }, () => []);

        // Distribute elements into buckets
        for (let i = 0; i < n; i++) {
            const bucketIndex = Math.floor((array[i] - min) / bucketSize);
            buckets[bucketIndex].push(array[i]);
            yield {
                array: [...array],
                selected: [i],
                sorted: [],
                comparisons,
                swaps,
            };
        }

        // Sort each bucket and reconstruct the array
        let index = 0;
        for (let i = 0; i < bucketCount; i++) {
            yield* this.insertionSort(buckets[i], comparisons, swaps);
            for (let j = 0; j < buckets[i].length; j++) {
                array[index] = buckets[i][j];
                index++;
                swaps++;
                yield {
                    array: [...array],
                    selected: [index - 1],
                    sorted: Array.from({ length: index }, (_, k) => k),
                    comparisons,
                    swaps,
                };
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

    * insertionSort(array, comparisons, swaps) {
        for (let i = 1; i < array.length; i++) {
            const temp = array[i];
            let j = i - 1;

            while (j >= 0 && array[j] > temp) {
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
};

export default bucketSort;