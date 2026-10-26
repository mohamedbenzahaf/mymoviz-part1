const API_URL = 'http://localhost:3000';

const gameIdElement = document.getElementById('gameId');
const newGameButton = document.getElementById('newGame');
const gameBoard = document.getElementById('game-board');
const resultElement = document.getElementById('result');

const MAX_ROWS = 6;

let currentGameId = null;
let secretWord = '';
let currentGuess = '';
let currentRow = 0;
let gameOver = false;
let board = [];

function createBoard(wordLength) {
  gameBoard.innerHTML = '';
  board = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    const rowElement = document.createElement('div');
    rowElement.className = 'letter-row';

    const rowCells = [];

    for (let col = 0; col < wordLength; col++) {
      const cell = document.createElement('div');
      cell.className = 'letter-box';
      rowElement.appendChild(cell);
      rowCells.push(cell);
    }

    gameBoard.appendChild(rowElement);
    board.push(rowCells);
  }
}

async function startNewGame() {
  newGameButton.disabled = true;
  resultElement.textContent = '';

  try {
    const response = await fetch(`${API_URL}/games/new`);
    const data = await response.json();

    if (!response.ok || !data.result) {
      throw new Error(data.error || 'Unable to start a new game');
    }

    currentGameId = data.gameId;
    secretWord = data.word.toUpperCase();
    currentGuess = '';
    currentRow = 0;
    gameOver = false;

    gameIdElement.textContent = currentGameId;
    createBoard(data.wordLength);
  } catch (error) {
    resultElement.textContent = 'Unable to start a new game.';
    console.error(error);
  } finally {
    newGameButton.disabled = false;
  }
}

function updateCurrentRow() {
  if (currentRow >= MAX_ROWS) return;

  for (let col = 0; col < board[currentRow].length; col++) {
    const cell = board[currentRow][col];
    cell.textContent = currentGuess[col] || '';
    cell.classList.toggle('filled-box', Boolean(currentGuess[col]));
  }
}

function checkGuess() {
  const guess = currentGuess.toUpperCase();
  const target = secretWord.toUpperCase();

  const feedback = Array(target.length).fill('gray');
  const remaining = target.split('');

  // Première passe : lettres bien placées.
  for (let i = 0; i < target.length; i++) {
    if (guess[i] === target[i]) {
      feedback[i] = 'green';
      remaining[i] = null;
    }
  }

  // Deuxième passe : lettres présentes mais mal placées.
  for (let i = 0; i < target.length; i++) {
    if (feedback[i] === 'green') continue;

    const index = remaining.indexOf(guess[i]);

    if (index !== -1) {
      feedback[i] = 'yellow';
      remaining[index] = null;
    }
  }

  for (let i = 0; i < feedback.length; i++) {
    board[currentRow][i].classList.add(feedback[i]);
  }

  if (guess === target) {
    resultElement.textContent = 'YOU WON!';
    gameOver = true;
    return;
  }

  if (currentRow === MAX_ROWS - 1) {
    resultElement.textContent = 'GAME OVER';
    gameOver = true;
    return;
  }

  currentRow++;
  currentGuess = '';
  resultElement.textContent = '';
}

document.addEventListener('keyup', (event) => {
  if (gameOver || !currentGameId) return;

  if (event.key === 'Enter') {
    if (currentGuess.length !== secretWord.length) {
      resultElement.textContent = 'Not enough letters !';
      return;
    }

    checkGuess();
    return;
  }

  if (event.key === 'Backspace') {
    currentGuess = currentGuess.slice(0, -1);
    updateCurrentRow();
    return;
  }

  if (/^[a-zA-Z]$/.test(event.key) &&
      currentGuess.length < secretWord.length) {
    currentGuess += event.key.toUpperCase();
    updateCurrentRow();
  }
});

newGameButton.addEventListener('click', startNewGame);

createBoard(5);
startNewGame();
