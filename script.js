var pacman = document.querySelector('.pacman__design');
var score = document.querySelector('.score');
var ghosts = document.querySelectorAll('.ghost');
var world = [
[   [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
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
[   [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
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
[   [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
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
[   [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
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

var realm = Math.round(Math.random() * 3);
function changeRealm() {
    realm++;
    if(realm >= 4) {
        realm = 0;
    }
}

var output = "";
function displayWorld(realm) {
    output = "";
    for(var i = 0; i < world[realm].length; i++){
        output += "<div class='row'>";
        for(var ii = 0; ii < world[realm][i].length; ii++) {
            if(world[realm][i][ii] == 3) {
                output += '<div class="brickH"></div>';
            }  else if(world[realm][i][ii] == 2) {
                output += '<div class="brickV"></div>';
            } else if(world[realm][i][ii] == 1) {
                output += '<div class="coin__div"><img class="coin" src="./image/Coins.gif"></div>';
            } else if(world[realm][i][ii] == 0){
                output += '<div class="empty"></div>';
            } else if(world[realm][i][ii] == 4){
                output += '<div class="cherry"></div>';
            }
        }
        output += "</div>";
    }
    document.querySelector('.world').innerHTML = output;
}
displayWorld(realm);

var coinCount = 0;
function countCoin() {
    for(var i = 0; i < world[realm].length; i++){
        for(var ii = 0; ii < world[realm][i].length; ii++) {
            if(world[realm][i][ii] == 1) {
                coinCount++;
                document.getElementById('coins').innerText = coinCount;
            }
        }
    }
}
countCoin();

//This is for the CHERRY
var xCherry = 0;
var yCherry = 0;
const setCherry = setInterval(function(){
    xAxis =  Math.floor(Math.random() * 18) + 1;
    yAxis =  Math.floor(Math.random() * 13) + 1;
    if(world[realm][yAxis][xAxis]  == 0){
        world[realm][yAxis][xAxis] = 4;
        setTimeout(function(){
            if(world[realm][yAxis][xAxis]  == 4){
                world[realm][yAxis][xAxis] = 0;
            }
        }, 2900)
    }
    displayWorld(realm);  
}, 3000);


//========GHOSTS=======//
var ghostsObject = [{ top: 7, left: 9}, { top: 7, left: 11}, { top: 7, left: 11}];

function displayGhosts(){
    for(var i = 0; i < ghosts.length; i++) {
        ghosts[i].style.top = ghostsObject[i].top * 30 + "px";
        ghosts[i].style.left = ghostsObject[i].left * 30 + "px";
    }
}

var isScared = false;
function scaredGhosts() {
    isScared = true;
    for(var i = 0; i < ghosts.length; i++) {
        ghosts[i].classList.add('scared');
    }
    setTimeout(function() {
        isScared = false;
        for(var i = 0; i < ghosts.length; i++) {
            ghosts[i].classList.remove('scared');
        }
    }, 6000);
}

function moveGhosts(){
    for(var i = 0; i < ghostsObject.length; i++) {
        var top = 0;
        var left = 0;
        left = Math.round(Math.random() * 4) + 1;
        top = Math.round(Math.random() * 4) + 1;  // returns a random integer from 1 to 4
        if(isScared == false) {
            // Chase PACMAN if near Vertically
            if(pacmanObj.top - ghostsObject[i].top < 0 && pacmanObj.top - ghostsObject[i].top > -5) {
                top = 1;
            } else if (pacmanObj.top - ghostsObject[i].top > 0  && pacmanObj.top - ghostsObject[i].top < 5) {
                top = 4;
            }
            // Chase PACMAN if near Horizontally
            if(pacmanObj.left - ghostsObject[i].left < 0 && pacmanObj.left - ghostsObject[i].left > -5) {
                left = 1;
            } else if(pacmanObj.left - ghostsObject[i].left > 0 && pacmanObj.left - ghostsObject[i].left < 5) {
                left = 4;
            }
            // When the GHOSTS catches you, your points will be deducted 50
            if(ghostsObject[i].top == pacmanObj.top && ghostsObject[i].left == pacmanObj.left) {
                // points -= 50;
                // score.innerText = points;
                clearInterval(move);
                clearInterval(setWorld);
                clearInterval(setCherry);
                document.querySelector('p').style.display = "block";
            }
        }
        // Ghosts wil be scared when Pacman gets the cherry
        if(isScared == true) {
            if(pacmanObj.top - ghostsObject[i].top < 0 && pacmanObj.top - ghostsObject[i].top > -5) {
                top = 4;
            } else if (pacmanObj.top - ghostsObject[i].top > 0  && pacmanObj.top - ghostsObject[i].top < 5) {
                top = 1;
            }
            if(pacmanObj.left - ghostsObject[i].left < 0 && pacmanObj.left - ghostsObject[i].left > -5) {
                left = 4;
            } else if(pacmanObj.left - ghostsObject[i].left > 0 && pacmanObj.left - ghostsObject[i].left < 5) {
                left = 1;
            }
            if(ghostsObject[i].top == pacmanObj.top && ghostsObject[i].left == pacmanObj.left) {
                points += 10;
                score.innerText = points;
                ghostsObject[i].top = 7;
                ghostsObject[i].left = 8;
                ghosts[i].classList.remove('scared');
                ghosts[i].classList.add('eyes');
                setTimeout(() => {
                    var eyes = document.getElementsByClassName('eyes');
                    if(eyes.length > 0) {
                        eyes[0].classList.remove('eyes');
                    }
                }, 300);
            }
        } // Ghosts move away from Pacman
        if ((top == 1 || top == 2) && world[realm][ghostsObject[i].top-1][ghostsObject[i].left] != 3 && world[realm][ghostsObject[i].top-1][ghostsObject[i].left] != 2) {
            ghostsObject[i].top--;
        } else if ((top == 3 || top == 4) && world[realm][ghostsObject[i].top+1][ghostsObject[i].left] != 3 && world[realm][ghostsObject[i].top+1][ghostsObject[i].left] != 2){
            ghostsObject[i].top++;
        }
        if ((left == 1 || left == 2) && world[realm][ghostsObject[i].top][ghostsObject[i].left-1] != 3 && world[realm][ghostsObject[i].top][ghostsObject[i].left-1] != 2) {
            ghostsObject[i].left--;
        } else if ((left == 3 || left == 4) && world[realm][ghostsObject[i].top][ghostsObject[i].left+1] != 3 && world[realm][ghostsObject[i].top][ghostsObject[i].left+1] != 2) {
            ghostsObject[i].left++;
        }
        // When GHOSTS go into the portal
        if(ghostsObject[i].left < 0) {
            ghostsObject[i].left = 20;
            if(ghostsObject[i] != 7) {
                ghostsObject[i].top = 7;
            }
            ghosts[i].style.transition = "none";
            ghosts[i].style.left = ghostsObject[i].left * 30 + "px";
        } else if(ghostsObject[i].left > 20) {
            ghostsObject[i].left = 0;
            if(ghostsObject[i] != 7) {
                ghostsObject[i].top = 7;
            }
            ghosts[i].style.transition = "none";
            ghosts[i].style.left = ghostsObject[i].left * 30 + "px";
        } else {
            ghosts[i].style.transition = "top 500ms ease, left 500ms ease";
        }
    }
    displayGhosts();
}
const move = setInterval(moveGhosts, 300);

//========PACMAN=======//
var pacmanObj = {
    top: 1,
    left: 1,
    degree: 180,
}

const setWorld = setInterval(function(){
    movePacman();
    displayPacman();
    displayWorld(realm);
}, 150)

function displayPacman(){
    pacman.style.top = pacmanObj.top * 30 + "px";
    pacman.style.left = pacmanObj.left * 30 + "px";
    pacman.style.transform = "rotateZ(" + pacmanObj.degree +"deg)";
}

var up = false;
var down = false;
var left = false;
var right = false;
var points = 0
var chomp = document.getElementById('chomp');
function  movePacman() {
    if(up == true && world[realm][pacmanObj.top-1][pacmanObj.left] != 3 && world[realm][pacmanObj.top-1][pacmanObj.left] != 2) {
        pacmanObj.top--;
        pacmanObj.degree = -90;
    } else if(down == true && world[realm][pacmanObj.top+1][pacmanObj.left] != 3 && world[realm][pacmanObj.top+1][pacmanObj.left] != 2) {
        pacmanObj.top++;
        pacmanObj.degree = 90;
    } else if(left == true && world[realm][pacmanObj.top][pacmanObj.left-1] != 3 && world[realm][pacmanObj.top][pacmanObj.left-1] != 2) {
        pacmanObj.left--;
        pacmanObj.degree = 180;
    } else if(right == true && world[realm][pacmanObj.top][pacmanObj.left+1] != 3 && world[realm][pacmanObj.top][pacmanObj.left+1] != 2) {
        pacmanObj.left++;
        pacmanObj.degree = 0;
    }
    //=======================================//
    // When PACMAN get COINS
    if(world[realm][pacmanObj.top][pacmanObj.left] == 1) {
        world[realm][pacmanObj.top][pacmanObj.left] = 0;
        chomp.play();
        points += 10;
        score.innerText = points;
        coinCount--;
        document.getElementById('coins').innerText = coinCount;
        if(coinCount == 0) {
            changeRealm();
            displayWorld(realm);
            pacmanObj = {top: 1, left: 1, degree: 180};
            up = false;
            down = false;
            left = false;
            right = false;
            pacman.style.display = "none";
            setTimeout(function(){
                pacman.style.display = "block";
            },100);
            ghostsObject[0] = { top: 7, left: 9};
            ghostsObject[1] = { top: 7, left: 11};
            ghostsObject[2] = { top: 7, left: 11};
            for(var i = 0; i < ghosts.length; i++) {
                ghosts[i].style.transition = "none";
            }
            displayPacman();
            displayGhosts();
            countCoin();
        } else {
            pacman.style.transition = "top 260ms ease, left 260ms ease";
            for(var i = 0; i < ghosts.length; i++) {
                ghosts[i].style.transition = "top 500ms ease, left 500ms ease";
            }
        }
    }
    // When PACMAN get CHERRY
    if(world[realm][pacmanObj.top][pacmanObj.left] == 4) {
        world[realm][pacmanObj.top][pacmanObj.left] = 0;
        points += 20;
        score.innerText = points;
        scaredGhosts();
    }
    // When PACMAN go into the portal
    if(pacmanObj.left < 0){ //-1
        pacmanObj.left = 21;
        pacman.style.transition = "none";
        pacman.style.left = pacmanObj.left * 30 + "px";
    } else if(pacmanObj.left > 20){ //22
        pacmanObj.left = -1;
        pacman.style.transition = "none";
        pacman.style.left = pacmanObj.left * 30 + "px";
    } else {
        pacman.style.transition = "top 260ms ease, left 260ms ease";
    }
}

document.onkeyup = function(e) {
    // Set the key code and never let Pacman change direction when he is beside a wall
       // KEY UP
    if (e.keyCode == 38 && world[realm][pacmanObj.top-1][pacmanObj.left] != 3 && world[realm][pacmanObj.top-1][pacmanObj.left] != 2) { 
        up = true;
        down = false;
        left = false;
        right = false;
    }   // KEY DOWN
    else if(e.keyCode == 40 && world[realm][pacmanObj.top+1][pacmanObj.left] != 3 && world[realm][pacmanObj.top+1][pacmanObj.left] != 2) {
        up = false;
        down = true;
        left = false;
        right = false;
    }   // KEY LEFT
    else if(e.keyCode == 37 && world[realm][pacmanObj.top][pacmanObj.left-1] != 3 && world[realm][pacmanObj.top][pacmanObj.left-1] != 2) { 
        up = false;
        down = false;
        left = true;
        right = false;
    }   // KEY RIGHT
    else if(e.keyCode == 39 && world[realm][pacmanObj.top][pacmanObj.left+1] != 3 && world[realm][pacmanObj.top][pacmanObj.left+1] != 2) {
        up = false;
        down = false;
        left = false;
        right = true;
    } 
}