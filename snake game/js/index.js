let inputDir = {x:0,y:0};
let speed = 10;
let lastPastTime = 0;
let snakeArr = [{x:9,y:9}];
let snakeElement = 0;
let foodElement = 0;
let food = {x:5,y:10};
let score = 0;


//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPastTime)/1000<1/speed){
        return;
    }
    lastPastTime = ctime;
    gameEngine();
}





function isCollide(snake){
    //making snake body solid
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){
        return true;
    }
}






function gameEngine(){
    //part 1
    if(isCollide(snakeArr)){
        inputDir = {x:0,y:0};
        alert("Game Over , press any key to play again!");
        snakeArr=[{x:9,y:9}];
        score = 0;
    }

    //food random position
    if(snakeArr[0].y === food.y && snakeArr[0].x===food.x){
        score++;
        scoreBox.innerHTML = "Score: " + score;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML = "High score: " + hiscoreval;
            
        }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y+inputDir.y});
        let a = 2;
        let b = 16;
        //console.log(score);
        //food = {x: Math.round(a+(b-a)*Math.round()),y: Math.round(a+(b-a)*Math.round())};
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
      // console.log(food);
    }

    //speed increase

    //moving snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}










//logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiScoreBox.innerHTML = "High score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1}//start game
    switch(e.key){
        case "ArrowUp":
            console.log("up")
            inputDir.x = 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("down")
            inputDir.x = 0;
            inputDir.y= +1;
            break;
        case "ArrowLeft":
            console.log("left")
            inputDir.x = -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("right")
            inputDir.x = +1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
});