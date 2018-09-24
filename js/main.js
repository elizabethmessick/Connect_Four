
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

function reset() {
    window.location.reload()
}

function handleClick(event) {
    var target = event.target;
    if (target.tagName !== "BUTTON") return;
    // debugger;
    var col = parseInt(target.id.charAt(6));
    if (!board[col].includes(null)) {alert ("try again")};  
    var row = board[col].indexOf(null); 
    // // update all state(board, playerTurn, winner)
    board[col][row] = playerTurn; 
    playerTurn *= -1;
    winner = getWinner(); 
    render();
}

function getWinner() {
    return null; 
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
 

//id.charAt(3)
//"3"
//parseInt(id.charAt(3))
//returns the number 3 

