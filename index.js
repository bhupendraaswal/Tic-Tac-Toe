const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPostions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let create funtion to intialise the game 
 function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pe bhi empty krna padega
    boxes.forEach((box, index)  =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // one more thing is missing, initialise box with css properties again, all css property reapply in box
        box.classList = `box  box${index+1}`;
    } );
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `current Player - ${currentPlayer}`;



 }
 initGame();

 function swapTurn(){
    if (currentPlayer === "X") {
        currentPlayer = "O";

        
    } else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `current Player - ${currentPlayer}`;
 }

 function checkGameOver() {
    let answer = "";
    winningPostions.forEach((position) => {
        // all 3 boxes should be non empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) &&  (gameGrid[position[1]] === gameGrid[position[2]] ) ) {
                // check if winner is X
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else
                    answer= "O";

                // disable pointer event
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });

                // now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // it means we have a winner
    if(answer != "") {
        gameInfo.innerText = `winner player- ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //we know , no winner found let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(gameGrid !== "")
            fillCount++;
    });

    // board is filled ,game is Tie
    if(fillCount == 9 )
        newGameBtn.classList.add("active");
        gameInfo.innerText = `Game Tied`; 


 }



 function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap krna h x ko o me
        swapTurn();
        // koi jeet to nahi gya
        checkGameOver();
    }
 }
  
 boxes.forEach((box , index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
 } );

 newGameBtn.addEventListener("click", initGame);

