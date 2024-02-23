import Ghost from "./classes/ghost.js";
import Pacman from "./classes/pacman.js";
import worlds from "./worlds.js";

const worldContainer = document.querySelector(".world");
const pacmanFigure = document.querySelector(".pacman__design");
const ghostFigures = document.querySelectorAll(".ghost");
const score = document.querySelector("#score");
const coins = document.querySelector("#coins");

const worldsIndexRange = worlds.length - 1;
let worldsIndex = Math.round(Math.random() * worldsIndexRange); // 1-3
let world = worlds[worldsIndex];

const pacman = new Pacman();
const ghosts = [
	new Ghost(8, 7, "clyde"),
	new Ghost(10, 7, "inky"),
	new Ghost(12, 7, "pinky"),
];

const topEdgeofMap = 0;
const bottomEdgeofMap = 14;
const leftEdgeOfMap = 0;
const rightEdgeOfMap = 20;

function changeRealmIndex() {
	worldsIndex++;
	const indexExceedsWorldsCount = worldsIndex >= worlds.length;

	if (indexExceedsWorldsCount) {
		worldsIndex = 0;
	}
	world = worlds[worldsIndex];
}

let ghostsSpeed = 300;

setInterval(() => {
	detectCollision();
	displayWorld();
}, 50);

const gameMovementInterval = setInterval(() => {
	movePacman();
	displayPacman();
}, 150);

const ghostMovementInterval = setInterval(() => {
	moveGhosts();
	displayGhosts();
}, ghostsSpeed);

const spreadCherryInterval = setInterval(spreadCherry, 4000);

function checkBrick(spaceAhead) {
	const brickKeys = [2, 3];
	return brickKeys.includes(spaceAhead);
}

function displayWorld() {
	const ELEMENT_ENUM = {
		0: '<div class="empty"></div>',
		1: '<div class="coin__div"><img class="coin" src="./image/Coins.gif"></div>',
		2: '<div class="brickV"></div>',
		3: '<div class="brickH"></div>',
		4: '<div class="cherry"></div>',
		10: '<div class="empty"></div>',
	};

	let coinCount = 0;
	let worldFigure = "";

	for (let outer in world) {
		worldFigure += "<div class='row'>";
		for (let inner in world[outer]) {
			worldFigure += ELEMENT_ENUM[world[outer][inner]];

			const spaceHasCoin = world[outer][inner] == 1;
			if (spaceHasCoin) {
				coinCount++;
			}
		}
		worldFigure += "</div>";
	}

	coins.innerText = coinCount;
	score.innerText = pacman.points;
	worldContainer.innerHTML = worldFigure;

	const pacmanGotAllCoins = coinCount == 0;
	if (pacmanGotAllCoins) {
		// Set the stage
		changeRealmIndex();
		// Set Pacman
		pacman.resetStatus();
		pacmanFigure.style.display = "none";
		setTimeout(() => (pacmanFigure.style.display = "block"), 100);
		// Set Ghosts
		for (let ghost of ghosts) {
			ghost.resetStatus();
		}
	}
}

function detectCollision() {
	const { x, y } = pacman;
	const pacmanEatsCoin = world[y][x] == 1;
	const pacmanEatsCherry = world[y][x] == 4;
	const emptySpaceDisplay = 0;

	if (pacmanEatsCoin) {
		world[y][x] = emptySpaceDisplay;
		new Audio("/sound/pac_chomp.wav").play();
		pacman.addPoints(10);
	}

	if (pacmanEatsCherry) {
		world[y][x] = emptySpaceDisplay;
		new Audio("/sound/cherry.mp3").play();
		pacman.addPoints(10);
		makeGhostsScared();
	}

	for (let i in ghosts) {
		const { x, y, name, isScared } = ghosts[i];
		const pacmanAndGhostCollided = x == pacman.x && y == pacman.y;

		const pacmanCatchGhost = isScared && pacmanAndGhostCollided;
		const ghostCatchPacman = !isScared && pacmanAndGhostCollided;

		if (pacmanCatchGhost) {
			pacman.addPoints(10);
			new Audio("/sound/catch_ghost.mp3").play();
			ghosts[i].backToBase();

			const ghostFigure = document.querySelector(`.${name}__design`);
			ghostFigure.classList.remove("scared");
			ghostFigure.classList.add("eyes");
			setTimeout(() => {
				const ghost = document.querySelectorAll(".eyes")[0];
				ghost.classList.remove("eyes");
			}, 300);
		}

		if (ghostCatchPacman) {
			clearInterval(ghostMovementInterval);
			clearInterval(gameMovementInterval);
			clearInterval(spreadCherryInterval);
			document.querySelector("h1").style.display = "grid";
		}
	}
}

