const API_URL = 'http://localhost:3000';

const gameIdElement = document.getElementById('gameId');
const newGameButton = document.getElementById('newGame');
const gameBoard = document.getElementById('game-board');
const resultElement = document.getElementById('result');

const MAX_ROWS = 6;
const WORD_LENGTH = 5;

let currentGameId = null;
let secretWord = '';
let currentGuess = '';
let currentRow = 0;
let gameOver = false;
let board = [];

function createBoard() {
  gameBoard.innerHTML = '';
  board = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    const rowElement = document.createElement('div');
    rowElement.className = 'letter-row';

    const rowCells = [];

    for (let col = 0; col < WORD_LENGTH; col++) {
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
  resultElement.textContent = 'Loading...';

  try {
    const response = await fetch(`${API_URL}/game/new`);
    const data = await response.json();

    if (!response.ok || !data.result) {
      throw new Error(data.error || 'Unable to start a new game');
    }

    currentGameId = data.gameId;
    secretWord = data.word ? data.word.toUpperCase() : '';
    gameIdElement.textContent = currentGameId;

    currentGuess = '';
    currentRow = 0;
    gameOver = false;

    createBoard();
    resultElement.textContent = '';
  } catch (error) {
    resultElement.textContent =
      'Unable to start game. Check that the backend is running.';
    console.error(error);
  } finally {
    newGameButton.disabled = false;
  }
}

function updateCurrentRow() {
  if (currentRow >= MAX_ROWS) return;

  for (let col = 0; col < WORD_LENGTH; col++) {
    const cell = board[currentRow][col];

    cell.textContent = currentGuess[col] || '';
    cell.classList.toggle('filled-box', Boolean(currentGuess[col]));
  }
}

async function submitGuess() {
  if (gameOver || !currentGameId) return;

  if (currentGuess.length !== WORD_LENGTH) {
    resultElement.textContent = 'Not enough letters !';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/game/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gameId: currentGameId,
        guess: currentGuess
      })
    });

    const data = await response.json();

    if (!response.ok || !data.result) {
      resultElement.textContent = data.error || 'Unable to check word.';
      return;
    }

    for (let col = 0; col < WORD_LENGTH; col++) {
      board[currentRow][col].classList.add(data.feedback[col]);
    }

    if (data.won) {
      resultElement.textContent = 'YOU WON!';
      gameOver = true;
    } else if (currentRow === MAX_ROWS - 1) {
      resultElement.textContent = 'GAME OVER';
      gameOver = true;
    } else {
      resultElement.textContent = '';
      currentRow++;
      currentGuess = '';
    }
  } catch (error) {
    resultElement.textContent = 'Unable to contact the server.';
    console.error(error);
  }
}

document.addEventListener('keyup', (event) => {
  if (gameOver || !currentGameId) return;

  if (event.key === 'Enter') {
    submitGuess();
    return;
  }

  if (event.key === 'Backspace') {
    currentGuess = currentGuess.slice(0, -1);
    updateCurrentRow();
    return;
  }

  if (/^[a-zA-Z]$/.test(event.key) &&
      currentGuess.length < WORD_LENGTH) {
    currentGuess += event.key.toUpperCase();
    updateCurrentRow();
  }
});

newGameButton.addEventListener('click', startNewGame);

createBoard();
startNewGame();

