
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
    initalize(); render();
    });
    
/*----- functions -----*/
initalize(); 

function handleClick(event) {
    var target = event.target;
    if (target.tagName !== "BUTTON") return;
    var col = parseInt(target.id.charAt(6));
    if (!board[col].includes(null)) {alert ("try again")};  
    var row = board[col].indexOf(null); 
    //update all state(board, playerTurn, winner)
    board[col][row] = playerTurn; 
    winner = getWinner(); 
    playerTurn *= -1;
    render();
}

function getWinner() {
    for (var colIdx = 0; colIdx < board.length; colIdx++) {
        for (var rowIdx = 0; rowIdx < board[colIdx].length; rowIdx++) {
            if (board[colIdx][rowIdx] === null) break;
            winner = checkCellForWin(colIdx, rowIdx); 
            if (winner) break; 
        }  
        if (winner) break; 
    }
}

function checkCellForWin(col, row) {
    winner = upWin(col, row);
    if (winner) return winner;
    winner = sideWin(col, row);
    if (winner) return winner;
    winner = diagRightWin(col, row);
    if (winner) return winner;
    return diagLeftWin(col, row);
    // return upWin(col, row) || sideWin(col, row) || diagUpWin(col, row) || diagDownWin(col, win);
}

function upWin(col, row) {
    if (row > 2) return null;
    return Math.abs(board[col][row] + board[col][row + 1] + board[col][row + 2] + board[col][row + 3]) === 4 ? alert("Player " + board[col][row] + " wins") : null;
}
function sideWin(col, row) {
    if (col > 3) return null;
    return Math.abs(board[col][row] + board[col +1][row] + board[col + 2][row] + board[col + 3][row]) === 4 ? alert(board[col][row]) : null;
}
function diagRightWin(col, row) {
    if (col > 3) return null;
    return Math.abs(board[col][row] + board[col + 1][row + 1] + board[col + 2][row + 2] + board[col +3][row + 3]) === 4 ? alert(board[col][row]) : null;
}
function diagLeftWin(col, row) {
    if (col > 3) return null;
    return Math.abs(board[col][row] + board[col + 1][row - 1] + board[col + 2][row - 2] + board[col + 3][row - 3]) === 4 ? alert(board[col][row]) : null;
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
 
