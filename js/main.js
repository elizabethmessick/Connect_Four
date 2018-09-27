/*----- constants -----*/
const PLAYERS = {
	"1": "rgb(150, 175, 214)",
	"-1": "yellow",
	null: "rgb(247, 85, 49)"
};

const WINNING_MESSAGE = {
	"1": "Player One wins! Woo hoo!",
	"-1": "Player Two is the one with the chicken dinner!",
	tie: "You guys suck haha!"
};

/*----- app's state (variables) -----*/
var board, playerTurn, winner, turnCounter;
var beepAudio = new Audio("http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3");

/*----- cached element references -----*/
var message = document.getElementById("message");
var columnButtons = document.querySelectorAll("#slot button");
var popUpBox = document.getElementById("pop-up-box");
var popUpText = document.getElementById("pop-up-text");

/*----- event listeners -----*/
document.getElementById("slot").addEventListener("click", columnClick);
document.getElementById("reset").addEventListener("click", function () {
	initalize();
	render();
});
document.getElementById("playAgain").addEventListener("click", function () {
	location.reload();
});

/*----- functions -----*/
initalize();

function columnClick(event) {
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

function checkCellForWin(colIdx, rowIdx) {
	return checkUpWin(colIdx, rowIdx) || checkSideWin(colIdx, rowIdx) || checkDiagonalWin(colIdx, rowIdx);
}

function checkUpWin(colIdx, rowIdx) {
	if (rowIdx > 2) return null;
	return Math.abs(
		board[colIdx][rowIdx] +
		board[colIdx][rowIdx + 1] +
		board[colIdx][rowIdx + 2] +
		board[colIdx][rowIdx + 3]
	) === 4 ? board[colIdx][rowIdx] : null;
}

function checkSideWin(colIdx, rowIdx) {
	if (colIdx > 3) return null;
	return Math.abs(
		board[colIdx][rowIdx] +
		board[colIdx + 1][rowIdx] +
		board[colIdx + 2][rowIdx] +
		board[colIdx + 3][rowIdx]
	) === 4 ? board[colIdx][rowIdx] : null;
}

function checkDiagonalWin(colIdx, rowIdx) {
	if (colIdx > 3) return null;
	var diagRightWin =
		Math.abs(
			board[colIdx][rowIdx] +
			board[colIdx + 1][rowIdx + 1] +
			board[colIdx + 2][rowIdx + 2] +
			board[colIdx + 3][rowIdx + 3]
		) === 4;
	var diagLeftWin =
		Math.abs(
			board[colIdx][rowIdx] +
			board[colIdx + 1][rowIdx - 1] +
			board[colIdx + 2][rowIdx - 2] +
			board[colIdx + 3][rowIdx - 3]
		) === 4;
	return diagRightWin || diagLeftWin ? board[colIdx][rowIdx] : null;
}

function render() {
	board.forEach(function (col, colIdx) {
		col.forEach(function (cell, rowIdx) {
			var td = document.getElementById(`c${colIdx}r${rowIdx}`);
			td.style.backgroundColor = PLAYERS[cell];
		});
		columnButtons[colIdx].style.visibility = col.includes(null) ? "visible" : "hidden";
	});
	if (winner) {
		popUpText.textContent = WINNING_MESSAGE[winner];
		popUpBox.style.display = "block";
	} else {
		message.textContent = `Hello Player ${playerTurn === 1 ? "One" : "Two"}`;
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
