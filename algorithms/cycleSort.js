const cycleSort = {
    name: "Cycle Sort",
    description: "Cycle Sort is an in-place, unstable sorting algorithm that minimizes the number of writes to memory. It is useful when memory writes are expensive.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",

    * sort(array) {
        const n = array.length;
        let comparisons = 0;
        let swaps = 0;

        for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
            let item = array[cycleStart];
            let pos = cycleStart;

            // Find the position where the item belongs
            for (let i = cycleStart + 1; i < n; i++) {
                comparisons++;
                yield {
                    array: [...array],
                    selected: [cycleStart, i],
                    sorted: [],
                    comparisons,
                    swaps,
                };
                if (array[i] < item) {
                    pos++;
                }
            }

            // If the item is already in the correct position, continue
            if (pos === cycleStart) continue;

            // Skip duplicates
            while (item === array[pos]) {
                pos++;
            }

            // Swap the item to its correct position
            if (pos !== cycleStart) {
                [array[pos], item] = [item, array[pos]];
                swaps++;
                yield {
                    array: [...array],
                    selected: [pos, cycleStart],
                    sorted: [],
                    comparisons,
                    swaps,
                };
            }

            // Rotate the rest of the cycle
            while (pos !== cycleStart) {
                pos = cycleStart;

                // Find the position where the item belongs
                for (let i = cycleStart + 1; i < n; i++) {
                    comparisons++;
                    yield {
                        array: [...array],
                        selected: [cycleStart, i],
                        sorted: [],
                        comparisons,
                        swaps,
                    };
                    if (array[i] < item) {
                        pos++;
                    }
                }

                // Skip duplicates
                while (item === array[pos]) {
                    pos++;
                }

                // Swap the item to its correct position
                if (item !== array[pos]) {
                    [array[pos], item] = [item, array[pos]];
                    swaps++;
                    yield {
                        array: [...array],
                        selected: [pos, cycleStart],
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

export default cycleSort;