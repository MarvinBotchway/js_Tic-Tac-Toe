const displayController = (function () {
    function getGameBoard() { return createGameboard.getGameBoard(); }
    
    function updateGameBoard (x, y, played) { createGameboard.updateGameBoard(x, y, played); }
       
    function removeGameBoard() { createGameboard.removeGameBoard(); }

    function checkForWin(gameBoard) { checkForWinner.checkForWin(gameBoard); }

    function getWinner() { return checkForWinner.getWinner(); }

    function resetWinner() { checkForWinner.resetWinner(); }

    function createBoardUI() { updateDisplay.createBoard();}

    return {
        getGameBoard,
        updateGameBoard,
        removeGameBoard,
        checkForWin,
        getWinner,
        resetWinner,
        createBoardUI
    };
})();


const createGameboard = (function () {
    let gameBoard = [];
   
    function createBoard () {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cellDetails = {
                    coordinateX : i,
                    coordinateY : j,
                    played : ""
                };

                gameBoard.push(cellDetails);
            }
        }
    }

    function getGameBoard () {
        if (gameBoard.length === 0)createBoard();
        return gameBoard;
    }
    
    function updateGameBoard (x, y, played) {
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i].coordinateX == x &&
            gameBoard[i].coordinateY == y) {
                gameBoard[i].played = played;
            }
        }
    }

    function removeGameBoard() {
        gameBoard = [];
    }
   
    
    return {removeGameBoard, getGameBoard, updateGameBoard};
})();


const updateDisplay = (function () {
    const boardContainer = document.querySelector("#board-container");
    const winnerTxt = document.querySelector("#winner-txt");
    const resetBtn = document.createElement("button");
    
    function createBoard() {
        let gameBoard = displayController.getGameBoard();
        const board = document.createElement("div");
        board.classList += "board";
 
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.dataset.position = `${gameBoard[i].coordinateX},${gameBoard[i].coordinateY}`;
            cell.dataset.played = "";
            cell.classList += "cell"
            
            cell.addEventListener("click", updateBoard);
            board.appendChild(cell);
        }
        boardContainer.appendChild(board);
    } 

    function updateBoard(e){
        if (e.target.dataset.played != "") return;
        
        const actionSection = document.querySelector("#action-section");
        let currentPlayer = winner = {};
        let coordinateX = coordinateY = 0;
        let played = "";
        
        currentPlayer = createPlayers.getCurrentPlayer();
        e.target.dataset.played = currentPlayer.symbol;
        e.target.textContent = currentPlayer.symbol;

        coordinateX = Number(e.target.dataset.position[0]);
        coordinateY = Number(e.target.dataset.position[2]);
        played = e.target.dataset.played;

        displayController.updateGameBoard(coordinateX, coordinateY, played);
        displayController.checkForWin(displayController.getGameBoard());
        winner = displayController.getWinner();

        if (winner.symbol) {
            winnerTxt.textContent = `${winner.symbol} Wins!!!`;

            resetBtn.addEventListener("click", resetBoard);
            resetBtn.innerHTML = "RESET";

            actionSection.appendChild(resetBtn);
            
        }
    }

    function resetBoard() {
        boardContainer.removeChild(boardContainer.firstChild);
        displayController.removeGameBoard();
        gameBoard = displayController.gameBoard;
        
        winnerTxt.textContent = "";
    
        displayController.resetWinner();
        winner = displayController.getWinner();
        createBoard();

        resetBtn.remove();
    }

    return {createBoard};
})();

const createPlayers = (function () {
    const player1 = {symbol : "X"};
    const player2 = {symbol : "O"};
    
    let currentPlayer = player2;

    function switchCurrentPlayer() {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }
    function getCurrentPlayer() {
        switchCurrentPlayer();
        return currentPlayer
    };
    function getPlayer(symbol) {
        if (player1.symbol === symbol) {return player1}
        else return player2
    }

    return {player1, player2, getCurrentPlayer, getPlayer};
})();

const checkForWinner = (function () {
    let winner = {}; 

    function checkForWin(gameBoard) {
        let playerSymbol = "";

        for(let i = 0; i <= 6; i++) {
            if (
                gameBoard[i].played != ""
                && gameBoard[i].coordinateX == gameBoard[i + 1].coordinateX
                && gameBoard[i].coordinateX == gameBoard[i + 2].coordinateX
                && gameBoard[i].played == gameBoard[i + 1].played
                && gameBoard[i].played == gameBoard[i + 2].played
                ) {
                    playerSymbol = gameBoard[i].played;
                    winner = createPlayers.getPlayer(playerSymbol);
             }
        
        }
        // 3 Because we check i + something
        for(let i = 0; i < 3; i++) {
            if (
                gameBoard[i].played != ""
                && (
                    ( gameBoard[i].coordinateY == gameBoard[i + 3].coordinateY
                    && gameBoard[i].coordinateY == gameBoard[i + 6].coordinateY
                    && gameBoard[i].played == gameBoard[i + 3].played
                    && gameBoard[i].played == gameBoard[i + 6].played ) 

                    || ( gameBoard[i].coordinateX == gameBoard[i].coordinateY
                        && gameBoard[i].played == gameBoard[i + 4].played
                        && gameBoard[i].played == gameBoard[i + 8].played )

                    || ( gameBoard[i].coordinateX == gameBoard[i + 4].coordinateY
                        && gameBoard[i + 2].coordinateX == gameBoard[i + 2].coordinateY
                        && gameBoard[i].played == gameBoard[i + 2].played
                        && gameBoard[i].played == gameBoard[i + 4].played )
                    )
            ) { 
                playerSymbol = gameBoard[i].played;
                winner = createPlayers.getPlayer(playerSymbol);
            }
            
        }
        
    }

    function getWinner() {return winner};

    function resetWinner() {winner = {}};

    return {checkForWin, getWinner, resetWinner};
})();


const createGame = (function () {
    
    displayController.createBoardUI();

})();
