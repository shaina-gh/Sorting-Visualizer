const bogoSort = {
    name: "Bogo Sort",
    description: "Bogo Sort is a highly inefficient sorting algorithm that works by shuffling the array randomly until it is sorted. It is included here for fun and educational purposes.",
    timeComplexity: "O((n+1)!)", // Extremely inefficient
    spaceComplexity: "O(1)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        while (!this.isSorted(array)) {
            // Shuffle the array randomly
            for (let i = n - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
                swaps++;
                yield {
                    array: [...array],
                    selected: [i, j],
                    sorted: [],
                    comparisons,
                    swaps,
                };
            }
            comparisons++;
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

    isSorted(array) {
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                return false;
            }
        }
        return true;
    },
};

export default bogoSort;