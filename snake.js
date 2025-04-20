var size = 15;
var timer;
var block;
var direction = "up";
var segment;
var growing = false;
var snake = [];
var counter = -1;

// snake[0]= block;


function drawGrid() {
    for (var i = 0; i < size; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < size; j++) {
            var cell = document.createElement("td");
            row.appendChild(cell);
        }
        document.getElementById("grid").appendChild(row);
    }
}

function load() {
    drawGrid();
    block = { x: size / 2, y: size / 2 };
    snake = [ { x: block.x, y: block.y } ]; 
    drawSnake();
}

function drawSnake() {
    var parent = document.getElementById("grid");

    // Clear the entire grid
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            parent.rows[i].cells[j].style.backgroundColor = "#112A12";
        }
    }

    // Draw the food
    parent.rows[segment.y].cells[segment.x].style.backgroundColor = "red";

    // Draw the snake
    for (var i = 0; i < snake.length; i++) {
        parent.rows[snake[i].y].cells[snake[i].x].style.backgroundColor =
            i === 0 ? "white" : "green";
    }
}



window.onload = load;

function start() {
    clearInterval(timer); // Clear any existing timer
    clearGrid(); // Clear grid before restarting

    // Reset direction, block, snake
    direction = "up";
    block = { x: Math.floor(size / 2), y: Math.floor(size / 2) };
    snake = [ { x: block.x, y: block.y } ];
    growing = false;

    createSegment(); // Create new food
    drawSnake(); // Draw initial state

    document.addEventListener("keydown", checkKey);
    timer = setInterval(move, 250);
}

function move() {
    var parent = document.getElementById("grid");
    parent.rows[block.y].cells[block.x].style.backgroundColor = "#112A12";

    if (growing) {
        var newSegment = { ...snake[snake.length - 1] };
        snake.push(newSegment);
        growing = false;
    }


    for (var i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }

    switch (direction) {
        case "up":
            block.y--;
            break;
        case "down":
            block.y++;
            break;
        case "left":
            block.x--;
            break;
        case "right":
            block.x++;
            break;
    }

    if (block.x < 0) {
        block.x = size - 1;
    } else if (block.y < 0) {
        block.y = size - 1;
    } else if (block.y >= size) {
        block.y = 0;
    } else if (block.x >= size) {
        block.x = 0;
    }

    snake[0].x = block.x;
    snake[0].y = block.y;

    drawSnake();
    checkSegment();
    gameOver();
}


function checkKey(e) {
    if (e.keyCode == '38') {
        direction = "up";
    }
    else if (e.keyCode == '40') {
        direction = "down";
    }
    else if (e.keyCode == '37') {
        direction = "left";
    }
    else if (e.keyCode == '39') {
        direction = "right";
    }
}


function createSegment() {
    var x2 = Math.floor(Math.random() * size);
    var y2 = Math.floor(Math.random() * size);

    segment = { x: x2, y: y2 };
    var parent = document.getElementById("grid");
    parent.rows[y2].cells[x2].style.backgroundColor = "red";
    counter++;
    document.getElementById("counter").innerHTML= counter;
}


function checkSegment() {
    if (snake[0].x == segment.x && snake[0].y == segment.y) {
        createSegment();
        growing = true;
    }
}

function clearGrid() {
    var parent = document.getElementById("grid");
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            parent.rows[i].cells[j].style.backgroundColor = "#112A12";
        }
    }
}

function gameOver(){
    for(var i = 1; i < snake.length; i++){
        if(snake[0].x==snake[i].x && snake[0].y==snake[i].y){
            alert("GAME OVER!");
            clearInterval(timer); 
            document.removeEventListener("keydown", checkKey);
            clearGrid();
            snake = [];
            counter = -1;
        }
    }
}