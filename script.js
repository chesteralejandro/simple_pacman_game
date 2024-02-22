const pacmanFigure = document.querySelector('.pacman__design');
const ghostFigures = document.querySelectorAll('.ghost');
const score = document.querySelector('#score');
const coins = document.querySelector('#coins');

const worlds = [
    [   
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2],
        [2, 0, 2, 3, 3, 0, 3, 3, 3, 0, 2, 0, 3, 3, 3, 0, 3, 3, 2, 0, 2],
        [2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 2],
        [2, 0, 1, 0, 2, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 0, 1, 0, 2],
        [2, 1, 2, 1, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 2, 1, 2, 1, 2],
        [3, 0, 2, 0, 1, 1, 1, 3, 3, 2, 0, 2, 3, 3, 1, 1, 1, 0, 2, 0, 3],
        [0, 1, 0, 1, 3, 3, 0, 2, 0, 1, 0, 1, 0, 2, 0, 3, 3, 1, 0, 1, 0],
        [3, 0, 2, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 0, 2, 0, 3],
        [2, 1, 2, 1, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 2, 1, 2, 1, 2],
        [2, 0, 1, 0, 2, 2, 0, 3, 3, 3, 3, 3, 3, 3, 0, 2, 2, 0, 1, 0, 2],
        [2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 2],
        [2, 0, 2, 3, 3, 0, 0, 3, 3, 3, 2, 3, 3, 3, 0, 0, 3, 3, 2, 0, 2],
        [2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ],
    [   
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2],
        [2, 0, 2, 3, 1, 0, 3, 3, 3, 0, 2, 0, 3, 3, 3, 0, 1, 3, 2, 0, 2],
        [2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 2],
        [2, 0, 1, 0, 3, 3, 1, 3, 3, 3, 0, 3, 3, 3, 1, 2, 2, 0, 1, 0, 2],
        [2, 0, 0, 1, 3, 3, 0, 2, 1, 0, 0, 1, 0, 1, 0, 2, 2, 1, 0, 0, 2],
        [2, 1, 2, 0, 1, 1, 1, 3, 3, 2, 0, 2, 3, 3, 1, 1, 1, 0, 2, 1, 2],
        [2, 0, 2, 1, 3, 3, 3, 0, 0, 1, 0, 1, 0, 2, 0, 3, 3, 1, 2, 0, 2],
        [2, 0, 2, 0, 1, 1, 1, 3, 3, 3, 0, 3, 3, 3, 1, 1, 1, 0, 2, 0, 2],
        [2, 1, 0, 1, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 3, 1, 0, 1, 2],
        [2, 0, 1, 0, 2, 2, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 1, 0, 2],
        [2, 1, 2, 1, 0, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1, 2, 1, 2],
        [2, 0, 2, 3, 3, 0, 0, 3, 3, 3, 0, 3, 3, 3, 0, 0, 3, 3, 2, 0, 2],
        [2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ],
    [   
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [3, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3],
        [3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3],
        [3, 1, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 1, 3],
        [3, 1, 3, 1, 0, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 0, 1, 3, 1, 3],
        [3, 1, 3, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 3, 1, 3],
        [0, 1, 3, 1, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0, 1, 3, 1, 0],
        [0, 1, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 1, 0],
        [3, 1, 3, 1, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0, 1, 3, 1, 3],
        [3, 1, 3, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 3, 1, 3],
        [3, 1, 3, 1, 0, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 0, 1, 3, 1, 3],
        [3, 1, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 1, 3],
        [3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3],
        [3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ],
    [   
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 3],
        [2, 1, 0, 0, 3, 3, 3, 3, 3, 1, 0, 0, 3, 3, 3, 3, 3, 0, 0, 1, 2],
        [2, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1, 2],
        [2, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1, 2],
        [2, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 2, 3, 3, 3, 3, 3, 2, 0, 1, 2],
        [0, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 0],
        [2, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 2],
        [2, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 2],
        [2, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 2],
        [2, 1, 0, 0, 3, 3, 3, 3, 3, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 2],
        [3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ]
];

let worldRange = worlds.length - 1;
// Randomly selects a stage on the first load.
let realm = Math.round(Math.random() * worldRange);
// Set the outer array into the world variable to make it shorter.
let world = worlds[realm];
let coinCount = 0;
let points = 0;

let ghosts = [{ top: 7, left: 9}, { top: 7, left: 11}, { top: 7, left: 11}];
let ghostsSpeed = 300;
let isScared = false;

let pacman = { top: 1, left: 1, degree: 0 };
let up = false;
let down = false;
let left = false;
let right = false;

function changeRealm() {
    realm++;
    if(realm >= worlds.length) {
        realm = 0;
    }
    world = worlds[realm];
}

function displayWorld() {
    let output = "";
    for(let i = 0; i < world.length; i++){
        output += "<div class='row'>";
        for(let ii = 0; ii < world[i].length; ii++) {
            if(world[i][ii] == 3) {
                output += '<div class="brickH"></div>';
            } else if(world[i][ii] == 2) {
                output += '<div class="brickV"></div>';
            } else if(world[i][ii] == 1) {
                output += '<div class="coin__div"><img class="coin" src="./image/Coins.gif"></div>';
            } else if(world[i][ii] == 0 || world[i][ii] == 10){
                output += '<div class="empty"></div>';
            } else if(world[i][ii] == 4){
                output += '<div class="cherry"></div>';
            }
        }
        output += "</div>";
    }
    document.querySelector('.world').innerHTML = output;
}

function countCoin() {
    for(let i = 0; i < world.length; i++){
        for(let ii = 0; ii < world[i].length; ii++) {
            //If there is no coin place some coins again, and increase the speed ofz
            if(world[i][ii] == 10) {
                world[i][ii] = 1;
            }
            //Count the remaining coins then display it.
            if(world[i][ii] == 1) {
                coinCount++;
                coins.innerText = coinCount;
            }
        }
    }
}
// Initially count all the coins in the current stage.
countCoin();

//=========================== CHERRY =================================//
const setCherry = setInterval(function(){
    let xCherry =  Math.floor(Math.random() * 18) + 1;
    let yCherry =  Math.floor(Math.random() * 13) + 1;
    // If the selected axis for the cherry is an empty space, then put a cherry.
    if(world[yCherry][xCherry]  == 0){
        world[yCherry][xCherry] = 4;
        // After 2.9 seconds the cherry will turn back into an empty space.
        setTimeout(() => world[yCherry][xCherry] = 0, 2900);
    }
}, 3000);


//=========================== GHOSTS =================================//
function displayGhosts(){
    for(let i = 0; i < ghostFigures.length; i++) {
        ghostFigures[i].style.top = ghosts[i].top * 30 + "px";
        ghostFigures[i].style.left = ghosts[i].left * 30 + "px";
    }
}

function scaredGhosts() {
    isScared = true;
    for(let i = 0; i < ghostFigures.length; i++) {
        ghostFigures[i].classList.add('scared');
    }
    setTimeout(function() {
        for(let i = 0; i < ghostFigures.length; i++) {
            ghostFigures[i].classList.remove('scared');
        }
        isScared = false;
    }, 6000);
}

function moveGhosts(){
    for(let i = 0; i < ghosts.length; i++) {
        // Returns a random integer from 1 to 4
        let vertical = Math.round(Math.random() * 4) + 1;
        let horizontal =  Math.round(Math.random() * 4) + 1;
        
        // Chase PACMAN if near Vertically
        if(pacman.top - ghosts[i].top < 0 && pacman.top - ghosts[i].top > -5 && ghosts[i].left > 0 && ghosts[i].left < 20) {
            vertical = isScared == false ? 1 : 4;
        } else if (pacman.top - ghosts[i].top > 0  && pacman.top - ghosts[i].top < 5 && ghosts[i].left > 0 && ghosts[i].left < 20) {
            vertical = isScared == false ? 4 : 1;
        }
        // Chase PACMAN if near Horizontally
        if(pacman.left - ghosts[i].left < 0 && pacman.left - ghosts[i].left > -5) {
            horizontal = isScared == false ? 1 : 4;
        } else if(pacman.left - ghosts[i].left > 0 && pacman.left - ghosts[i].left < 5) {
            horizontal = isScared == false ? 4 : 1;
        }
        // When a GHOST catches PACMAN the game is OVER!!!
        if(isScared == false && ghosts[i].top == pacman.top && ghosts[i].left == pacman.left) {
            clearInterval(move);
            clearInterval(setWorld);
            clearInterval(setCherry);
            document.querySelector('h1').style.display = "grid";
        }
        
        // Ghosts wil be scared when Pacman gets the cherry
        if(isScared == true && ghosts[i].top == pacman.top && ghosts[i].left == pacman.left) {
            // Pacman gets 10 points when he catches a ghost while it is scared.
            points += 10;
            new Audio('/sound/catch_ghost.mp3').play();
            score.innerText = points;
            ghosts[i].top = 7;
            ghosts[i].left = 8;
            ghostFigures[i].classList.remove('scared');
            ghostFigures[i].classList.add('eyes');
            setTimeout(() => document.getElementsByClassName('eyes')[0].classList.remove('eyes'), 300);
        }

        // Ghosts move Vertically
        if ((vertical == 1 || vertical == 2) && world[ghosts[i].top-1][ghosts[i].left] != 3 && world[ghosts[i].top-1][ghosts[i].left] != 2) {
            ghosts[i].top--;
        } else if ((vertical == 3 || vertical == 4) && world[ghosts[i].top+1][ghosts[i].left] != 3 && world[ghosts[i].top+1][ghosts[i].left] != 2){
            ghosts[i].top++;
        }
        // Ghosts move Horizontally
        if ((horizontal == 1 || horizontal == 2) && world[ghosts[i].top][ghosts[i].left-1] != 3 && world[ghosts[i].top][ghosts[i].left-1] != 2) {
            ghosts[i].left--;
        } else if ((horizontal == 3 || horizontal == 4) && world[ghosts[i].top][ghosts[i].left+1] != 3 && world[ghosts[i].top][ghosts[i].left+1] != 2) {
            ghosts[i].left++;
        }

        // When GHOSTS go into the portal
        if(ghosts[i].left < 0) {
            ghostFigures[i].style.transition = "none";
            ghosts[i].left = 20;
            ghostFigures[i].style.left = ghosts[i].left * 30 + "px";
        } else if(ghosts[i].left > 20) {
            ghostFigures[i].style.transition = "none";
            ghosts[i].left = 0;
            ghostFigures[i].style.left = ghosts[i].left * 30 + "px";
        } else {
            ghostFigures[i].style.transition = "top 500ms ease, left 500ms ease";
        }
    }
    displayGhosts();
}
const move = setInterval(moveGhosts, ghostsSpeed);

//=========================== PACMAN =================================//
const setWorld = setInterval(function(){
    movePacman();
    displayPacman();
    displayWorld();
}, 150)

function displayPacman(){
    pacmanFigure.style.top = pacman.top * 30 + "px";
    pacmanFigure.style.left = pacman.left * 30 + "px";
    pacmanFigure.style.transform = "rotateZ(" + pacman.degree +"deg)";
}

function  movePacman() {
    if(up == true && world[pacman.top-1][pacman.left] != 3 && world[pacman.top-1][pacman.left] != 2) {
        pacman.top--;
        pacman.degree = -90;
    } else if(down == true && world[pacman.top+1][pacman.left] != 3 && world[pacman.top+1][pacman.left] != 2) {
        pacman.top++;
        pacman.degree = 90;
    } else if(left == true && world[pacman.top][pacman.left-1] != 3 && world[pacman.top][pacman.left-1] != 2) {
        pacman.left--;
        pacman.degree = 180;
    } else if(right == true && world[pacman.top][pacman.left+1] != 3 && world[pacman.top][pacman.left+1] != 2) {
        pacman.left++;
        pacman.degree = 0;
    }
    //=======================================//
    // When PACMAN get COINS
    if(world[pacman.top][pacman.left] == 1) {
        world[pacman.top][pacman.left] = 10;
        new Audio('/sound/pac_chomp.wav').play();
        points += 10;
        score.innerText = points;
        coinCount--;
        coins.innerText = coinCount;
        // If pacman finishes the current stage.
        if(coinCount == 0) {
            // Set the stage
            changeRealm();
            // Set Pacman
            pacman = { top: 1, left: 1, degree: 180 };
            up = false;
            down = false;
            left = false;
            right = false;
            pacmanFigure.style.display = "none";
            setTimeout(() => pacmanFigure.style.display = "block", 100);
            // Set Ghosts
            isScared = false;
            ghosts[0] = { top: 7, left: 9};
            ghosts[1] = { top: 7, left: 11};
            ghosts[2] = { top: 7, left: 11};
            for(let i = 0; i < ghostFigures.length; i++) {
                ghostFigures[i].style.transition = "none";
            }
            displayGhosts();
            // Set the Coins
            countCoin();
        } else {
            pacmanFigure.style.transition = "top 260ms ease, left 260ms ease";
            for(let i = 0; i < ghostFigures.length; i++) {
                ghostFigures[i].style.transition = "top 500ms ease, left 500ms ease";
            }
        }
    }
    // When PACMAN get CHERRY
    if(world[pacman.top][pacman.left] == 4) {
        world[pacman.top][pacman.left] = 0;
        new Audio('/sound/cherry.mp3').play();
        points += 20;
        score.innerText = points;
        scaredGhosts();
    }
    // When PACMAN go into the portal
    if(pacman.left < 0){ //-1
        pacman.left = 21;
        pacmanFigure.style.transition = "none";
        pacmanFigure.style.left = pacman.left * 30 + "px";
    } else if(pacman.left > 20){ //21
        pacman.left = -1;
        pacmanFigure.style.transition = "none";
        pacmanFigure.style.left = pacman.left * 30 + "px";
    } else {
        pacmanFigure.style.transition = "top 260ms ease, left 260ms ease";
    }
}

// Set the key code and never let Pacman change direction when he is beside a wall
document.onkeyup = function(e) {
        // KEY UP
    if (e.keyCode == 38 && world[pacman.top-1][pacman.left] != 3 && world[pacman.top-1][pacman.left] != 2 && pacman.left > 0 && pacman.left < 20) { 
        up = true;
        down = false;
        left = false;
        right = false;
    }   // KEY DOWN
    else if(e.keyCode == 40 && world[pacman.top+1][pacman.left] != 3 && world[pacman.top+1][pacman.left] != 2 && pacman.left > 0 && pacman.left < 20) {
        up = false;
        down = true;
        left = false;
        right = false;
    }   // KEY LEFT
    else if(e.keyCode == 37 && world[pacman.top][pacman.left-1] != 3 && world[pacman.top][pacman.left-1] != 2) { 
        up = false;
        down = false;
        left = true;
        right = false;
    }   // KEY RIGHT
    else if(e.keyCode == 39 && world[pacman.top][pacman.left+1] != 3 && world[pacman.top][pacman.left+1] != 2) {
        up = false;
        down = false;
        left = false;
        right = true;
    } 
}