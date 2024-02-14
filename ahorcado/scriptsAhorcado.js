// Variables
let wordToGuess = "";
let hiddenWord = "";
let guessedLetters = [];
let incorrectLetters = [];

// Elements
const message = document.getElementById('message');
const wordElement = document.getElementById('word');
const guessedLettersElement = document.getElementById('guessed-letters');
const incorrectLettersElement = document.getElementById('incorrect-letters');
const wordInputElement = document.getElementById('word-input');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-btn');
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
guessButton.addEventListener('click', processGuess);
menuIcon.addEventListener('click', toggleMenu);

// Functions
function startGame() {
    wordToGuess = wordInputElement.value.trim().toLowerCase();
    if (!wordToGuess.match(/^[a-z]+$/)) {
        message.innerText = 'Ingresa una palabra válida.';
        return;
    }
    hiddenWord = '_'.repeat(wordToGuess.length);
    guessedLetters = [];
    incorrectLetters = [];
    wordInputElement.value = ''; // Limpiar el campo de entrada
    updateDisplay();
}

function restartGame() {
    wordInputElement.value = '';
    startGame();
}

function processGuess() {
    const guessedLetter = letterInput.value.trim().toLowerCase();
    if (!guessedLetter.match(/^[a-z]$/)) {
        message.innerText = 'Ingresa una letra válida.';
        return;
    }
    if (guessedLetters.includes(guessedLetter) || incorrectLetters.includes(guessedLetter)) {
        message.innerText = 'Ya has intentado esa letra. Intenta con otra.';
        return;
    }
    if (wordToGuess.includes(guessedLetter)) {
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === guessedLetter) {
                hiddenWord = replaceChar(hiddenWord, i, guessedLetter);
            }
        }
        if (!hiddenWord.includes('_')) {
            showSuccessMessage(); // Mostrar mensaje de éxito
        }
    } else {
        incorrectLetters.push(guessedLetter);
        if (incorrectLetters.length === 6) {
            message.innerText = '¡Oh no! Has agotado tus intentos. La palabra correcta era: ' + wordToGuess.toUpperCase();
            restartGame();
            return;
        }
    }
    guessedLetters.push(guessedLetter);
    updateDisplay();
    letterInput.value = '';
}

function showSuccessMessage() {
    message.innerText = '¡Felicidades! Has adivinado la palabra correctamente.';
}

function updateDisplay() {
    message.innerText = '';
    wordElement.innerText = hiddenWord.split('').join(' ');
    guessedLettersElement.innerText = `Letras Adivinadas: ${guessedLetters.join(', ')}`;
    incorrectLettersElement.innerText = `Letras Incorrectas: ${incorrectLetters.join(', ')}`;
    if (hiddenWord === wordToGuess) {
        showSuccessMessage(); // Mostrar mensaje de éxito si se adivinó la palabra
    }
}

function toggleMenu() {
    navMenu.classList.toggle('show');
}

function replaceChar(str, index, char) {
    return str.substring(0, index) + char + str.substring(index + 1);
}