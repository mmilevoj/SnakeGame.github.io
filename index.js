const grid= document.querySelector('.grid'); 
const button = document.getElementById('start-btn');
let scoreDisplay= document.getElementById('score');
let titleDisplay = document.getElementById('title');
let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;
let moveSnakeUp = document.getElementById("btn-up")
let moveSnakeRight = document.getElementById("btn-right")
let moveSnakeDown = document.getElementById("btn-down")
let moveSnakeLeft = document.getElementById("btn-left")

//CREDIT: "SQUID GAME" THEME MUSIC SAMPLE FOR OUR GAME  
button.onclick=function(){
    document.getElementById("my_audio").play();
  } ;

  button.addEventListener('click', startGame)

  // MAKING DIRECTIONAL BUTTONS FOR OUR GAME (MOBILE USE)
moveSnakeUp.addEventListener('click', function () {
  direction = -width;
})
moveSnakeDown.addEventListener('click', function () {
  direction = +width;
})
moveSnakeLeft.addEventListener('click', function () {
  direction = -1;
})

moveSnakeRight.addEventListener('click', function () {
  direction = 1;
})
  
// CREATING OUR SNAKE

function createGrid() {
    for(let i = 0; i<width*width; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        squares.push(square);
    }
}
createGrid();
currentSnake.forEach(index => squares[index].classList.add('snake'));

// STARTING OUR SNAKE GAME

function startGame(){
     //remove the snake
     titleDisplay.textContent = 'SNAKE GAME';
     currentSnake.forEach(index => squares[index].classList.remove('snake'));
    //remove the apple
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2,1,0];
    score = 0;
    //re add new score to browser
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApples();
    //readd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, intervalTime);
}

// GETTING OUR SNAKE TO MOVE
function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timerId,gameOver());
    //remove last element from our currentSnake array
    const tail = currentSnake.pop();
    //remove styling from last element
    squares[tail].classList.remove('snake');
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple');
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake');
        //grow our snake array
        currentSnake.push(tail);
        //generate new apple
        generateApples()
        //add one to the score
        score += 1;
        //display our score
        scoreDisplay.textContent = score;
        //speed up our snake
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
    }
    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake');
}

// CREATING AN APPLE and GETTING IT TO APPER ON A RANDOM FIELD

function generateApples(){
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while(squares[appleIndex].classList.contains('snake')) 
        squares[appleIndex].classList.add('apple');
}

generateApples();

// CONTROLING OUR SNAKE
    
function control(e){
    if (e.key === "ArrowLeft"){
        direction = -1;
    
    } else if (e.key === "ArrowUp"){
        direction = -width;
        

    } else if (e.key === "ArrowRight"){
        direction = 1;
        
    
    } else if (e.key === "ArrowDown"){
        direction = +width;
       
    }}

function gameOver(){
      //remove the snake
      currentSnake.forEach(index => squares[index].classList.remove('snake'));
      //remove the apple
      squares[appleIndex].classList.remove('apple');
    //   adding a new title
      let newTitle = 'Game Over!';
    //   displaying the new title
      titleDisplay.textContent = newTitle;
}

document.addEventListener('keyup',control);






