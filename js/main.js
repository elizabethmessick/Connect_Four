/*----- constants -----*/
var players = {
	"1": "rgb(150, 175, 214)",
	"-1": "yellow",
	null: "rgb(247, 85, 49)"
};

const winningMessage = {
	"1": "Player One wins! Woo hoo!",
	"-1": "Player Two is the one with the chicken dinner!",
	tie: "You guys suck haha!"
};

/*----- app's state (variables) -----*/
var board, playerTurn, winner, turnCounter;
var beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
// var whistleAudio = new Audio('../sounds/whistle.mp3')

/*----- cached element references -----*/
var message = document.getElementById("message");
var columnButtons = document.querySelectorAll("#slot button");
var popUpBox = document.getElementById("popUpBox");
var popUpText = document.getElementById("popUpText");
var playAgain = document.getElementById("playAgain").addEventListener("click", function () {
	location.reload();
})

/*----- event listeners -----*/
document.getElementById("slot").addEventListener("click", handleClick);
document.getElementById("reset").addEventListener("click", function () {
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
	var row = board[col].indexOf(null);
	beepAudio.play();
	board[col][row] = playerTurn;
	turnCounter += 1;
	setWinner();
	playerTurn *= -1;
	render();
}

function setWinner() {
	for (var colIdx = 0; colIdx < board.length; colIdx++) {
		for (var rowIdx = 0; rowIdx < board[colIdx].length; rowIdx++) {
			if (board[colIdx][rowIdx] === null) break;
			winner = checkCellForWin(colIdx, rowIdx);
			if (winner) break;
		}
		if (winner) break;
	}
	if (winner === null && turnCounter === 42) winner = "tie";
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
	return diagRightWin || diagLeftWin ? board[col][row] : null;
}

function render() {
	// transfer all state to the DOM aka changing look of html
	board.forEach(function (col, colIdx) {
		col.forEach(function (cell, rowIdx) {
			var td = document.getElementById(`c${colIdx}r${rowIdx}`);
			td.style.backgroundColor = players[cell];
		});
		columnButtons[colIdx].style.visibility = col.includes(null) ? "visible" : "hidden";
	});

	if (winner) {
		// message.textContent = winningMessage[winner];
		popUpText.textContent = winningMessage[winner];
		popUpBox.style.display = "block";
	} else {
		message.textContent = `Hello Player ${
			playerTurn === 1 ? "One" : "Two"
			}`;
	}

	// if (winner = "tie") {
	// 	popUpBox.textContent = winningMessage[winner];
	// 	popUpBox.style.display = "block";
	// }
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
