export default class Pacman {
	constructor() {
		this.x = 1;
		this.y = 1;
		this.z = 0;
		this.size = 38;
		this.points = 0;
		this.coinCount = 0;
		this.moveKey = "Freeze";
		this.figure = document.querySelector(".pacman__design");
	}

	addPoints(points) {
		this.points += points;
	}

	moveDown() {
		this.y++;
		this.z = 90;
	}

	moveLeft() {
		this.x--;
		this.z = 180;
	}

	moveUp() {
		this.y--;
		this.z = -90;
	}

	moveRight() {
		this.x++;
		this.z = 0;
	}

	resetStatus() {
		this.x = 1;
		this.y = 1;
		this.z = 180;
		this.moveKey = "Freeze";
	}

	setCoinCount(coinCount) {
		this.coinCount = coinCount;
	}

	setHorizontalAxis(xAxis) {
		this.x = xAxis;
	}

	setMoveKey(move) {
		this.moveKey = move;
	}

	setSize(newSize) {
		this.size = newSize;
	}
}
