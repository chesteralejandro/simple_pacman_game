export default class Ghost {
	constructor(x, y, name, path) {
		this.name = name;
		this.x = x;
		this.initialX = x;
		this.initialY = y;
		this.y = y;
		this.size = 38;
		this.isScared = false;
		this.pathCount = 0;
		this.path = path;
		this.figure = document.querySelector(`.${name}__design`);
	}

	backToBase() {
		this.x = 8;
		this.y = 7;
	}

	changePath(availablePaths) {
		const newPathIndex = Math.floor(Math.random() * availablePaths.length);
		this.setPath(availablePaths[newPathIndex].path);
	}

	decidePath(availablePaths) {
		const newPathIndex = Math.floor(Math.random() * availablePaths.length);
		const newPath = availablePaths[newPathIndex];
		const numberProbability = 6;
		const decisionRoll = Math.floor(Math.random() * numberProbability + 1);
		const numberToChangePath = 3;
		this.setPath(
			decisionRoll == numberToChangePath ? newPath.path : this.path
		);
	}

	moveDown() {
		this.y++;
	}

	moveLeft() {
		this.x--;
	}

	moveUp() {
		this.y--;
	}

	moveRight() {
		this.x++;
	}

	resetStatus() {
		this.x = this.initialX;
		this.y = this.initialY;
		this.isScared = false;
	}

	setHorizontalAxis(xAxis) {
		this.x = xAxis;
	}

	setIsScared(scareStatus) {
		this.isScared = scareStatus;
	}

	setPath(newPath) {
		this.path = newPath;
	}

	setSize(newSize) {
		this.size = newSize;
	}
}
