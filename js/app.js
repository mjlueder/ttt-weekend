/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

// Step 1 - Define the required variables used to track the state of the game

  // 1a) Use a variable named `board` to represent the state of the squares on
  //     the board.

  // 1b) Use a variable named `turn` to track whose turn it is.

  // 1c) Use a variable named `winner` to represent if anyone has won yet.

  // 1d) Use a variable named `tie` to represent if the game has ended in a tie.

let board, turn, winner, tie

/*------------------------ Cached Element References ------------------------*/
// Step 2 - Store cached element references.

  // 2a) In a constant called `squareEls`, store the nine elements 
  //    representing the squares on the page.

  // 2b) In a constant called `messageEl`, store the element that displays the 
  //    game's status on the page.
  
  
const squareEls = document.querySelectorAll('.sqr')
// console.dir(squareEls);
const messageEl = document.getElementById('message')
// console.log(messageEl);
const boardEl = document.querySelector('.board')
// console.log(boardEl);
const resetBtnEl = document.querySelector('.reset')
// console.log(resetBtnEl);

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

function init(){
  board = [null, null, null, null, null, null, null, null, null]
  turn = -1
  winner = false
  tie = false
  render()
}
// Step 3 - Upon loading, the game state should be initialized, and a function 
//          should be called to render this game state.

  // 3a) Create a function called `init`.
  
  // 3c) Set the `board` variable to an array containing nine `null`s to 
  //    represent empty squares.

  // 3d) Set the `turn` to `1` - which will represent player X.

  // 3e) Set the `winner` to false.

  // 3f) Set `tie` to false.

  // 3g) Call a function called `render` at the end of the `init` function.

// 3b) Call this `init` function when the app loads.

init()  // is this right?

function render(){
  updateBoard()
  updateMessage()
}

function updateBoard(){
  board.forEach(function(sqr, idx){
    // console.dir(sqr);
    // console.log(idx);
    // console.log(squareEls[idx]);
    if (sqr === null) { squareEls[idx].textContent = ''} 
    if (sqr === 1) { squareEls[idx].textContent = '🌈' }
    if (sqr === -1) { squareEls[idx].textContent = '🎶' }
  })
}

function updateMessage() {
  let letter
  if (turn === -1) letter = '🎶'
  if (turn === 1) letter = '🌈'
  if (winner === false && tie === false){
    messageEl.textContent = `It's ${letter}'s turn`
  } else if (winner === false && tie === true) {
    messageEl.textContent = `It's a tie! 🫠`
  } else {
    messageEl.textContent = `Player ${letter} won!`
    confetti.start(2000)
  }
}

// winner = true
// tie = true
// updateMessage()

function handleClick(evt){
  // console.log(evt.target.id[2]);
  // console.dir(evt.target);
  // console.log(evt.target.textContent);
  let sqIdx = evt.target.id[2]
  // console.log(board[sqIdx]);
  if (board[sqIdx] !== null) return
  if (winner === true) return
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}

function placePiece(idx) {
  board[idx] = turn
  // console.log('board idx', idx, board[idx]);
}

function checkForTie(){
  let checkTie = board.every(function(value){
    return value !== null
  })
  tie = checkTie
  // console.log(tie);
}

// checkForTie()
// console.log(tie);

function checkForWinner(){
    winningCombos.forEach(function(combo){
      let sum = 0
      combo.forEach(function(sqr){
        // console.log(board[sqr])
        sum += board[sqr]
      })
      // console.log('sum ', sum);
      sum = Math.abs(sum)
      // console.log('abs ', sum);
      if (sum === 3) winner = true
      // console.log(winner);
    })
  }

// checkForWinner()

function switchPlayerTurn(){
  if (winner === true) return
  turn = turn * -1
  // console.log(turn);
}
