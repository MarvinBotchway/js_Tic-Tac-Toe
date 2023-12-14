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

    function updateBoard (x, y, played) {
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i].coordinateX == x &&
            gameBoard[i].coordinateY == y) {
                gameBoard[i].played = played;
            }
        }
    }

    function getBoard () {
        if (gameBoard.length === 0)createBoard();
        return gameBoard
    };
   
    
    return {getBoard, updateBoard}
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
            
            cell.addEventListener("click", updateBoard);
            board.appendChild(cell);
        }
        boardContainer.appendChild(board);
    } 

    function updateBoard(e){
        if (e.target.dataset.played != "") return;
        let currentPlayer = createPlayers.getCurrentPlayer();
        e.target.dataset.played = currentPlayer.symbol;
        e.target.textContent = currentPlayer.symbol;

        let x = Number(e.target.dataset.position[0]);
        let y = Number(e.target.dataset.position[2]);
        let played = e.target.dataset.played;
        createGameboard.updateBoard(x, y, played);

        console.log(gameBoard);
        
        createGame.checkWin(gameBoard);
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

    return {player1, player2, getCurrentPlayer};
})();


const createGame = (function () {
    const createGameBoardUI = updateDisplay.createBoard();
    const winner = {}; 

    function checkWin(gameBoard) {
        // 7 Because we check i + 2
        for(let i = 0; i < 3; i++) {
            if (gameBoard[i].played != ""){
                if (
                    gameBoard[i].coordinateX == gameBoard[i + 1].coordinateX
                    && gameBoard[i].coordinateX == gameBoard[i + 2].coordinateX
                    && gameBoard[i].played == gameBoard[i + 1].played
                    && gameBoard[i].played == gameBoard[i + 2].played
                    ) {
                    console.log(`${gameBoard[i].played} Wins!!!`);
                } else if (
                    gameBoard[i].coordinateY == gameBoard[i + 3].coordinateY
                    && gameBoard[i].coordinateY == gameBoard[i + 6].coordinateY
                    && gameBoard[i].played == gameBoard[i + 3].played
                    && gameBoard[i].played == gameBoard[i + 6].played
                    ) {
                    console.log(`${gameBoard[i].played} Wins!!!`);

                } else if (
                    gameBoard[i].coordinateX == gameBoard[i].coordinateY
                    && gameBoard[i].played == gameBoard[i + 4].played
                    && gameBoard[i].played == gameBoard[i + 8].played
                    ) {
                    console.log(`${gameBoard[i].played} Wins!!!`);

                } else if (
                    gameBoard[i].coordinateX == gameBoard[i + 4].coordinateY
                    && gameBoard[i + 2].coordinateX == gameBoard[i + 2].coordinateY
                    && gameBoard[i].played == gameBoard[i + 2].played
                    && gameBoard[i].played == gameBoard[i + 4].played
                    ) {
                    console.log(`${gameBoard[i].played} Wins!!!`);

                }
            }
            
           



        }
    }



    return {createGameBoardUI, checkWin};
})();


