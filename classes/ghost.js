const directions = ["up", "down", "left", "right"];

export default class Ghost {
	constructor(x, y, name) {
		this.name = name;
		this.x = x;
		this.initialX = x;
		this.initialY = y;
		this.y = y;
		this.size = 30;
		this.isScared = false;
	}

	moveUp() {
		this.y--;
	}

	moveDown() {
		this.y++;
	}

	moveLeft() {
		this.x--;
	}

	moveRight() {
		this.x++;
	}

	setHorizontalAxis(xAxis) {
		this.x = xAxis;
	}

	setIsScared(scareStatus) {
		this.isScared = scareStatus;
	}

	backToBase() {
		this.x = 8;
		this.y = 7;
	}

	resetStatus() {
		this.x = this.initialX;
		this.y = this.initialY;
		this.isScared = false;
	}
}
