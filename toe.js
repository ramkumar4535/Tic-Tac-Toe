const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

cells.forEach(cell => {
    cell.addEventListener("click", () => handleCellClick(cell));
});

resetButton.addEventListener("click", resetGame);

function handleCellClick(cell) {
    const index = cell.getAttribute("data-index");

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => (cell.textContent = ""));
}
