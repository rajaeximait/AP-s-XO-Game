let gameState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let currentPlayer = "X";

function resetGame() {
    gameState = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    currentPlayer = "X";
}

function checkWinner(board) {
    const winConditions = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[2][0], board[1][1], board[0][2]]
    ];
    return winConditions.some(condition =>
        condition.every(cell => cell === currentPlayer)
    );
}

function checkDraw(board) {
    return board.flat().every(cell => cell !== "");
}

const startGame = (req, res) => {
    resetGame();
    res.json({ gameState, currentPlayer });
};

const makeMove = (req, res) => {
    const { row, col } = req.body;
    if (gameState[row][col] === "") {
        gameState[row][col] = currentPlayer;
        if (checkWinner(gameState)) {
            res.json({ winner: currentPlayer, gameState });
            resetGame();
        } else if (checkDraw(gameState)) {
            res.json({ draw: true, gameState });
            resetGame();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            res.json({ gameState, currentPlayer });
        }
    } else {
        res.status(400).json({ error: "Cell already taken" });
    }
};

module.exports = { startGame, makeMove };