//=========================== CHERRY =================================//
function spreadCherry() {
	let horizontalSpawnArea = Math.floor(Math.random() * 19) + 1;
	let verticalSpawnArea = Math.floor(Math.random() * 13) + 1;
	const chosenCoordinateIsEmpty =
		world[verticalSpawnArea][horizontalSpawnArea] == 0;
	const cherryDisplay = 4;
	const emptySpaceDisplay = 0;

	if (chosenCoordinateIsEmpty) {
		world[verticalSpawnArea][horizontalSpawnArea] = cherryDisplay;
		setTimeout(() => {
			world[verticalSpawnArea][horizontalSpawnArea] = emptySpaceDisplay;
		}, 3500);
	}
}
//=========================== GHOSTS =================================//
function makeGhostsScared() {
	const secondsToRemoveScaredness = 6000;
	for (let ghost of ghosts) {
		const ghostFigure = document.querySelector(`.${ghost.name}__design`);
		ghostFigure.classList.add("scared");
		ghost.setIsScared(true);
	}
	setTimeout(() => {
		for (let ghost of ghosts) {
			const ghostFigure = document.querySelector(
				`.${ghost.name}__design`
			);
			ghostFigure.classList.remove("scared");
			ghost.setIsScared(false);
		}
	}, secondsToRemoveScaredness);
}

function displayGhosts() {
	for (let i in ghosts) {
		const { x, y, size } = ghosts[i];

		const ghostWentIntoLeftPortal = x < leftEdgeOfMap - 1;
		const ghostWentIntoRightPortal = x > rightEdgeOfMap + 1;
		// 500ms
		let transition = "top 350ms ease, left 350ms ease";

		if (ghostWentIntoLeftPortal) {
			ghosts[i].setHorizontalAxis(rightEdgeOfMap + 1);
			transition = "none";
		} else if (ghostWentIntoRightPortal) {
			ghosts[i].setHorizontalAxis(leftEdgeOfMap - 1);
			transition = "none";
		}

		const attributes = `top: ${y * size}px; left: ${
			x * size
		}px; transition: ${transition}`;
		ghostFigures[i].setAttribute("style", attributes);
	}
}

function moveGhosts() {
	for (let i in ghosts) {
		const { x, y, name, isScared } = ghosts[i];
		// Returns a random integer from 1 to 4
		let vertical = Math.round(Math.random() * 4) + 1;
		let horizontal = Math.round(Math.random() * 4) + 1;

		const insideMapHorizontally = x > leftEdgeOfMap && x < rightEdgeOfMap;
		const verticalGap = pacman.y - y;
		const distanceToDetectAbove = verticalGap < 0 && verticalGap > -5;
		const distanceToDetectBelow = verticalGap > 0 && verticalGap < 5;
		// Chase PACMAN if near Vertically
		if (distanceToDetectAbove && insideMapHorizontally) {
			vertical = isScared ? 4 : 1;
		} else if (distanceToDetectBelow && insideMapHorizontally) {
			vertical = isScared ? 1 : 4;
		}

		const horizontalGap = pacman.x - x;
		const distanceToDetectLeft = horizontalGap < 0 && horizontalGap > -5;
		const distanceToDetectRight = horizontalGap > 0 && horizontalGap < 5;
		// Chase PACMAN if near Horizontally
		if (distanceToDetectLeft) {
			horizontal = isScared ? 4 : 1;
		} else if (distanceToDetectRight) {
			horizontal = isScared ? 1 : 4;
		}

		const aboveIsNotBrick = !checkBrick(world[y - 1][x]);
		const belowIsNotBrick = !checkBrick(world[y + 1][x]);
		const leftIsNotBrick = !checkBrick(world[y][x - 1]);
		const rightIsNotBrick = !checkBrick(world[y][x + 1]);

		// Ghosts move Vertically
		if (
			(vertical == 1 || vertical == 2) &&
			aboveIsNotBrick &&
			insideMapHorizontally
		) {
			ghosts[i].moveUp();
		} else if (
			(vertical == 3 || vertical == 4) &&
			belowIsNotBrick &&
			insideMapHorizontally
		) {
			ghosts[i].moveDown();
		}
		// Ghosts move Horizontally
		if ((horizontal == 1 || horizontal == 2) && leftIsNotBrick) {
			ghosts[i].moveLeft();
		} else if ((horizontal == 3 || horizontal == 4) && rightIsNotBrick) {
			ghosts[i].moveRight();
		}
	}
}

