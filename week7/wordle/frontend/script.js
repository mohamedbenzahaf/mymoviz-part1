const API_URL = 'http://localhost:3000';

const gameIdElement = document.getElementById('gameId');
const newGameButton = document.getElementById('newGame');
const gameBoard = document.getElementById('game-board');
const resultElement = document.getElementById('result');

let currentGameId = null;
let currentGuess = '';
let currentRow = 0;
let gameOver = false;

const MAX_ROWS = 6;
const WORD_LENGTH = 5;
let board = [];

// Créer les 30 cases de la grille
function createBoard() {
  gameBoard.innerHTML = '';
  board = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    const rowCells = [];

    for (let col = 0; col < WORD_LENGTH; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      gameBoard.appendChild(cell);
      rowCells.push(cell);
    }

    board.push(rowCells);
  }
}

// Démarrer une nouvelle partie
async function startNewGame() {
  try {
    newGameButton.disabled = true;
    resultElement.textContent = 'Chargement de la partie...';

    const response = await fetch(`${API_URL}/game/new`);
    const data = await response.json();

    if (!response.ok || !data.result) {
      throw new Error(data.error || 'Impossible de créer une partie');
    }

    currentGameId = data.gameId;
    gameIdElement.textContent = currentGameId;

    currentGuess = '';
    currentRow = 0;
    gameOver = false;

    createBoard();
    resultElement.textContent = 'Tape un mot de 5 lettres.';
  } catch (error) {
    resultElement.textContent =
      'Erreur : ' + error.message +
      '. Vérifie que le backend fonctionne sur le port 3000.';
  } finally {
    newGameButton.disabled = false;
  }
}

// Afficher les lettres saisies dans la ligne actuelle
function updateCurrentRow() {
  for (let col = 0; col < WORD_LENGTH; col++) {
    board[currentRow][col].textContent = currentGuess[col] || '';
  }
}

// Envoyer une proposition au backend
async function submitGuess() {
  if (gameOver || !currentGameId || currentGuess.length !== WORD_LENGTH) {
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
      resultElement.textContent = data.error || 'Erreur lors de la vérification.';
      return;
    }

    for (let col = 0; col < WORD_LENGTH; col++) {
      const cell = board[currentRow][col];
      cell.classList.add(data.feedback[col]);
    }

    if (data.won) {
      resultElement.textContent = 'Bravo ! Tu as trouvé le mot ! 🎉';
      gameOver = true;
    } else if (currentRow === MAX_ROWS - 1) {
      resultElement.textContent = 'Partie terminée ! Clique sur NEW GAME pour rejouer.';
      gameOver = true;
    } else {
      resultElement.textContent = 'Essaie encore !';
    }

    currentRow++;
    currentGuess = '';
  } catch (error) {
    resultElement.textContent =
      'Impossible de contacter le serveur. Vérifie que le backend fonctionne.';
  }
}

// Saisir un mot avec le clavier
document.addEventListener('keydown', (event) => {
  if (gameOver || !currentGameId) return;

  if (event.key === 'Enter') {
    submitGuess();
  } else if (event.key === 'Backspace') {
    if (currentGuess.length > 0) {
      currentGuess = currentGuess.slice(0, -1);
      updateCurrentRow();
    }
  } else if (/^[a-zA-Z]$/.test(event.key) &&
             currentGuess.length < WORD_LENGTH) {
    currentGuess += event.key.toUpperCase();
    updateCurrentRow();
  }
});

// Bouton pour démarrer une partie
newGameButton.addEventListener('click', startNewGame);

// Construire la grille et lancer automatiquement la première partie
createBoard();
startNewGame();
