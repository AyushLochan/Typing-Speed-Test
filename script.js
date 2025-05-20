
const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. Life is what happens when you're busy making other plans.",
    "Computers are incredibly fast, accurate, and stupid. Human beings are incredibly slow, inaccurate, and brilliant. Together they are powerful beyond imagination.",
    "Programming isn't about what you know; it's about what you can figure out. The only way to learn a new programming language is by writing programs in it.",
    "The best error message is the one that never shows up. Good code is its own best documentation. When you have to add a comment, consider rewriting the code instead."
];


const testTextElement = document.getElementById('test-text');
const inputArea = document.getElementById('input-area');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const errorsElement = document.getElementById('errors');
const timerElement = document.getElementById('timer');
const resetBtn = document.getElementById('reset-btn');
const newTextBtn = document.getElementById('new-text-btn');


let startTime = null;
let timerInterval = null;
let errorCount = 0;
let isTestActive = false;
let currentText = testTextElement.textContent.trim();

function startTimer() {
    if (!isTestActive) {
        isTestActive = true;
        startTime = new Date();
        requestAnimationFrame(updateTimerDisplay);
        timerInterval = setInterval(updateTimerDisplay, 100);
    }
}

function updateTimerDisplay() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 1000;
    timerElement.textContent = elapsedTime.toFixed(1);

    updateWPM(elapsedTime);
}

function stopTimer() {
    clearInterval(timerInterval);
    isTestActive = false;
}

function updateWPM(seconds) {
    if (seconds === 0) return;

    const typedValue = inputArea.value.trim();
    const wordsTyped = typedValue.length / 5;
    const minutes = seconds / 60;
    const wpm = Math.round(wordsTyped / minutes);

    wpmElement.textContent = wpm;
}

function updateAccuracy() {
    const typedValue = inputArea.value.trim();
    const targetTextSubstring = currentText.substring(0, typedValue.length);

    let correctChars = 0;
    errorCount = 0;

    for (let i = 0; i < typedValue.length; i++) {
        if (i >= targetTextSubstring.length || typedValue[i] !== targetTextSubstring[i]) {
            errorCount++;
        } else {
            correctChars++;
        }
    }

    const accuracyPct = typedValue.length > 0
        ? Math.round((correctChars / typedValue.length) * 100)
        : 100;

    accuracyElement.textContent = `${accuracyPct}%`;
    errorsElement.textContent = errorCount;
}

inputArea.addEventListener('keydown', function (e) {
    if (!isTestActive && e.key.length === 1) {
        startTimer();
    }
});

inputArea.addEventListener('input', function () {
    updateAccuracy();

    if (inputArea.value.trim() === currentText) {
        stopTimer();
        inputArea.style.borderColor = '#4CAF50';
        inputArea.style.backgroundColor = '#e6ffe6';
    }
});

resetBtn.addEventListener('click', function () {
    stopTimer();
    inputArea.value = '';
    errorCount = 0;
    wpmElement.textContent = '0';
    accuracyElement.textContent = '100%';
    errorsElement.textContent = '0';
    timerElement.textContent = '0';
    inputArea.style.borderColor = '#ddd';
    inputArea.style.backgroundColor = 'white';
    inputArea.focus();
});

newTextBtn.addEventListener('click', function () {
    stopTimer();
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    currentText = sampleTexts[randomIndex];
    testTextElement.textContent = currentText;

    inputArea.value = '';
    errorCount = 0;
    wpmElement.textContent = '0';
    accuracyElement.textContent = '100%';
    errorsElement.textContent = '0';
    timerElement.textContent = '0';
    inputArea.style.borderColor = '#ddd';
    inputArea.style.backgroundColor = 'white';
    inputArea.focus();
});

window.onload = function () {
    inputArea.focus();
};
