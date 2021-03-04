import Player from "./player.js"

const App=(()=>{
//Cache the dom
let containerEl = document.querySelector(".container");

let buttonResetEl= document.querySelector(".reset-btn");
let bodyEl= document.querySelector("body")
let inputPlayer1El = document.querySelector(".player-1");
let inputPlayer2El = document.querySelector(".player-2");
let score1El = document.querySelector(".score-1");
let score2El = document.querySelector(".score-2");
let texteGameEl= document.querySelector(".text-display")

let board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]
let counter= 1;
let playersTurn = 0
let isOver= false;
// Return a random number between 500 and 1500
let delayInMilliseconds = Math.floor(Math.random() * 1000) + 500;

// create player1 and 2
let player1;
let player2;



const gameboard=_=> {
    let markup="";
    if(typeof player1 === "object" && typeof player2 === "object" ){
        for(let i in board){
            markup += `<div class="box" id="${i}"></div>`
        } 
    }
   
    containerEl.innerHTML = markup;
    highLight()
}

//event listeners
const listeners= _ =>{

buttonResetEl.addEventListener("click", function(){
    resetAll()
})

containerEl.addEventListener('click', function(e){
console.log()
    if(player2.name == "Unbeatable robot"){
        if(counter %2 !== 0 && e.target.innerHTML !== "O"){
            e.target.innerHTML ="X";
            board.splice(parseInt(e.target.id), 1, "X");
            counter++;
            winningComb();

            let maxChance = minimax(board, "O");
            // Illusion that the computer think
            setTimeout(function() {
                board.splice(parseInt(maxChance.index), 1, "O");
                document.getElementById(maxChance.index).innerHTML = "O";
                counter++;
                winningComb();
              }, delayInMilliseconds)
        }else if(counter %2 === 0 && e.target.innerHTML !== "O"){
            let maxChance = minimax(board, "O");
            board.splice(parseInt(maxChance.index), 1, "O");
                document.getElementById(maxChance.index).innerHTML = "O";
                counter++;
                winningComb();
        }
        
    }else{
        if(counter %2 !== 0 && e.target.innerHTML !== "O"){
            e.target.innerHTML ="X";
            board.splice(parseInt(e.target.id), 1, "X")
            counter++
            winningComb()
            winner()
        }else if(counter %2 === 0 && e.target.innerHTML !== "X"){
            e.target.innerHTML ="O";
            board.splice(parseInt(e.target.id), 1, "O")
            counter ++
            winningComb()
            winner()
        }
    }
   
})
bodyEl.addEventListener("keypress", function(e){
    if(e.key=== "Enter"){
        let name1= inputPlayer1El.value;
        player1 = new Player(name1, "X")
        if(inputPlayer2El.value === ""){
        let name2= "Unbeatable robot"
        player2 = new Player(name2, "O")
        inputPlayer2El.value =  "Unbeatable robot";
        }else {
        let name2= inputPlayer2El.value;
        player2 = new Player(name2, "O")
        }
        renderAll()
        texteGameEl.firstElementChild.innerHTML= `Let's start ${player1.name}, your move`
    }
})
}

//Highlight the players name when turn
const highLight= () =>{
    if(playersTurn === 0){
        inputPlayer1El.setAttribute("class", "turn")
        inputPlayer2El.removeAttribute("class", "turn")
    }else if(playersTurn === 1){
        inputPlayer1El.removeAttribute("class", "turn")
        inputPlayer2El.setAttribute("class", "turn")
}
}

//return an array of results
const boardToArray =(arr, sign) =>{
    let resultP1 = [] 
    let resultP2 = []
    if(sign === "X"){
        for (let i in arr){
            if(arr[i] === sign) {
                resultP1.push(parseInt(i))
            }
    }
    }else if(sign ==="O"){
            for (let i in arr){
                if(arr[i] === sign) {
                resultP2.push(parseInt(i))
                }
            }
    }
    return {
        resultP1: resultP1,
        resultP2: resultP2
    }
}



const removeName=_=>{
    inputPlayer1El.value = ""
    inputPlayer2El.value = ""
}

//check if player is include 
const isInclude = (a, b) => {
    const found = a.every(r => b.indexOf(r) >= 0)
    return found
} 

const resetAll =() =>{
    resetGame();
    resetScore();
    player2.reset();
    player1.reset();
    removeName();
    texteGameEl.firstElementChild.innerHTML= 'Enter your name and press "Enter"';
}
const resetGame =() =>{
    board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    
    // defining next round turn
    if(playersTurn === 1){
        counter = 1;
        playersTurn= 0;
    }else if(playersTurn === 0){
        counter = 0;
        playersTurn= 1;
    }
    isOver= false;
    renderAll();
}

const renderResultScore= () => {
    score1El.innerHTML = player1.score;
    score2El.innerHTML = player2.score;
}

const resetScore = () => {
    score1El.innerHTML = 0;
    score2El.innerHTML = 0;
}

// Check the winning combination
const winningComb=() => {
const winningCombination= [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
]
    for(let i of winningCombination){
        if(isInclude(i, boardToArray(board, "X").resultP1)){
         player1.scoreAdd();
         isOver = true;
         texteGameEl.firstElementChild.innerHTML = player1.hasWon()
         
         resetGame()
        }else if (isInclude(i, boardToArray(board, "O").resultP2)){
         player2.scoreAdd()
         isOver = true;
         texteGameEl.firstElementChild.innerHTML = player2.hasWon()
         
         resetGame()
        }else if(counter === board.length){
        texteGameEl.firstElementChild.innerHTML = "it's a tie";
        isOver = true;
        resetGame()
        }
        renderResultScore()
}
}

const winner =_=>{
    if(isOver){
        resetGame()
        renderAll()
        renderResultScore()
    }
}

//

// this is the uboard flattened and filled with some values to easier asses the Artificial Inteligence.
var origBoard = ["O",1 ,"X","X",4 ,"O", 6 ,"X","O"];

// human
var player10 = "X";
// ai
var player20 = "O";


// keep track of function calls
var fc = 0;

// finding the ultimate play on the game that favors the computer


var bestSpot = minimax(origBoard, "O");

//loging the results
console.log("index: " + bestSpot.index);
console.log("function calls: " + fc);

// returns the available spots on the uboard
function emptyIndexies(uboard){
  return  uboard.filter(s => s != "O" && s != "X");
}

// winning combinations using the uboard indexies for instace the first win could be 3 xes in a row
function minMaxWinning(uboard, player){
 if (
        (uboard[0] == player && uboard[1] == player && uboard[2] == player) ||
        (uboard[3] == player && uboard[4] == player && uboard[5] == player) ||
        (uboard[6] == player && uboard[7] == player && uboard[8] == player) ||
        (uboard[0] == player && uboard[3] == player && uboard[6] == player) ||
        (uboard[1] == player && uboard[4] == player && uboard[7] == player) ||
        (uboard[2] == player && uboard[5] == player && uboard[8] == player) ||
        (uboard[0] == player && uboard[4] == player && uboard[8] == player) ||
        (uboard[2] == player && uboard[4] == player && uboard[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}

// the main minimax function
function minimax(newBoard, player){
  
  //keep track of function calls;
  fc++;

  //available spots
  var availSpots = emptyIndexies(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (minMaxWinning(newBoard, player10)){
     return {score:-10};
  }
	else if (minMaxWinning(newBoard, "O")){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == "O"){
      var result = minimax(newBoard, player10);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, "O");
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === "O"){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}
const renderAll= _ =>{
        gameboard()
        
    }

return {
    listeners: listeners,
    renderAll: renderAll
}


})();

App.listeners();
App.renderAll()