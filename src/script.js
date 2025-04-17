// Aidan Carey, April 2025

const currentWordsDOM = document.getElementById("current-words");
const typedWordsDOM = document.getElementById("typed-words");
const currentWordDOM = document.getElementById("current-word");
const typingAreaDOM = document.getElementById("typing-area");

// Choose a random word from the word list
function randomWord() {
  return wordsList[Math.floor(Math.random() * wordsList.length)]
}

let currentWords = []; // Current words to type
let typedWords = []; // Previously typed words

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
    typedWords.push(currentWord);
    currentWords[currentWordIndex] = "";
    
    // Update current word    
    currentWordIndex++;
    currentWord = currentWords[currentWordIndex];

    currentWordDOM.textContent = currentWord;

    typingAreaDOM.value = "";

    // Update current words list
    typedWordsDOM.textContent = typedWords.join(" ");
    currentWordsDOM.textContent = currentWords.join(" ");
  }
}
