// Aidan Carey, April 2025

const currentWordsDOM = document.getElementById("current-words");
const typedWordsDOM = document.getElementById("typed-words");
const typingAreaDOM = document.getElementById("typing-area");
const resultsDOM = document.getElementById("results");
const restartDOM = document.getElementById("restart");
const timerDOM = document.getElementById("timer");
const wpmDOM = document.getElementById("wpm");

let currentWords = [];    // Current words to type
let typedWords = [];      // Previously typed words
let currentWordIndex;     // Index of the current word in currentWords
let currentWord;          // Current word to type
let timerStarted = false; // If the timer is started
let timerLength = 5;     // Timer length in seconds

// Choose a random word from the word list
function randomWord() {
  return wordsList[Math.floor(Math.random() * wordsList.length)]
}

// Add random words to currentWords
function addWords(num) {
  for (let i = 0; i < num; i++) {
    currentWords.push(randomWord().toLowerCase());
  }
}

// Get length of currentWords exluding blank words
function currentWordsLength() {
  return currentWords.filter(word => word !== "").length;
}

// Show correct or incorrect letters below typing area
function updateColor(typed) {
  if (currentWord === undefined) return;
  
  coloredWord = "";

  let i = 0;

  // Show red or green letters
  for (; i < typed.length && i < currentWord.length; i++) {
    // Green if correct, red otherwise
    let color = (typed[i] == currentWord[i]) ? "green" : "red";
    
    coloredWord += `<span style="color:${color};">` + currentWord[i] + `</span>`;
  }
  // Show remaining letters in gray
  for (; i < currentWord.length; i++) {
    coloredWord += `<span style="color:black;">` + currentWord[i] + `</span>`;
  }

  return highlightWord(coloredWord);
}

// highlight a word using #highlighted
function highlightWord(word) {
  return `<span id="highlighted">` + word + `</span>`;
}

// return the string of currentWords with the first word highlighted
function currentWordsHighlighted() {
  const i = currentWordIndex;
  if (i >= currentWords.length) return "";
  
  let newWords = [...currentWords];
  newWords[i] = highlightWord(newWords[i]);
  return newWords.join(" ");
}

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = String(time % 60).padStart(2, "0");
  
  return `${minutes}:${seconds}`;
}

// Fill list, set current word, etc
function setup() {
  // Fill words list
  addWords(20);

  // Current word to type
  currentWordIndex = 0;
  currentWord = currentWords[currentWordIndex];

  currentWordsDOM.innerHTML = currentWordsHighlighted();
  
  // Show timer length
  timerDOM.textContent = formatTime(timerLength);

  typingAreaDOM.value = "";
}

// Calculate WPM
function calculateWPM() {
  return Math.floor(typedWords.length / (timerLength / 60));
}

// Show/hide results
function toggleResults() {
  const display = resultsDOM.style.display;
  
  if (display === "none") {
    resultsDOM.style.display = "block";
  } else {
    resultsDOM.style.display = "none";
  }
}

// Restart the test
function restart() {
  timerStarted = false;
  typingAreaDOM.disabled = false;

  currentWords = [];
  typedWords = [];

  addWords(20);

  currentWordIndex = 0;
  currentWord = currentWords[currentWordIndex];

  typingAreaDOM.value = "";
  
  toggleResults();

  typedWordsDOM.textContent = typedWords.join(" ");
  currentWordsDOM.innerHTML = currentWordsHighlighted();
}

// Start 30 second timer
function startTimer() {
  let timeLeft = timerLength;
  
  let timer = setInterval(() => {
    // When timer ends return from setInterval
    if (timeLeft === 0) {
      clearInterval(timer);
      endTimer();
      return;
    }
    
    timeLeft--;

    // Pad timeLeft with zeros
    timerDOM.textContent = formatTime(timeLeft);
  }, 1000);
}

// When timer ends, calculate and show WPM
function endTimer() {
  let wpm = calculateWPM();
  wpmDOM.textContent = `WPM: ${wpm}`;

  typingAreaDOM.disabled = true;

  toggleResults();
}

// Whenever a letter is typed
typingAreaDOM.oninput = () => {
  if (timerStarted === false) {
    timerStarted = true;
    startTimer();
  }
  
  // Currently typed word
  let typed = typingAreaDOM.value;

  // Show correct letters
  const coloredWord = updateColor(typed);

  currentWithColored = [...currentWords];
  currentWithColored[currentWordIndex] = coloredWord;
  
  currentWordsDOM.innerHTML = currentWithColored.join(" ");

  // Next word on space
  if (typed === currentWord + " ") {
    typedWords.push(currentWord);
    currentWords[currentWordIndex] = "";

    // Add more words if running out
    if (currentWordsLength() < 10) {
      addWords(10);
    }
    
    // Update current word
    currentWordIndex++;
    currentWord = currentWords[currentWordIndex];

    typingAreaDOM.value = "";

    // Update current words list
    typedWordsDOM.textContent = typedWords.join(" ");
    currentWordsDOM.innerHTML = currentWordsHighlighted();
  }
}

restartDOM.onclick = restart;

// Start app
setup();
