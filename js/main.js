/*----- constants -----*/
var players = {
	"1": "red",
	"-1": "yellow",
	null: "white"
};

/*----- app's state (variables) -----*/
var board, playerTurn, winner, turnCounter;

/*----- cached element references -----*/

/*----- event listeners -----*/
document.getElementById("slot").addEventListener("click", handleClick);
document.getElementById("reset").addEventListener("click", function() {
	initalize();
	render();
});

/*----- functions -----*/
initalize();

function handleClick(event) {
	if (winner !== null) return;
	var target = event.target;
	if (target.tagName !== "BUTTON") return;
	var col = parseInt(target.id.charAt(6));
	if (!board[col].includes(null)) {
		alert("try again");
	}
	var row = board[col].indexOf(null);
	//update all state(board, playerTurn, winner)
	board[col][row] = playerTurn;
	turnCounter += 1;
	getWinner();
	if (winner !== null) {
		// winner is 1 or -1
		endGame();
	} else {
		checkTieGame();
		playerTurn *= -1;
	}
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
	return upWin(col, row) || sideWin(col, row) || diagonalWin(col, row);
}

function upWin(col, row) {
	if (row > 2) return null;
	return Math.abs(
		board[col][row] +
			board[col][row + 1] +
			board[col][row + 2] +
			board[col][row + 3]
	) === 4
		? board[col][row]
		: null;
}
function sideWin(col, row) {
	if (col > 3) return null;
	return Math.abs(
		board[col][row] +
			board[col + 1][row] +
			board[col + 2][row] +
			board[col + 3][row]
	) === 4
		? board[col][row]
		: null;
}
function diagonalWin(col, row) {
	if (col > 3) return null;
	var diagRightWin =
		Math.abs(
			board[col][row] +
				board[col + 1][row + 1] +
				board[col + 2][row + 2] +
				board[col + 3][row + 3]
		) === 4;
	var diagLeftWin =
		Math.abs(
			board[col][row] +
				board[col + 1][row - 1] +
				board[col + 2][row - 2] +
				board[col + 3][row - 3]
		) === 4;
	// ? alert(board[col][row]) : null;
	return diagRightWin || diagLeftWin ? board[col][row] : null;
}

function checkTieGame() {
	if (winner !== null && turnCounter === 42) console.log("it's a tie!");
}

function endGame() {
	if (winner !== null && turnCounter < 42)
		console.log(`Player # ${playerTurn} won!`);
}
//playerTurn + 1
//if (tie === 42) return console.log("it's a tie")

function render() {
	// transfer all state to the DOM aka changing look of html
	board.forEach(function(col, colIdx) {
		col.forEach(function(cell, rowIdx) {
			var td = document.getElementById(`c${colIdx}r${rowIdx}`);
			td.style.backgroundColor = players[cell];
		});
	});

	var message = document.getElementById("message");

	if (winner !== null) {
		if (winner === 1) {
			message.innerHTML = `Player 1 wins!`;
		} else if (winner === -1) {
			message.innerHTML = `Player 2 wins!`;
		}
	} else if (playerTurn === 1) {
		message.innerHTML = `Hello Player 1!`;
	} else if (playerTurn === -1) {
		message.innerHTML = `Hello Player 2!`;
	}
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
	turnCounter = 0;
}

render();
