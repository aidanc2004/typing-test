// Aidan Carey, April 2025

const currentWordsDOM = document.getElementById("current-words");

// Choose a random word from the word list
function randomWord() {
  return wordsList[Math.floor(Math.random() * wordsList.length)]
}

// Current words left to type
currentWords = [];

// Fill the current words list
for (let i = 0; i < 20; i++) {
  currentWords.push(randomWord());
}

currentWordsDOM.textContent = currentWords;
