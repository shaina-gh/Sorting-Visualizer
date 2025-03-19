// Utility script to dynamically load algorithms from the algorithms folder

export async function loadAlgorithms() {
    const algorithms = {};

    // Fetch the list of algorithm files dynamically
    const algorithmFiles = await fetchAlgorithmList();

    for (const file of algorithmFiles) {
        try {
            const module = await import(`./algorithms/${file}`);
            algorithms[module.default.name] = module.default;
        } catch (error) {
            console.error(`Failed to load algorithm from ${file}:`, error);
        }
    }

    return algorithms;
}

// Function to fetch the list of algorithm files
async function fetchAlgorithmList() {
    return [
        'bubbleSort.js',
        'insertionSort.js',
        'selectionSort.js',
        'mergeSort.js',
        'quickSort.js',
        'heapSort.js',
        'shellSort.js',
        'countingSort.js',
        'radixSort.js',
        'cocktailShakerSort.js',
        'gnomeSort.js',
        'bogoSort.js'
    ];
}