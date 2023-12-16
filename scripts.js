const DisplayController = (function () {
    function getGameBoard() { return CreateGameboard.getGameBoard(); }
    
    function updateGameBoard (x, y, played) { CreateGameboard.updateGameBoard(x, y, played); }
       
    function removeGameBoard() { CreateGameboard.removeGameBoard(); }

    function checkForWin(gameBoard) { CheckForWinner.checkForWin(gameBoard); }

    function getWinner() { return CheckForWinner.getWinner(); }

    function resetWinner() { CheckForWinner.resetWinner(); }

    function createBoardUI() { UpdateDisplay.createBoard();}

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


const CreateGameboard = (function () {
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


const UpdateDisplay = (function () {
    const boardContainer = document.querySelector("#board-container");
    const winnerTxt = document.querySelector("#winner-txt");
    const resetBtn = document.createElement("button");
    
    function createBoard() {
        let gameBoard = DisplayController.getGameBoard();
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
        
        currentPlayer = CreatePlayers.getCurrentPlayer();
        e.target.dataset.played = currentPlayer.symbol;
        e.target.textContent = currentPlayer.symbol;

        coordinateX = Number(e.target.dataset.position[0]);
        coordinateY = Number(e.target.dataset.position[2]);
        played = e.target.dataset.played;

        DisplayController.updateGameBoard(coordinateX, coordinateY, played);
        DisplayController.checkForWin(DisplayController.getGameBoard());
        winner = DisplayController.getWinner();

        if (winner.symbol) {
            winnerTxt.textContent = `${winner.symbol} Wins!!!`;

            resetBtn.addEventListener("click", resetBoard);
            resetBtn.innerHTML = "RESET";

            actionSection.appendChild(resetBtn);
            
        }
    }

    function resetBoard() {
        boardContainer.removeChild(boardContainer.firstChild);
        DisplayController.removeGameBoard();
        gameBoard = DisplayController.gameBoard;
        
        winnerTxt.textContent = "";
    
        DisplayController.resetWinner();
        winner = DisplayController.getWinner();
        createBoard();

        resetBtn.remove();
    }

    return {createBoard};
})();

const CreatePlayers = (function () {
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

const CheckForWinner = (function () {
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
                    winner = CreatePlayers.getPlayer(playerSymbol);
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
                winner = CreatePlayers.getPlayer(playerSymbol);
            }
            
        }
        
    }

    function getWinner() {return winner};

    function resetWinner() {winner = {}};

    return {checkForWin, getWinner, resetWinner};
})();


const CreateGame = (function () {
    
    DisplayController.createBoardUI();

})();
