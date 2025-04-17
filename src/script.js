// Aidan Carey, April 2025

const currentWordsDOM = document.getElementById("current-words");
const currentWordDOM = document.getElementById("current-word");
const typingAreaDOM = document.getElementById("typing-area");

// Choose a random word from the word list
function randomWord() {
  return wordsList[Math.floor(Math.random() * wordsList.length)]
}

// Current words to type
let currentWords = [];
for (let i = 0; i < 20; i++) {
  currentWords.push(randomWord());
}

currentWordsDOM.textContent = currentWords.join(" ");

// Current word to type
let currentWordIndex = 0;
let currentWord = currentWords[currentWordIndex];

currentWordDOM.textContent = currentWord;

typingAreaDOM.oninput = () => {
  // Currently typed word
  let typed = typingAreaDOM.value;

  // Next word on space
  if (typed === currentWord + " ") {
    // Update current word
    currentWordIndex++;
    currentWord = currentWords[currentWordIndex];

    currentWordDOM.textContent = currentWord;

    // Clear typing area
    typingAreaDOM.value = "";    
  }
}
