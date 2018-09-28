/*----- constants -----*/
const PLAYERS = {
	"1": "rgb(35, 153, 182)",
	"-1": "yellow",
	null: "rgb(247, 85, 49)"
};

const WINNING_MESSAGE = {
	"1": "Player One wins!",
	"-1": "Player Two wins!",
	tie: "You guys suck haha!"
};

/*----- app's state (variables) -----*/
var board, playerTurn, winner, turnCounter;
var beepAudio = new Audio("audio/beep.mp3");
var winningAudio = new Audio("https://www.thesoundarchive.com/austinpowers/yababy.mp3");
var powersAudio = new Audio("audio/powers.mp3");

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
columnButtons.forEach(function (button) {
	button.addEventListener("mouseenter", function (e) {
		e.target.style.backgroundColor = PLAYERS[playerTurn];
	})
	button.addEventListener("mouseout", function (e) {
		e.target.style.backgroundColor = "lightpink";
	})
})
/*----- functions -----*/
initalize();

//checks for user button click
function columnClick(event) {
	if (winner !== null) return; //if winner is 1 or -1, game is over
	var target = event.target; //assigns button clicked to target variable
	var col = parseInt(target.id.charAt(6));//assigns current "Y" axis to col variable
	var row = board[col].indexOf(null);//assigns current "X" axis to row variable 
	powersAudio.play();
	beepAudio.play();
	board[col][row] = playerTurn; //change color of cell based on current player
	turnCounter += 1;
	setWinner();
	playerTurn *= -1;
	render();
}

//check rows and columns for 4 of the same "color" in a row.. vertically, horizontally, and diagnally.
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
//check for 4 in a row vertically
function checkUpWin(colIdx, rowIdx) {
	if (rowIdx > 2) return null;
	return Math.abs(
		board[colIdx][rowIdx] +
		board[colIdx][rowIdx + 1] +
		board[colIdx][rowIdx + 2] +
		board[colIdx][rowIdx + 3]
	) === 4 ? board[colIdx][rowIdx] : null;
}
//check for 4 in a row horizontally
function checkSideWin(colIdx, rowIdx) {
	if (colIdx > 3) return null;
	return Math.abs(
		board[colIdx][rowIdx] +
		board[colIdx + 1][rowIdx] +
		board[colIdx + 2][rowIdx] +
		board[colIdx + 3][rowIdx]
	) === 4 ? board[colIdx][rowIdx] : null;
}
//check for 4 in a row diagnally
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
		winningAudio.play();
		powersAudio.pause();
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