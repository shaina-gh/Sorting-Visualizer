const shellSort = {
    name: "Shell Sort",
    description: "Shell Sort is an optimization of Insertion Sort that allows the exchange of items that are far apart. It uses a gap sequence to sort elements that are distant from each other.",
    timeComplexity: "O(n log² n)",
    spaceComplexity: "O(1)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        // Start with a large gap and reduce it
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                const temp = array[i];
                let j;
                for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                    array[j] = array[j - gap];
                    swaps++;
                    comparisons++;
                    yield {
                        array: [...array],
                        selected: [j, j - gap],
                        sorted: [],
                        comparisons,
                        swaps,
                    };
                }
                array[j] = temp;
                swaps++;
                yield {
                    array: [...array],
                    selected: [j, i],
                    sorted: [],
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
};

export default shellSort;