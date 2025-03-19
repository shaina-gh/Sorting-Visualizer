// Main control script for WebSort
import {
    loadAlgorithms
} from './algorithmLoader.js';

class SortingVisualizer {
    constructor() {
        // DOM elements
        this.algorithmSelect = document.getElementById('algorithm');
        this.arraySizeInput = document.getElementById('array-size');
        this.sizeValueSpan = document.getElementById('size-value');
        this.sortSpeedInput = document.getElementById('sort-speed');
        this.speedValueSpan = document.getElementById('speed-value');
        this.generateButton = document.getElementById('generate');
        this.sortButton = document.getElementById('sort');
        this.pauseButton = document.getElementById('pause');
        this.resumeButton = document.getElementById('resume');
        this.resetButton = document.getElementById('reset');
        this.muteButton = document.getElementById('mute');
        this.arrayContainer = document.getElementById('array-container');
        this.algorithmDescription = document.getElementById('algorithm-description');
        this.timeComplexity = document.getElementById('time-complexity');
        this.spaceComplexity = document.getElementById('space-complexity');
        this.comparisonsSpan = document.getElementById('comparisons');
        this.swapsSpan = document.getElementById('swaps');
        this.timeElapsedSpan = document.getElementById('time-elapsed');

        // State variables
        this.array = [];
        this.algorithms = {};
        this.currentAlgorithm = null;

        // Set default array size in JavaScript
        this.arraySize = 100; // Default array size
        this.arraySizeInput.value = this.arraySize; // Update the input element
        this.sizeValueSpan.textContent = this.arraySize; // Update the displayed value

        this.sortSpeed = parseInt(this.sortSpeedInput.value);
        this.isSorting = false;
        this.isPaused = false;
        this.animationFrameId = null;
        this.sortGenerator = null;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timeInterval = null;
        this.isMuted = false; // Sound control

        // Audio context for beep sound
        this.audioContext = new(window.AudioContext || window.webkitAudioContext)();
        this.beepFrequency = 440; // Initial frequency (A4 note)
        this.beepDuration = 0.1; // Duration of the beep in seconds

        // Track the last swap time for dynamic pitch adjustment
        this.lastSwapTime = 0;

        // Initialize
        this.init();
    }

    async init() {
        // Load algorithms
        this.algorithms = await loadAlgorithms();
        this.setupAlgorithmSelect();
        this.setupEventListeners();
        this.generateNewArray();
    }

