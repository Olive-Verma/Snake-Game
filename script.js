const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let box = 20;

let snake = [{x:200, y:200}];

let food = {
x: Math.floor(Math.random()*19)*box,
y: Math.floor(Math.random()*19)*box
};

let dx = box;
let dy = 0;

let score = 0;

let gameTime = 180; // 3 minutes

document.addEventListener("keydown", direction);

function direction(event){

if(event.key === "ArrowLeft" && dx === 0){
dx = -box;
dy = 0;
}

else if(event.key === "ArrowUp" && dy === 0){
dx = 0;
dy = -box;
}

else if(event.key === "ArrowRight" && dx === 0){
dx = box;
dy = 0;
}

else if(event.key === "ArrowDown" && dy === 0){
dx = 0;
dy = box;
}

}

function draw(){

ctx.fillStyle = "black";
ctx.fillRect(0,0,400,400);

for(let i=0;i<snake.length;i++){
ctx.fillStyle = "lime";
ctx.fillRect(snake[i].x, snake[i].y, box, box);
}

ctx.fillStyle = "red";
ctx.fillRect(food.x, food.y, box, box);

let headX = snake[0].x + dx;
let headY = snake[0].y + dy;

/* WALL WRAP */
if(headX >= 400) headX = 0;
if(headX < 0) headX = 380;
if(headY >= 400) headY = 0;
if(headY < 0) headY = 380;

/* FOOD */
if(headX === food.x && headY === food.y){

score++;
document.getElementById("score").innerHTML = "Score: " + score;

food = {
x: Math.floor(Math.random()*19)*box,
y: Math.floor(Math.random()*19)*box
};

}else{
snake.pop();
}

let newHead = {
x: headX,
y: headY
};

snake.unshift(newHead);

}

/* GAME LOOP */
let game = setInterval(draw,120);

/* TIMER */
let timer = setInterval(function(){

gameTime--;

if(gameTime <= 0){

clearInterval(game);
clearInterval(timer);

alert("Time Up! Your Score: " + score);

}

},1000);
