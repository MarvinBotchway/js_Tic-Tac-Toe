const createGameboard = (function () {
    let gameBoard = [];
    const boardContainer = document.querySelector("#board-container");
    const board = document.createElement("div");
    board.classList += "board";
   
    function createUI () {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div");
                cell.dataset.position = `${i},${j}`;
                cell.classList += "cell"
                board.appendChild(cell);

                gameBoard.push([i, j]);
            }
        }
        boardContainer.appendChild(board);
    } 
   
    
    return {createUI}
})();


createGameboard.createUI();