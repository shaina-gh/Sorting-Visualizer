const combSort = {
    name: "Comb Sort",
    description: "Comb Sort is an improvement over Bubble Sort that uses a gap sequence to compare elements that are far apart, reducing the number of swaps.",
    timeComplexity: "O(n²)", // Can be O(n log n) with optimal gap sequence
    spaceComplexity: "O(1)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;
        let gap = n;
        let shrink = 1.3;
        let sorted = false;

        while (!sorted) {
            gap = Math.floor(gap / shrink);
            if (gap <= 1) {
                gap = 1;
                sorted = true;
            }

            for (let i = 0; i + gap < n; i++) {
                comparisons++;
                yield {
                    array: [...array],
                    selected: [i, i + gap],
                    sorted: [],
                    comparisons,
                    swaps,
                };
                if (array[i] > array[i + gap]) {
                    [array[i], array[i + gap]] = [array[i + gap], array[i]];
                    swaps++;
                    sorted = false;
                    yield {
                        array: [...array],
                        selected: [i, i + gap],
                        sorted: [],
                        comparisons,
                        swaps,
                    };
                }
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
};

export default combSort;