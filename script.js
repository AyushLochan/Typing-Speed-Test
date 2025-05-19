const sentences = [
  "Typing is a useful skill for everyone.",
  "Practice daily to improve your typing speed.",
  "JavaScript can make your web pages interactive.",
  "Coding challenges help build your problem-solving skills."
];

let sentence = "";
let startTime;
let interval;
let totalErrors = 0;

const sentenceDisplay = document.getElementById("sentence");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const errorsDisplay = document.getElementById("errors");

function startTest() {
  sentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceDisplay.textContent = sentence;
  input.value = "";
  input.disabled = false;
  input.focus();
  startTime = new Date();
  totalErrors = 0;

  interval = setInterval(updateTime, 1000);
}

function updateTime() {
  const currentTime = Math.floor((new Date() - startTime) / 1000);
  timeDisplay.textContent = currentTime;
  calculateResults();
}

function calculateResults() {
  const typedText = input.value;
  const timeElapsed = (new Date() - startTime) / 60000; // in minutes
  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / timeElapsed);

  let correctChars = 0;
  let errors = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === sentence[i]) {
      correctChars++;
    } else {
      errors++;
    }
  }

  const accuracy = ((correctChars / sentence.length) * 100).toFixed(1);

  totalErrors = errors;

  wpmDisplay.textContent = isFinite(wpm) ? wpm : 0;
  accuracyDisplay.textContent = `${accuracy}%`;
  errorsDisplay.textContent = totalErrors;
}

input.addEventListener("input", () => {
  calculateResults();
  if (input.value === sentence) {
    clearInterval(interval);
    input.disabled = true;
  }
});

function restartTest() {
  clearInterval(interval);
  timeDisplay.textContent = "0";
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "0%";
  errorsDisplay.textContent = "0";
  startTest();
}

window.onload = startTest;
