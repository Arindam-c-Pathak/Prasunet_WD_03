const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkForWinner();
};

const checkForWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerHTML = `${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        message.innerHTML = 'Draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};
const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    message.innerHTML = '';
    cells.forEach(cell => cell.innerHTML = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
