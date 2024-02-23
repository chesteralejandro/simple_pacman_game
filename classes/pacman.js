export default class Pacman {
	constructor() {
		this.x = 1;
		this.y = 1;
		this.z = 0;
		this.size = 30;
		this.points = 0;
		this.coinCount = 0;
		this.moveKey = "Freeze";
	}

	addPoints(points) {
		this.points += points;
	}

	moveUp() {
		this.y--;
		this.z = -90;
	}

	moveDown() {
		this.y++;
		this.z = 90;
	}

	moveLeft() {
		this.x--;
		this.z = 180;
	}

	moveRight() {
		this.x++;
		this.z = 0;
	}

	setMoveKey(move) {
		this.moveKey = move;
	}

	setHorizontalAxis(xAxis) {
		this.x = xAxis;
	}

	setCoinCount(coinCount) {
		this.coinCount = coinCount;
	}

	resetStatus() {
		this.x = 1;
		this.y = 1;
		this.z = 180;
		this.moveKey = "Freeze";
	}
}
