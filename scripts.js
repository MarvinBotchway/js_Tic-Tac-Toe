const createGameboard = (function () {
    let gameBoard = [];
   
    function createBoard () {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cellDetails = {
                    coordinateX : i,
                    coordinateY : j,
                    played : "X"
                };

                gameBoard.push(cellDetails);
            }
        }
    }

    function getBoard () {
        if (gameBoard.length === 0)createBoard();
        return gameBoard
    };
   
    
    return {getBoard}
})();

const displayController = (function () {
    const gameBoard = createGameboard.getBoard();
    
    return {gameBoard};
})();

const updateDisplay = (function () {
    const gameBoard = displayController.gameBoard;
    
    function createBoard() {
        const boardContainer = document.querySelector("#board-container");
        const board = document.createElement("div");
        board.classList += "board";
 
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.dataset.position = `${gameBoard[i].coordinateX},${gameBoard[i].coordinateY}`;
            cell.dataset.played = "";
            cell.classList += "cell"
            
            cell.addEventListener("click", play);
            board.appendChild(cell);
        }
        boardContainer.appendChild(board);
    } 

    function play(e) {
        console.log(e.target);
        let currentPlayer = createGame.getCurrentPlayer();
        e.target.dataset.played = currentPlayer.symbol;
        e.target.textContent = currentPlayer.symbol;

    }


    return {createBoard};
})();


const createPlayers = (function () {
    const player1 = {symbol : "X"};
    const player2 = {symbol : "o"};
    return {player1, player2};
})();


const createGame = (function () {

    const gameBoard = updateDisplay.createBoard();
    const player1 = createPlayers.player1;
    const player2 = createPlayers.player2;
    let currentPlayer = player2;

    function switchCurrentPlayer() {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }
    function getCurrentPlayer() {
        switchCurrentPlayer();
        return currentPlayer
    };

    return {gameBoard, player1, player2, getCurrentPlayer};
})();


