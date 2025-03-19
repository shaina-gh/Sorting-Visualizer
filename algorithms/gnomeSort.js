const gnomeSort = {
    name: "Gnome Sort",
    description: "Gnome Sort is a simple sorting algorithm that works similarly to Insertion Sort but with fewer swaps. It is named after the 'Gnome' who sorts flower pots in a garden.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;
        let index = 0;

        while (index < n) {
            if (index === 0 || array[index] >= array[index - 1]) {
                comparisons++;
                yield {
                    array: [...array],
                    selected: [index, index - 1],
                    sorted: [],
                    comparisons,
                    swaps,
                };
                index++;
            } else {
                [array[index], array[index - 1]] = [array[index - 1], array[index]];
                swaps++;
                yield {
                    array: [...array],
                    selected: [index, index - 1],
                    sorted: [],
                    comparisons,
                    swaps,
                };
                index--;
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

export default gnomeSort;