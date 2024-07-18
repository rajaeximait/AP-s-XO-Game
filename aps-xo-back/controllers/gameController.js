// set initial grid values
let gameState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let currentPlayer = "X";

// reset the current grid values
function resetGame() {
    gameState = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    currentPlayer = "X";
}

// to check the win condition
function checkWinner(board) {
    const winConditions = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[2, 0], [1, 1], [0, 2]]
    ];
    return winConditions.some(condition =>
        condition.every(([row, col]) => board[row][col] === currentPlayer)
    );
}

// to check game draw
function checkDraw(board) {
    return board.flat().every(cell => cell !== "");
}

const startGame = (req, res) => {
    resetGame();
    res.json({ gameState, currentPlayer });
};

// check each click game win,draw or not
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
