
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
    for (var colIdx = 0; colIdx < board.length; colIdx++) {//col
        for (var rowIdx = 0; rowIdx < board[colIdx].length; rowIdx++) {//row
            console.log(colIdx, rowIdx, playerTurn);
            if (board[colIdx][rowIdx] === null) {
                break; 
            }
        }  
    } 
}

// function winnerUp(col, row){
//     var sum;
//     if(row > 4){
//         return;
//     }
//     sum = board[col][row] + board[col+1][row] + board[col+2][row] + board[col+3][row];
//     var totalSum = Math.abs(sum);
//     return totalSum === 4 ? board[col][row] : null; 
// }

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
 
