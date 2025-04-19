// Aidan Carey, April 2025

const currentWordsDOM = document.getElementById("current-words");
const typedWordsDOM = document.getElementById("typed-words");
const typingAreaDOM = document.getElementById("typing-area");
const timerDOM = document.getElementById("timer");
const wpmDOM = document.getElementById("wpm");

let currentWords = [];    // Current words to type
let typedWords = [];      // Previously typed words
let currentWordIndex;     // Index of the current word in currentWords
let currentWord;          // Current word to type
let timerStarted = false; // If the timer is started
let timerLength = 15;     // Timer length in seconds

// Choose a random word from the word list
function randomWord() {
  return wordsList[Math.floor(Math.random() * wordsList.length)]
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

// Fill list, set current word, etc
function setup() {
  // Fill words list
  for (let i = 0; i < 30; i++) {
    currentWords.push(randomWord().toLowerCase());
  }

  // Current word to type
  currentWordIndex = 0;
  currentWord = currentWords[currentWordIndex];

  currentWordsDOM.innerHTML = currentWordsHighlighted();

  // Show timer length
  // TODO: minutes don't work, 1:30 shows as 0:90
  timerDOM.textContent = `0:${timerLength}`;
}

// Calculate WPM
function calculateWPM() {
  return typedWords.length / (timerLength / 60);
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
    timeString = String(timeLeft).padStart(2, "0");

    timerDOM.textContent = `0:${timeString}`;
  }, 1000);
}

// When timer ends, calculate and show WPM
function endTimer() {
  let wpm = calculateWPM();
  wpmDOM.textContent = `WPM: ${wpm}`;
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
    
    // Update current word
    currentWordIndex++;
    currentWord = currentWords[currentWordIndex];

    typingAreaDOM.value = "";

    // Update current words list
    typedWordsDOM.textContent = typedWords.join(" ");
    currentWordsDOM.innerHTML = currentWordsHighlighted();
  }
}

// Start app
setup();