    setupAlgorithmSelect() {
        // Populate algorithm select dropdown
        this.algorithmSelect.innerHTML = '';
        Object.keys(this.algorithms).forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            this.algorithmSelect.appendChild(option);
        });
        this.updateAlgorithmInfo();
    }

    setupEventListeners() {
        this.algorithmSelect.addEventListener('change', () => this.updateAlgorithmInfo());

        this.arraySizeInput.addEventListener('input', () => {
            this.arraySize = parseInt(this.arraySizeInput.value);
            this.sizeValueSpan.textContent = this.arraySize;
            this.generateNewArray();
        });

        this.sortSpeedInput.addEventListener('input', () => {
            this.sortSpeed = parseInt(this.sortSpeedInput.value);
            this.speedValueSpan.textContent = this.sortSpeed;
        });

        this.generateButton.addEventListener('click', () => this.generateNewArray());
        this.sortButton.addEventListener('click', () => this.startSorting());
        this.pauseButton.addEventListener('click', () => this.pauseSorting());
        this.resumeButton.addEventListener('click', () => this.resumeSorting());
        this.resetButton.addEventListener('click', () => this.resetSorting());
        this.muteButton.addEventListener('click', () => this.toggleMute());
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.muteButton.textContent = this.isMuted ? 'Unmute Sound' : 'Mute Sound';
    }

    playBeep() {
        if (this.isMuted) return;

        const currentTime = Date.now();
        const timeSinceLastSwap = currentTime - this.lastSwapTime;

        // Adjust frequency based on time since last swap
        // Faster swaps (smaller timeSinceLastSwap) result in higher pitch
        const minFrequency = 700;
        const maxFrequency = 1400;
        const frequency = Math.max(minFrequency, Math.min(maxFrequency, 1000 / (timeSinceLastSwap + 1)));

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + this.beepDuration);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + this.beepDuration);
    }

    updateAlgorithmInfo() {
        const algorithmName = this.algorithmSelect.value;
        const algorithm = this.algorithms[algorithmName];

        this.algorithmDescription.textContent = algorithm.description;
        this.timeComplexity.textContent = algorithm.timeComplexity;
        this.spaceComplexity.textContent = algorithm.spaceComplexity;

        this.currentAlgorithm = algorithm;
    }

    generateNewArray() {
        // Reset state
        this.resetSorting();

        // Generate random array
        this.array = Array(this.arraySize).fill(0).map(() => Math.floor(Math.random() * 100) + 1);
        this.renderArray();
    }

    renderArray(selectedIndices = [], sortedIndices = []) {
        this.arrayContainer.innerHTML = '';

        const maxValue = Math.max(...this.array);
        const containerWidth = this.arrayContainer.clientWidth;
        const barWidth = Math.max(1, containerWidth / this.arraySize); // Adjust bar width dynamically

        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxValue) * 100}%`;
            bar.style.width = `${barWidth}px`;

            if (selectedIndices.includes(index)) {
                bar.classList.add('selected');
            }

            if (sortedIndices.includes(index)) {
                bar.classList.add('sorted');
            }

            this.arrayContainer.appendChild(bar);
        });
    }

    startSorting() {
        if (this.isSorting) return;

        this.isSorting = true;
        this.isPaused = false;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = Date.now();

        // Update button states
        this.sortButton.disabled = true;
        this.generateButton.disabled = true;
        this.pauseButton.disabled = false;
        this.resumeButton.disabled = true;

        // Clone array to avoid modifying the original during visualization
        const arrayCopy = [...this.array];

        // Get the sort generator from the current algorithm
        this.sortGenerator = this.currentAlgorithm.sort(arrayCopy);

        // Start timer
        this.startTimer();

        // Start animation
        this.animate();
    }

    pauseSorting() {
        if (!this.isSorting || this.isPaused) return;

        this.isPaused = true;
        this.pauseButton.disabled = true;
        this.resumeButton.disabled = false;

        // Pause timer
        clearInterval(this.timeInterval);
        this.elapsedTime += (Date.now() - this.startTime);
    }

    resumeSorting() {
        if (!this.isSorting || !this.isPaused) return;

        this.isPaused = false;
        this.pauseButton.disabled = false;
        this.resumeButton.disabled = true;

        // Resume timer
        this.startTime = Date.now();
        this.startTimer();

        // Resume animation
        this.animate();
    }

    resetSorting() {
        // Stop animations
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        // Clear timer
        clearInterval(this.timeInterval);

        // Reset state
        this.isSorting = false;
        this.isPaused = false;
        this.comparisons = 0;
        this.swaps = 0;
        this.elapsedTime = 0;
        this.startTime = 0;

        // Update UI
        this.comparisonsSpan.textContent = '0';
        this.swapsSpan.textContent = '0';
        this.timeElapsedSpan.textContent = '0.00s';

        // Reset buttons
        this.sortButton.disabled = false;
        this.generateButton.disabled = false;
        this.pauseButton.disabled = true;
        this.resumeButton.disabled = true;

        // Render the array without highlights
        this.renderArray();
    }

    startTimer() {
        this.timeInterval = setInterval(() => {
            const currentTime = Date.now();
            const totalElapsed = this.elapsedTime + (currentTime - this.startTime);
            this.timeElapsedSpan.textContent = (totalElapsed / 1000).toFixed(2) + 's';
        }, 10);
    }

    animate() {
        if (!this.isSorting || this.isPaused) return;

        const delay = Math.max(1, 1000 - this.sortSpeed);

        setTimeout(() => {
            const result = this.sortGenerator.next();

            if (!result.done) {
                const {
                    array,
                    selected,
                    sorted,
                    comparisons,
                    swaps
                } = result.value;

                // Play a beep if elements were swapped or moved
                if (swaps > this.swaps) {
                    this.playBeep();
                    this.lastSwapTime = Date.now(); // Update last swap time
                }

                this.array = array;
                this.comparisons = comparisons;
                this.swaps = swaps;

                this.renderArray(selected, sorted);
                this.comparisonsSpan.textContent = this.comparisons;
                this.swapsSpan.textContent = this.swaps;

                this.animationFrameId = requestAnimationFrame(() => this.animate());
            } else {
                this.finishSorting(result.value?.sorted || []);
            }
        }, delay);
    }

    finishSorting(sortedIndices) {
        // Render final state with all bars marked as sorted
        this.renderArray([], sortedIndices || Array(this.arraySize).fill(0).map((_, i) => i));

        // Stop timer
        clearInterval(this.timeInterval);

        // Update state
        this.isSorting = false;
        this.isPaused = false;

        // Reset buttons
        this.sortButton.disabled = false;
        this.generateButton.disabled = false;
        this.pauseButton.disabled = true;
        this.resumeButton.disabled = true;
    }
}

// Initialize app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SortingVisualizer();
});