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

let board, turn, winner, tie

/*------------------------ Cached Element References ------------------------*/
  
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

init()  

function init(){
  board = [null, null, null, null, null, null, null, null, null]
  turn = -1
  winner = false
  tie = false
  render()
}

function render(){
  updateBoard()
  updateMessage()
  squareEls.forEach(function(sqr){
    if (sqr.classList.contains('animate__animated', 'animate__headShake'))
    sqr.classList.remove('animate__animated', 'animate__headShake')
  })
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
    confetti.start(2500)
  }
}

// winner = true
// tie = true
// updateMessage()

function handleClick(evt){
  // console.log(evt.target.id[2]);
  // console.dir(evt.target);
  // console.log(evt.target.textContent);
  let sqIdx = Number(evt.target.id[2])
  // console.log(sqIdx);
  if (isNaN(sqIdx)) return
  if (board[sqIdx]) {
    evt.target.classList.add('animate__animated', 'animate__headShake')
    return
  }
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

// alt: if (board.includes(null)) return
//      tie = true
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
  turn *= -1
  // console.log(turn);
}

