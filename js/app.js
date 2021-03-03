import Player from "./player.js"

const App=(()=>{
//Cache the dom
let containerEl = document.querySelector(".container");
let buttonStartEl = document.querySelector(".start-btn");
let buttonResetEl= document.querySelector(".reset-btn");
let bodyEl= document.querySelector("body")
let inputPlayer1El = document.querySelector(".player-1");
let inputPlayer2El = document.querySelector(".player-2");
let score1El = document.querySelector(".score-1");
let score2El = document.querySelector(".score-2");
let texteGameEl= document.querySelector(".text-display")

let board = ["", "", "", "", "", "", "", "", ""]
let counter= 1
let isOver= false;
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
}

//event listeners
const listeners= _ =>{
buttonStartEl.addEventListener("click", function(){
    renderAll()
})

buttonResetEl.addEventListener("click", function(){
    resetAll()
})

containerEl.addEventListener('click', function(e){
    if(counter %2 !== 0 && e.target.innerHTML !== "0"){
        e.target.innerHTML ="X";
        board.splice(parseInt(e.target.id), 1, "X")
        counter++
        winningComb()
        winner()
    }else if(counter %2 === 0 && e.target.innerHTML !== "X"){
        e.target.innerHTML ="0";
        board.splice(parseInt(e.target.id), 1, "0")
        counter ++
        winningComb()
        winner()
    }
})
bodyEl.addEventListener("keypress", function(e){
    if(e.key=== "Enter"){
        let name1= inputPlayer1El.value;
        player1 = new Player(name1, "X")
        let name2= inputPlayer2El.value;
        player2 = new Player(name2, "0")
        renderAll()
    }
})
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
    }else if(sign ==="0"){
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
    board = ["", "", "", "", "", "", "", "", ""]
    counter= 0;
    isOver= false;
    removeName()
    renderAll();
}
const resetGame =() =>{
    board = ["", "", "", "", "", "", "", "", ""]
    counter= 0;
    isOver= false;
    renderAll();
}

const renderResultScore= () => {
    score1El.innerHTML = player1.score;
    score2El.innerHTML = player2.score;
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
        }else if (isInclude(i, boardToArray(board, "0").resultP2)){
         player2.scoreAdd()
         isOver = true;
         texteGameEl.firstElementChild.innerHTML = player2.hasWon()
        }else if(counter === board.length){
            texteGameEl.firstElementChild.innerHTML = "it's a tie";
        isOver = true;
        }
}
}

const winner =_=>{
    if(isOver){
        resetGame()
        renderAll()
        renderResultScore()
    }
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