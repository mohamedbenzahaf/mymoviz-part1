const express = require('express');
const router = express.Router();
const Game = require('../models/games');

const words = [
  'APPLE',
  'GRAPE',
  'BRAIN',
  'HOUSE',
  'PLANT',
  'TRAIN',
  'MOUSE',
  'WATER',
  'LIGHT',
  'SMILE'
];

router.get('/new', async (req, res) => {
  try {
    const word = words[Math.floor(Math.random() * words.length)];

    const game = await Game.create({ word });
res.json({
  result: true,
  gameId: game._id,
  wordLength: word.length,
  word: word
});
  } catch (error) {
    console.error('Erreur création partie :', error);
    res.status(500).json({
      result: false,
      error: 'Impossible de créer une partie'
    });
  }
});

router.post('/guess', async (req, res) => {
  try {
    const { gameId, guess } = req.body;

    if (!gameId || typeof guess !== 'string') {
      return res.status(400).json({
        result: false,
        error: 'gameId et guess sont obligatoires'
      });
    }

    const normalizedGuess = guess.trim().toUpperCase();

    if (!/^[A-Z]{5}$/.test(normalizedGuess)) {
      return res.status(400).json({
        result: false,
        error: 'Le mot doit contenir exactement 5 lettres'
      });
    }

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        result: false,
        error: 'Partie introuvable'
      });
    }

    const secret = game.word;
    const result = Array(5).fill('gray');
    const remaining = secret.split('');

    // Première passe : lettres bien placées
    for (let i = 0; i < 5; i++) {
      if (normalizedGuess[i] === secret[i]) {
        result[i] = 'green';
        remaining[i] = null;
      }
    }

    // Deuxième passe : lettres présentes mais mal placées
    for (let i = 0; i < 5; i++) {
      if (result[i] === 'green') continue;

      const index = remaining.indexOf(normalizedGuess[i]);

      if (index !== -1) {
        result[i] = 'yellow';
        remaining[index] = null;
      }
    }

    res.json({
      result: true,
      guess: normalizedGuess,
      feedback: result,
      won: normalizedGuess === secret
    });
  } catch (error) {
    console.error('Erreur lors de la proposition :', error);
    res.status(500).json({
      result: false,
      error: 'Impossible de vérifier le mot'
    });
  }
});

module.exports = router;

