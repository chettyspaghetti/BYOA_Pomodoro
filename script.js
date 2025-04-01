let timeLeft;
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorkTime = true;
let timerId = null;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleButton = document.getElementById('toggleMode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the document title
    document.title = `(${timeString}) ${isWorkTime ? 'Work' : 'Break'} - Pomodoro Timer`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTime : breakTime;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    
    // Update button classes
    if (isWorkTime) {
        toggleButton.classList.remove('break-mode');
        toggleButton.classList.add('work-mode');
    } else {
        toggleButton.classList.remove('work-mode');
        toggleButton.classList.add('break-mode');
    }
    
    updateDisplay();
    
    if (timerId !== null) {
        pauseTimer();
    }
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = workTime;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                alert(isWorkTime ? 'Time for a break!' : 'Back to work!');
                switchMode();
            }
        }, 1000);
        startButton.disabled = true;
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
}

function resetTimer() {
    pauseTimer();
    isWorkTime = true;
    timeLeft = workTime;
    modeText.textContent = 'Work Time';
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', switchMode);

// Initialize the display
resetTimer();
toggleButton.textContent = 'Switch to Break'; // Set initial button text 