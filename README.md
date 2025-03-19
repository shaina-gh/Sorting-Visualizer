<div align="center">

# [WebSort](https://thatsinewave.github.io/WebSort)

WebSort is an interactive web-based sorting algorithm visualizer that allows users to observe and compare various sorting algorithms in real-time. The project provides a visual and auditory representation of how different sorting algorithms manipulate data, making it easier to understand their behavior, efficiency, and performance characteristics.

![WebSort](https://raw.githubusercontent.com/ThatSINEWAVE/WebSort/refs/heads/main/.github/SCREENSHOTS/WebSort.png)

</div>

## Features

- **Visual Representation**: See sorting algorithms in action with dynamic bar visualization
- **Audio Feedback**: Hear the sorting process with pitch changes based on swap frequency
- **Real-time Statistics**: Track comparisons, swaps, and elapsed time
- **Interactive Controls**:
  - Adjust array size (10-500 elements)
  - Control visualization speed
  - Pause, resume, and reset sorting operations
  - Generate new random arrays
- **Algorithm Information**: View detailed descriptions and complexity analyses
- **Responsive Design**: Works across desktop and mobile devices
- **Dark Mode Support**: Automatically switches based on system preferences

<div align="center">

## ☕ [Support my work on Ko-Fi](https://ko-fi.com/thatsinewave)

</div>

## Supported Algorithms

WebSort includes implementations of the following sorting algorithms:

### 1. Bubble Sort
A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. Not suitable for large datasets.
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)

### 2. Insertion Sort
Builds the sorted array one item at a time by repeatedly taking the next unsorted item and inserting it into its correct position. Efficient for small datasets and nearly sorted arrays.
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)

### 3. Selection Sort
Repeatedly finds the minimum element from the unsorted portion of the array and moves it to the beginning of the unsorted portion. Simple but inefficient for large lists.
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)

### 4. Merge Sort
A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves. Efficient and stable.
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)

### 5. Quick Sort
Another divide-and-conquer algorithm that selects a 'pivot' element and partitions the array around it. Highly efficient for large datasets but can degrade to O(n²) in worst cases.
- **Time Complexity**: O(n²) worst case, O(n log n) average
- **Space Complexity**: O(log n)

### 6. Heap Sort
Builds a max heap from the array and then repeatedly extracts the maximum element. Efficient and in-place but not stable.
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(1)

### 7. Shell Sort
An optimization of insertion sort that allows the exchange of items that are far apart. More efficient than insertion sort for larger lists.
- **Time Complexity**: O(n(log n)²) (depends on gap sequence)
- **Space Complexity**: O(1)

### 8. Counting Sort
A non-comparison-based algorithm that works by counting the occurrences of each unique element in the array. Efficient for arrays with a small range of values.
- **Time Complexity**: O(n + k) where k is the range
- **Space Complexity**: O(k)

### 9. Radix Sort
A non-comparative sorting algorithm that sorts integers by processing individual digits. Efficient for integers with a fixed number of digits.
- **Time Complexity**: O(nk) where k is the number of digits
- **Space Complexity**: O(n + k)

### 10. Cocktail Shaker Sort
A variation of bubble sort that sorts in both directions, potentially reducing the number of iterations needed.
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)

### 11. Gnome Sort
Similar to insertion sort but moving elements one at a time and going back if necessary. Simple but inefficient.
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)

### 12. Bogo Sort
A highly inefficient sorting algorithm based on random permutation of the array. Included as an educational example of how not to sort.
- **Time Complexity**: O(n × n!) (unbounded)
- **Space Complexity**: O(1)

### 13. Cycle Sort
An in-place, unstable sorting algorithm that minimizes memory writes. Optimal for minimizing writes but slow for general use.
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)

### 14. Comb Sort
An improvement over bubble sort that uses a shrinking gap sequence. More efficient than bubble sort for random arrays.
- **Time Complexity**: O(n²) worst case, O(n log n) average
- **Space Complexity**: O(1)

### 15. Pancake Sort
A sorting algorithm that sorts by repeatedly flipping the largest unsorted element to the beginning, then flipping it back to its correct position.
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)

### 16. Stooge Sort
A recursive sorting algorithm that divides the array into thirds. Highly inefficient but interesting for educational purposes.
- **Time Complexity**: O(n^(log 3/log 1.5)) ≈ O(n^2.7095)
- **Space Complexity**: O(log n) due to recursion

### 17. Bitonic Sort
A parallel sorting algorithm based on the bitonic sequence concept. Performs well in parallel processing environments.
- **Time Complexity**: O(log² n)
- **Space Complexity**: O(n log² n) in parallel, O(1) in place

### 18. Odd-Even Sort
Also known as Brick Sort, this algorithm is a variation of bubble sort that works by comparing all odd/even indexed pairs of adjacent elements and swapping them if needed. It's simple to implement in parallel architectures.
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)

### 19. Tim Sort
A hybrid stable sorting algorithm derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data. It's the default sorting algorithm in Python, Java, and many other programming languages.
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)

### 20. Pigeonhole Sort
A sorting algorithm suitable for sorting lists of elements where the number of elements and the range of possible key values are approximately the same. It works by creating "pigeonholes" for each possible value and distributing elements into them.
- **Time Complexity**: O(n + range) where range is the range of input values
- **Space Complexity**: O(range)

### 21. Bead Sort
Also known as Gravity Sort, this is a natural sorting algorithm inspired by beads falling under gravity. It's primarily suitable for non-negative integers and works by representing each number as a stack of beads.
- **Time Complexity**: O(n²) in general, O(n) on some hardware
- **Space Complexity**: O(n × max) where max is the maximum element

### 22. Bucket Sort
A distribution sort that works by distributing elements into a number of buckets, then sorting each bucket individually (usually with another algorithm). Efficient when input is uniformly distributed across a range.
- **Time Complexity**: O(n²) worst case, O(n + k) average where k is the number of buckets
- **Space Complexity**: O(n + k)

<div align="center">

## [Join my Discord server](https://discord.gg/2nHHHBWNDw)

</div>

## Getting Started

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ThatSINEWAVE/WebSort.git
   ```

2. Navigate to the project directory:
   ```bash
   cd WebSort
   ```

3. Open `index.html` in your browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server
   ```

4. Access the application at `http://localhost:8000`

### Using the Visualizer

1. Select a sorting algorithm from the dropdown menu
2. Adjust the array size and sorting speed as desired
3. Click "Generate New Array" to create a random data set
4. Click "Sort!" to start the visualization
5. Use the Pause/Resume/Reset buttons to control the process

## Acknowledgements

- Algorithm implementations based on established computer science principles
- Design inspired by modern web development practices

## Contributing

Feel free to submit issues or contribute improvements via pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).
