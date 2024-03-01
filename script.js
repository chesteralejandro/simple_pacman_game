import Ghost from "./classes/ghost.js";
import Pacman from "./classes/pacman.js";
import worlds from "./worlds.js";

const worldContainer = document.querySelector(".world");
const score = document.querySelector("#score");
const coins = document.querySelector("#coins");

const pacman = new Pacman();
const ghosts = [
	new Ghost(8, 7, "clyde", "left"),
	new Ghost(10, 7, "inky", "right"),
	new Ghost(12, 7, "pinky", "up"),
];

const topEdgeofMap = 0;
const bottomEdgeofMap = 14;
const leftEdgeOfMap = 0;
const rightEdgeOfMap = 20;

const worldsIndexRange = worlds.length - 1;
let worldsIndex = Math.round(Math.random() * worldsIndexRange); // 1-3
let world = worlds[worldsIndex];

function changeRealmIndex() {
	worldsIndex++;
	const indexExceedsWorldsCount = worldsIndex >= worlds.length;

	if (indexExceedsWorldsCount) {
		worldsIndex = 0;
	}
	world = worlds[worldsIndex];
}

let ghostsSpeed = 270; // 300

setInterval(() => {
	detectCollision();
	displayWorld();
}, 50);

const gameMovementInterval = setInterval(() => {
	movePacman();
	displayPacman();
}, 210); // 150

const ghostMovementInterval = setInterval(() => {
	moveGhosts();
	displayGhosts();
}, ghostsSpeed);

const spreadCherryInterval = setInterval(spreadCherry, 4000);

