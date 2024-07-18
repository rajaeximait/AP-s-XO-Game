const express = require('express');
const { startGame, makeMove } = require('../controllers/gameController');

const router = express.Router();

router.get('/start', startGame);
router.post('/move', makeMove);

module.exports = router;
