
console.log("this is working");
/*----- constants -----*/

/*----- app's state (variables) -----*/
var board; 
var playerTurn; 

var slotOne;
var slotTwo;
var slotThree;
var slotFour;
var slotFive;
var slotSix;
var slotSeven; 

var checkWin; 
var gameOver; 
/*----- cached element references -----*/
slotOne = document.querySelector(".slotOne");
slotTwo = document.querySelector(".slotTwo");
slotThree = document.querySelector(".slotThree");
slotFour = document.querySelector(".slotFour");
slotFive = document.querySelector(".slotFive");
slotSix = document.querySelector(".slotSix");
slotSeven = document.querySelector(".slotSeven");

/*----- event listeners -----*/
slotOne.addEventListener("click", slotFill);
slotTwo.addEventListener("click", slotFill);
slotThree.addEventListener("click", slotFill);
slotFour.addEventListener("click", slotFill);
slotFive.addEventListener("click", slotFill);
slotSix.addEventListener("click", slotFill);
slotSeven.addEventListener("click", slotFill);


/*----- functions -----*/
board = [[], [], [], [], [], []];



function slotFill() {
// board.splice;

console.log("you clicked a slot!");
};


// board = new Array(6);
// for (var i = 0; i < board.length; i++) {
//   board[i] = new Array(7);  
// }
// console.log(board);

function initalize() {
  
};

initalize(); 