//=========================== PACMAN =================================//
function displayPacman() {
	const pacmanWentIntoLeftPortal = pacman.x < leftEdgeOfMap - 1;
	const pacmanWentIntoRightPortal = pacman.x > rightEdgeOfMap + 1;
	let transition = "top 250ms ease, left 250ms ease";

	if (pacmanWentIntoLeftPortal) {
		pacman.setHorizontalAxis(rightEdgeOfMap + 1);
		transition = "none";
	} else if (pacmanWentIntoRightPortal) {
		pacman.setHorizontalAxis(leftEdgeOfMap - 1);
		transition = "none";
	}

	const { x, y, z, size } = pacman;
	const attributes = `transform: rotateZ(${z}deg); left: ${
		x * size
	}px; top: ${y * size}px; transition: ${transition}`;
	pacmanFigure.setAttribute("style", attributes);
}

function movePacman() {
	const { x, y, moveKey, points } = pacman;

	const aboveIsNotBrick = !checkBrick(world[y - 1][x]);
	const belowIsNotBrick = !checkBrick(world[y + 1][x]);
	const leftIsNotBrick = !checkBrick(world[y][x - 1]);
	const rightIsNotBrick = !checkBrick(world[y][x + 1]);

	const pacmanCanMoveUp = moveKey == "ArrowUp" && aboveIsNotBrick;
	const pacmanCanMoveDown = moveKey == "ArrowDown" && belowIsNotBrick;
	const pacmanCanMoveLeft = moveKey == "ArrowLeft" && leftIsNotBrick;
	const pacmanCanMoveRight = moveKey == "ArrowRight" && rightIsNotBrick;

	if (pacmanCanMoveUp) {
		pacman.moveUp();
	} else if (pacmanCanMoveDown) {
		pacman.moveDown();
	} else if (pacmanCanMoveLeft) {
		pacman.moveLeft();
	} else if (pacmanCanMoveRight) {
		pacman.moveRight();
	}
}

/**
 * Set pacman's direction but never let pacman change direction(freeze) when he is beside a wall.
 * Ex. When he is going up or down beside a right wall, never let pressing right arrow affect him.
 * or this will make him freeze/stop as he is trying to go right even when there is a wall.
 *
 */
document.onkeyup = function ({ key: move }) {
	const { x, y } = pacman;

	const aboveIsNotBrick = !checkBrick(world[y - 1][x]);
	const belowIsNotBrick = !checkBrick(world[y + 1][x]);
	const leftIsNotBrick = !checkBrick(world[y][x - 1]);
	const rightIsNotBrick = !checkBrick(world[y][x + 1]);

	const canMoveUp = move == "ArrowUp" && aboveIsNotBrick;
	const canMoveDown = move == "ArrowDown" && belowIsNotBrick;
	const canMoveLeft = move == "ArrowLeft" && leftIsNotBrick;
	const canMoveRight = move == "ArrowRight" && rightIsNotBrick;
	const locatedInsideMap =
		x > leftEdgeOfMap &&
		x < rightEdgeOfMap &&
		y > topEdgeofMap &&
		y < bottomEdgeofMap;

	const pacmanCanChangeDirection =
		locatedInsideMap &&
		(canMoveUp || canMoveDown || canMoveLeft || canMoveRight);

	if (pacmanCanChangeDirection) {
		pacman.setMoveKey(move);
	}
};
