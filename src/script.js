// Aidan Carey, April 2025

const currentWordsDOM = document.getElementById("current-words");
const typedWordsDOM = document.getElementById("typed-words");
const typingAreaDOM = document.getElementById("typing-area");

// Choose a random word from the word list
function randomWord() {
  return wordsList[Math.floor(Math.random() * wordsList.length)]
}

// Show correct or incorrect letters below typing area
function updateColor(typed) {
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

  //currentWordDOM.innerHTML = coloredWord;

  return coloredWord;
}

let currentWords = []; // Current words to type
let typedWords = []; // Previously typed words

for (let i = 0; i < 20; i++) {
  currentWords.push(randomWord().toLowerCase());
}

currentWordsDOM.textContent = currentWords.join(" ");

// Current word to type
let currentWordIndex = 0;
let currentWord = currentWords[currentWordIndex];

typingAreaDOM.oninput = () => {
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
    currentWordsDOM.textContent = currentWords.join(" ");
  }
}