function checkNotBrick(spaceAhead) {
	const brickKeys = [2, 3];
	return !brickKeys.includes(spaceAhead);
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
		// Reset Pacman
		pacman.resetStatus();
		pacman.figure.style.display = "none";
		setTimeout(() => (pacman.figure.style.display = "block"), 100);
		// Reset Ghosts
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

	for (let ghost of ghosts) {
		const { x, y, name, isScared } = ghost;
		const pacmanAndGhostCollided = x == pacman.x && y == pacman.y;

		const pacmanCatchGhost = isScared && pacmanAndGhostCollided;
		const ghostCatchPacman = !isScared && pacmanAndGhostCollided;

		if (pacmanCatchGhost) {
			pacman.addPoints(10);
			new Audio("/sound/catch_ghost.mp3").play();
			ghost.figure.classList.remove("scared");
			ghost.figure.classList.add("eyes");
			ghost.backToBase();
			ghost.setIsScared(false);
			setTimeout(() => ghost.figure.classList.remove("eyes"), 300);
		}

		if (ghostCatchPacman) {
			clearInterval(ghostMovementInterval);
			clearInterval(gameMovementInterval);
			clearInterval(spreadCherryInterval);
			document.querySelector("dialog").show();
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
		ghost.figure.classList.add("scared");
		ghost.setIsScared(true);
		setTimeout(() => {
			ghost.figure.classList.remove("scared");
			ghost.setIsScared(false);
		}, secondsToRemoveScaredness);
	}
}

function displayGhosts() {
	for (let ghost of ghosts) {
		const ghostWentIntoLeftPortal = ghost.x < leftEdgeOfMap;
		const ghostWentIntoRightPortal = ghost.x > rightEdgeOfMap;
		let transition = "top 350ms ease, left 350ms ease"; // 500ms

		if (ghostWentIntoLeftPortal) {
			ghost.setHorizontalAxis(rightEdgeOfMap + 1);
			transition = "none";
		} else if (ghostWentIntoRightPortal) {
			ghost.setHorizontalAxis(leftEdgeOfMap - 1);
			transition = "none";
		}

		const { x, y, size } = ghost;
		const attributes = `top: ${y * size}px; display: block; 
		left: ${x * size}px; transition: ${transition}`;
		ghost.figure.setAttribute("style", attributes);
	}
}

function moveGhosts() {
	for (let ghost of ghosts) {
		const { x, y, path, pathCount, isScared } = ghost;

		const aboveIsNotBrick = checkNotBrick(world[y - 1][x]);
		const belowIsNotBrick = checkNotBrick(world[y + 1][x]);
		const leftIsNotBrick = checkNotBrick(world[y][x - 1]);
		const rightIsNotBrick = checkNotBrick(world[y][x + 1]);

		const pathChoices = [
			{ status: aboveIsNotBrick, path: "up", isVertical: true },
			{ status: belowIsNotBrick, path: "down", isVertical: true },
			{ status: leftIsNotBrick, path: "left", isHorizontal: true },
			{ status: rightIsNotBrick, path: "right", isHorizontal: true },
		];

		const newAvailablePaths = pathChoices.filter(
			(pathChoice) => pathChoice.status
		);

		if (newAvailablePaths != pathCount) {
			ghost.decidePath(newAvailablePaths);
		}

		const insideMapHorizontally = x > leftEdgeOfMap && x < rightEdgeOfMap;
		const verticalGap = pacman.y - y;
		const distanceToDetectAbove = verticalGap < 0 && verticalGap > -6;
		const distanceToDetectBelow = verticalGap > 0 && verticalGap < 6;
		// Chase PACMAN if near Vertically
		if (distanceToDetectAbove && pacman.x == x) {
			isScared ? ghost.setPath("down") : ghost.setPath("up");
		} else if (distanceToDetectBelow && pacman.x == x) {
			isScared ? ghost.setPath("up") : ghost.setPath("down");
		}

		const horizontalGap = pacman.x - x;
		const distanceToDetectLeft = horizontalGap < 0 && horizontalGap > -6;
		const distanceToDetectRight = horizontalGap > 0 && horizontalGap < 6;
		// Chase PACMAN if near Horizontally
		if (distanceToDetectLeft && pacman.y == y) {
			isScared ? ghost.setPath("right") : ghost.setPath("left");
		} else if (distanceToDetectRight && pacman.y == y) {
			isScared ? ghost.setPath("left") : ghost.setPath("right");
		}

		const pathIsBlocked =
			(path == "up" && !aboveIsNotBrick) ||
			(path == "down" && !belowIsNotBrick) ||
			(path == "left" && !leftIsNotBrick) ||
			(path == "right" && !rightIsNotBrick);

		if (pathIsBlocked) {
			ghost.changePath(newAvailablePaths);
		}

		if (ghost.path == "up" && aboveIsNotBrick && insideMapHorizontally) {
			ghost.moveUp();
		} else if (
			ghost.path == "down" &&
			belowIsNotBrick &&
			insideMapHorizontally
		) {
			ghost.moveDown();
		} else if (ghost.path == "left" && leftIsNotBrick) {
			ghost.moveLeft();
		} else if (ghost.path == "right" && rightIsNotBrick) {
			ghost.moveRight();
		}
	}
}

//=========================== PACMAN =================================//
function displayPacman() {
	const pacmanWentIntoLeftPortal = pacman.x < leftEdgeOfMap;
	const pacmanWentIntoRightPortal = pacman.x > rightEdgeOfMap;
	let transition = "top 260ms ease, left 260ms ease";

	if (pacmanWentIntoLeftPortal) {
		pacman.setHorizontalAxis(rightEdgeOfMap + 1);
		transition = "none";
	} else if (pacmanWentIntoRightPortal) {
		pacman.setHorizontalAxis(leftEdgeOfMap - 1);
		transition = "none";
	}

	const { x, y, z, size } = pacman;
	const attributes = `transform: rotateZ(${z}deg); display: block;
		left: ${x * size}px; top: ${y * size}px; transition: ${transition}`;
	pacman.figure.setAttribute("style", attributes);
}

function checkMobility(moveKey) {
	const { x, y } = pacman;

	const aboveIsNotBrick = checkNotBrick(world[y - 1][x]);
	const belowIsNotBrick = checkNotBrick(world[y + 1][x]);
	const leftIsNotBrick = checkNotBrick(world[y][x - 1]);
	const rightIsNotBrick = checkNotBrick(world[y][x + 1]);

	const pacmanCanMoveUp = moveKey == "ArrowUp" && aboveIsNotBrick;
	const pacmanCanMoveDown = moveKey == "ArrowDown" && belowIsNotBrick;
	const pacmanCanMoveLeft = moveKey == "ArrowLeft" && leftIsNotBrick;
	const pacmanCanMoveRight = moveKey == "ArrowRight" && rightIsNotBrick;

	return {
		pacmanCanMoveUp,
		pacmanCanMoveDown,
		pacmanCanMoveLeft,
		pacmanCanMoveRight,
	};
}

function movePacman() {
	const {
		pacmanCanMoveUp,
		pacmanCanMoveDown,
		pacmanCanMoveLeft,
		pacmanCanMoveRight,
	} = checkMobility(pacman.moveKey);

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
	const {
		pacmanCanMoveUp,
		pacmanCanMoveDown,
		pacmanCanMoveLeft,
		pacmanCanMoveRight,
	} = checkMobility(move);

	const pathIsClear =
		pacmanCanMoveUp ||
		pacmanCanMoveDown ||
		pacmanCanMoveLeft ||
		pacmanCanMoveRight;

	const { x, y } = pacman;

	const locatedInsideMap =
		x > leftEdgeOfMap &&
		x < rightEdgeOfMap &&
		y > topEdgeofMap &&
		y < bottomEdgeofMap;

	const pacmanCanChangeDirection = locatedInsideMap && pathIsClear;

	if (pacmanCanChangeDirection) {
		pacman.setMoveKey(move);
	}
};

function setCharacterSize(screenWidth) {
	const screenIsSmall = screenWidth <= 650;
	const screenIsMedium = screenWidth >= 651 && screenWidth <= 1020;
	let figureSize = 38;

	if (screenIsSmall) {
		figureSize = 22;
	}

	if (screenIsMedium) {
		figureSize = 30;
	}

	pacman.setSize(figureSize);
	for (let ghost of ghosts) {
		ghost.setSize(figureSize);
	}

	displayPacman();
	displayGhosts();
}

window.addEventListener("load", () => {
	const screenWidth = document.querySelector("body").offsetWidth;
	setCharacterSize(screenWidth);
});

window.addEventListener("resize", (event) => {
	const screenWidth = event.target.innerWidth;
	setCharacterSize(screenWidth);
});
