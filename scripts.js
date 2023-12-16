const DisplayController = (function () {
    function getGameBoard() { return CreateGameboard.getGameBoard(); }
     
    function updateGameBoard (x, y, played) { CreateGameboard.updateGameBoard(x, y, played); }
       
    function removeGameBoard() { CreateGameboard.removeGameBoard(); }

    function checkForWin(gameBoard) { CheckForWinner.checkForWin(gameBoard); }

    function getWinner() { return CheckForWinner.getWinner(); }

    function resetWinner() { CheckForWinner.resetWinner(); }

    function createBoardUI() { UpdateDisplay.createBoard();}
    
    function createGameSetupForm() { return UpdateDisplay.createGameSetupForm(); }

    function addPlayersNames(player1sName, player2sName) {return CreatePlayers.addPlayersNames(player1sName, player2sName);}

    return {
        getGameBoard,
        createGameSetupForm,
        updateGameBoard,
        removeGameBoard,
        checkForWin,
        getWinner,
        resetWinner,
        createBoardUI,
        addPlayersNames
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
    const winnerTxt = document.createElement("h2");
    const resetBtn = document.createElement("button");
    const actionSection = document.querySelector("#action-section");

    function createGameSetupForm() {
        const registerPlayersForm = document.createElement("form");
        registerPlayersForm.id = "registration-form";
        
        const player1Label = document.createElement("label");
        const player1Input = document.createElement("input");
        player1Input.id = "player1";
        player1Input.name = "player1";
        player1Input.placeholder = "eg: Jack";
        player1Label.htmlFor = "player1";
        player1Label.textContent = "X's Name";
        
        const player2Label = document.createElement("label");
        const player2Input = document.createElement("input");
        player2Input.id = "player2";
        player2Input.name = "player2";
        player2Input.placeholder = "eg: Jill";
        player2Label.htmlFor = "player2";
        player2Label.textContent = "O's Name";

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "SAVE";


        registerPlayersForm.appendChild(player1Label);
        registerPlayersForm.appendChild(player1Input);
        registerPlayersForm.appendChild(player2Label);
        registerPlayersForm.appendChild(player2Input);
        registerPlayersForm.appendChild(submitButton);
        registerPlayersForm.addEventListener("submit", submitForm);
        
        actionSection.appendChild(registerPlayersForm);

        function submitForm(e) {
            e.preventDefault();
            let player1sName = player1Input.value;
            let player2sName = player2Input.value;

            if (player1sName == "" || player2sName == "") {
                console.log("Form Not Fully Filled");
            } else {
                DisplayController.addPlayersNames(player1sName, player2sName);
            }

        }

    }
    
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
            winnerTxt.textContent = `${winner.name}(${winner.symbol}) Wins!!!`;
            winnerTxt.id = "winner-txt";

            resetBtn.addEventListener("click", resetBoard);
            resetBtn.innerHTML = "RESET";

            actionSection.removeChild(actionSection.firstElementChild);
            actionSection.appendChild(winnerTxt);
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

    return {createBoard, createGameSetupForm};
})();

const CreatePlayers = (function () {
    const player1 = {
        symbol : "X",
        name : ""
    };
    const player2 = {
        symbol : "O",
        name : ""
    };
    
    let currentPlayer = player2;

    function switchCurrentPlayer() {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }
    function getCurrentPlayer() {
        switchCurrentPlayer();
        return currentPlayer
    };

    function addPlayersNames(player1sName, player2sName) {
        player1.name = player1sName;
        player2.name = player2sName;

        console.log(player1);
        console.log(player2);
    }
    function getPlayer(symbol) {
        if (player1.symbol === symbol) {return player1}
        else return player2
    }

    return {getCurrentPlayer, getPlayer, addPlayersNames};
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
   
    DisplayController.createGameSetupForm();
    DisplayController.createBoardUI();

})();
