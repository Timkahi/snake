const scoreBlok = document.querySelector('.score');
let score = 0;

const settigs = {
  step: 0,
  maxStep: 6, 
  sizeCell: 15,
  sizeFood: 15,  
};

const snake = {
    x: 145,
    y: 145,
    speedX: settigs.sizeCell,
    speedY: 0,
    taill: [],
    maxataill: 3,
};
const barry = {
    x: 0,
    y: 0,
};
const controls= {
    counter: 0,
    counterAD: 1,
}

let canvas = document.getElementById('board')
let context = canvas.getContext("2d")



function gameLoop () {

    requestAnimationFrame(gameLoop);
    if (++settigs.step < settigs.maxStep) {
        return;
    }
    settigs.step = 0
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawSnake()
    drawBary()
}

function drawSnake () {
    snake.x = snake.x + snake.speedX
    snake.y = snake.y + snake.speedY
    snake.taill.unshift({x: snake.x, y: snake.y})
    spaunBackWall()
    if (snake.taill.length > snake.maxataill) {
       snake.taill.pop()
    }
    snake.taill.forEach((value, index) => {
        
        
        if (index === 0) {
            context.fillStyle = '#eb5757'
        }
        if (index > 0) {
            context.fillStyle = '#72de0d'
        }
        context.fillRect(value.x, value.y, settigs.sizeCell, settigs.sizeCell)
        
        if (value.x === barry.x && value.y === barry.y) {
            snake.maxataill++
            plusScore()
            setRandomBarry()
        }
        for (let i = index + 1; i < snake.taill.length; i++) {
            if (value.x === snake.taill[i].x && value.y === snake.taill[i].y) {
                refrechGame()
            }
        }
    })
    
}

function spaunBackWall (valX, valY) {
    if (snake.x < 0) {
        snake.x = canvas.width - settigs.sizeCell 
    } else if (snake.x >= canvas.width) {
        snake.x = -15
    }
    if (snake.y < 0) {
        snake.y = canvas.height - settigs.sizeCell 
    } else if (snake.y >= canvas.height) {
        snake.y = -15 
    }
}
function refrechGame () {
    alert(`GAME OVER ${score} your score`)
    snake.maxataill = 3;
    score = 0
    snake.taill = []
    plusScore()
    setRandomBarry()
}

function drawBary () {
    context.beginPath()
    context.fillStyle = "#3ceb02"
    context.fillRect(barry.x, barry.y, settigs.sizeFood, settigs.sizeFood)

}

function setRandomBarry () {
    barry.x = getRandomInit(0, canvas.width/settigs.sizeFood) * settigs.sizeFood
    barry.y = getRandomInit(0, canvas.height/settigs.sizeFood) * settigs.sizeFood
}

document.addEventListener('keydown', (e) => {
   
    if (e.code === 'KeyW' && controls.counter === 0) {
        snake.speedX = 0
        snake.speedY = -(settigs.sizeCell)
        console.log(e.code)
        controls.counter = 1
        controls.counterAD = 1
    } else if (e.code === 'KeyS' && controls.counter === 0) {
        snake.speedX = 0
        snake.speedY = (settigs.sizeCell)
        controls.counter = 1
        controls.counterAD = 1
    } else if (e.code === 'KeyA' && controls.counterAD === 1) {
        snake.speedX = -(settigs.sizeCell)
        snake.speedY = 0
        controls.counter = 0
        controls.counterAD = 0
    } else if (e.code === 'KeyD' && controls.counterAD === 1) {
        snake.speedX = settigs.sizeCell
        snake.speedY = 0

        controls.counter = 0
        controls.counterAD = 0
    }
})
function plusScore () {
    score++ 
    drawScore()
}
function drawScore () {
    scoreBlok.innerHTML= score;
}
const getRandomInit = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min)
}
function starSpaunBarry () {
    setRandomBarry()
    drawBary()
}
starSpaunBarry()
gameLoop()