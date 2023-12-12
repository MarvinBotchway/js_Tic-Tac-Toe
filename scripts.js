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
        createBoard();
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
            board.appendChild(cell);
        }
        boardContainer.appendChild(board);
    } 

    return {createBoard};
})();

updateDisplay.createBoard();

