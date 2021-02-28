import Player from "./player.js"

const App=(()=>{
//Cache the dom
let containerEl = document.querySelector(".container")
let buttonStartEl = document.querySelector(".start-btn")

let board = ["", "", "", "", "", "", "", "", ""]
let counter= 1
let player1Result= []
let player2Result=[]
// create player1 and 2
const player1= new Player("sofian", "X")
const player2= new Player("Leonor", "0")

//find the index of the board array per player



// Set the logic of start change and reset  the game
const displayController =() => {

}

// Create a new gameboard
const gameBoard = () => {
let markup =""
//Create the HTML markup
for (let i in board){
    markup+= `<div class="box"  id="${i}"></div>`
}
//Join it to the contakiner
containerEl.innerHTML = markup;
}
gameBoard()

//Add event listener and sign.
const playing = () => {
for (let i of containerEl.children){
    i.addEventListener("click", function click(e){
        //Player one playing
    if(counter % 2 !== 0 && e.target.innerHTML === ""){
        e.target.innerHTML = "X";
        counter++
        board.splice(i.id, 1, "X")
        player1Result.push(parseInt(i.id))
        if(winningComb() === 1) { player1.score++}
        console.log(player1.score)
        return 1
    }
    //Player two playing
    else if( counter % 2 === 0 && e.target.innerHTML === "") {
        e.target.innerHTML = "0";
        counter++
        board.splice(i.id, 1, "0")
        player2Result.push(parseInt(i.id))
        if(winningComb() === 2) { player2.score++}
        console.log(player2.score)
    }
    })
  }

}
playing()


const isInclude = (a, b) => {
    const found = a.every(r => b.indexOf(r) >= 0)
    return found
} 

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
        if(isInclude(i, player1Result)){
         return 1
        }else if (isInclude(i, player2Result)){
            return 2
        }
}
}


})();