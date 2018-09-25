
/*----- constants -----*/
var players = {
    '1': 'red',
    '-1': 'yellow',
    'null': 'white'
  };  

/*----- app's state (variables) -----*/
var board, playerTurn, winner;

/*----- cached element references -----*/

/*----- event listeners -----*/
document.getElementById("slot").addEventListener("click", handleClick);
document.getElementById("reset").addEventListener("click", function(){
    location.reload()}); 

/*----- functions -----*/
initalize(); 

function handleClick(event) {
    var target = event.target;
    if (target.tagName !== "BUTTON") return;
    var col = parseInt(target.id.charAt(6));
    if (!board[col].includes(null)) {alert ("try again")};  
    var row = board[col].indexOf(null); 
    // // update all state(board, playerTurn, winner)
    board[col][row] = playerTurn; 
    winner = getWinner(); 
    playerTurn *= -1;
    render();
}

function getWinner() {
    for (var colIdx = 0; colIdx < board.length; colIdx++) {
            if (board[colIdx][rowIdx] === null) break;
            winner = checkCellForWin(colIdx, rowIdx); 
            if (winner) break; 
        }  
        if (winner) break; 
    } 


function checkCellForWin(col, row) {
    winner = upWin(col, row);
    if (winner) return winner;
    winner = sideWin(col, row);
    if (winner) return winner;
    winner = diagUpWin(col, row);
    if (winner) return winner;
    return diagDownWin(col, row);

    // return upWin(col, row) || sideWin(col, row) || diagUpWin(col, row) || diagDownWin(col, win);
    //do || for the diagonals 
}

function upWin(col, row) {
    if (row > 2) return null;
    return Math.abs(board[col][row] + board[col][row + 1] + board[col][row + 2] + board[col][row + 3]) === 4 ? board[col][row] : null;
}
function sideWin(col, row) {
    if (col > 3) return null;
    return Math.abs(board[col][row] + board[col +1][row] + board[col + 2][row] + board[col + 3][row]) === 4 ? board[col][row] : null;
}
function diagUpWin(col, row) {
    if (col > 3) return null;
    return Math.abs(board[col][row] + board[col][row + 1] + board[col][row + 2] + board[col][row + 3]) === 4 ? board[col][row] : null;
}
function diagDownWin(col, row) {
    if (col > 3) return null;
    return Math.abs(board[col][row] + board[col][row + 1] + board[col][row + 2] + board[col][row + 3]) === 4 ? board[col][row] : null;
}
    
function render() {
    // transfer all state to the DOM
    board.forEach(function(col, colIdx) {
        col.forEach(function(cell, rowIdx) {
            var td = document.getElementById(`c${colIdx}r${rowIdx}`);
            td.style.backgroundColor = players[cell];
        });
    });
}

function initalize() {
    playerTurn = 1;
    winner = null;
    board = [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
    ];
};

render();
 
