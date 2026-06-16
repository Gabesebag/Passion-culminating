let focusedPlayer = 0; // 0 = none, 1 = player1, 2 = player2
let showPlayer1Saved = false;
let showPlayer2Saved = false;

function Startscreen() {
	if (startscreen == 0) {
		buttonColour = color(200, 200, 200);
		if (mouseX > windowWidth / 2 - 100 && mouseX < windowWidth / 2 + 100 &&
			mouseY > windowHeight / 2 - 50 && mouseY < windowHeight / 2 + 50) {
			buttonColour = color(225, 225, 225);
		}

		const boxWidth = windowWidth * 0.1;
		const boxHeight = windowHeight * 0.1;
		if (player1X === 0) {
			player1X = windowWidth / 2.6;
			player1Y = windowHeight / 2.1;
		}
		if (player2X === 0) {
			player2X = windowWidth / 1.64;
			player2Y = windowHeight / 2.1;
		}

		background("#876B65");
		fill(buttonColour);
		rectMode(CENTER)
		rect(windowWidth / 2, windowHeight / 3, boxWidth, boxHeight, 10);
		fill(255);
		textSize(28);
		textAlign(CENTER, CENTER);
		text("Start", width / 2, height / 3);

		const player1Colour = focusedPlayer === 1 ? color(255, 255, 0) : buttonColour;
		const player2Colour = focusedPlayer === 2 ? color(255, 255, 0) : buttonColour;

		fill(player1Colour);
		rect(player1X, player1Y, boxWidth, boxHeight, 10);
		fill(0);
		textSize(28);
		textAlign(CENTER, CENTER);
		text(player1name || "Type here", player1X, player1Y);
		fill(255);
		textSize(18);
		text("Player 1 name", player1X, windowHeight / 1.8);

		fill(player2Colour);
		rect(player2X, player2Y, boxWidth, boxHeight, 10);
		fill(0);
		textSize(28);
		text(player2name || "Type here", player2X, player2Y);
		fill(255);
		textSize(18);
		text("Player 2 name", player2X, windowHeight / 1.8);

		if (showPlayer1Saved) {
			if (blueplayerx === 0 && blueplayery === 0) {
				blueplayerx = player1X - 80;
				blueplayery = player1Y + boxHeight;
			}

			fill(0, 0, 255);
			rectMode(CENTER);

			// Rotate the blue circle and rectangle
			push();
			translate(blueplayerx, blueplayery);
			rotate(radians(player1Rotation));
			circle(0, -boxWidth / 3, boxWidth / 15);
			rect(0, 0, boxWidth / 3, boxWidth / 3, 0);
			pop();

			// Text stays unrotated here
			fill(255);
			textSize(25);
			textAlign(CENTER, CENTER);
			text(player1name, blueplayerx, blueplayery);
		}

		if (showPlayer2Saved) {
			if (redplayerx === 0 && redplayery === 0) {
				redplayerx = player2X + 40;
				redplayery = player2Y + boxHeight;
			}

			fill(255, 0, 0);
			rectMode(CENTER);

			// Rotate the red circle and rectangle
			push();
			translate(redplayerx, redplayery);
			rotate(radians(player2Rotation));
			circle(0, -boxWidth / 3, boxWidth / 15);
			rect(0, 0, boxWidth / 3, boxWidth / 3, 0);
			pop();

			// Text stays unrotated here
			fill(255);
			textSize(25);
			textAlign(CENTER, CENTER);
			text(player2name, redplayerx, redplayery);
		}

		for (let i = 0; i < barriers.length; i++) {
			barriers[i].draw();
		}
	}
}



function mousePressed() {
	if (startscreen === 0) {
		let boxWidth = windowWidth * 0.1;
	    let boxHeight = windowHeight * 0.1;
		let clickedNameBox = false;

		const startX = windowWidth / 2;
		const startY = windowHeight / 3;

		// if the start button is pressed, switch to arena screen
		if (mouseX >= startX - boxWidth / 2 && mouseX <= startX + boxWidth / 2 &&
			mouseY >= startY - boxHeight / 2 && mouseY <= startY + boxHeight / 2) {
			thisScreen = 1; // Switch to arena screen when the start button is pressed
			startscreen = 1; // keep the start-screen state consistent
			print(thisScreen);
			print("Start button clicked");
			return;
		}

		//check if player 1 name box is clicked
		if (mouseX >= player1X - boxWidth / 2 && mouseX <= player1X + boxWidth / 2 &&
			mouseY >= player1Y - boxHeight / 2 && mouseY <= player1Y + boxHeight / 2) {
			focusedPlayer = 1;
			nameInputFocused = true;
			clickedNameBox = true;
			print("typed/clicked")
		}

		//check if player 2 name box is clicked
		else if (mouseX >= player2X - boxWidth / 2 && mouseX <= player2X + boxWidth / 2 &&
			mouseY >= player2Y - boxHeight / 2 && mouseY <= player2Y + boxHeight / 2) {
			focusedPlayer = 2;
			nameInputFocused = true;
			clickedNameBox = true;
			print("typed/clickedNUMBER2")
		}

		//if clicked outside of player 1 name box and has text in the box, spawn in a blue box for player 1 below player 1 name text
		if (!clickedNameBox && (mouseX < player1X - boxWidth / 2 || mouseX > player1X + boxWidth / 2 ||
			mouseY < player1Y - boxHeight / 2 || mouseY > player1Y + boxHeight / 2)) {
			if (player1name.length > 0) {
				showPlayer1Saved = true;
				blueplayerx = player1X - 80;
				blueplayery = player1Y + boxHeight;
			}
		}

		//if clicked outside of player 2 name box and has text in the box, spawn in a red box for player 2 below player 2 name text
		if (!clickedNameBox && (mouseX < player2X - boxWidth / 2 || mouseX > player2X + boxWidth / 2 ||
			mouseY < player2Y - boxHeight / 2 || mouseY > player2Y + boxHeight / 2)) {
			if (player2name.length > 0) {
				showPlayer2Saved = true;
				redplayerx = player2X + 80;
				redplayery = player2Y + boxHeight;
			}
		}

		if (!clickedNameBox) {
			focusedPlayer = 0;
			nameInputFocused = false;
		}

		for (let i = 0; i < barriers.length; i++) {
			barriers[i].draw();
		}
	}
}

function isBarrierCollision(x, y, width, height, angle) {
	for (let i = 0; i < barriers.length; i++) {
		if (barriers[i].intersectsRect(x, y, width, height, angle)) {
			return true;
		}
	}
	return false;
}

function keyPressed() {
	let boxWidth = windowWidth * 0.1;
	if (nameInputFocused) {
		if (keyCode === BACKSPACE) {
			if (focusedPlayer === 1) {
				player1name = player1name.slice(0, -1);
			} else if (focusedPlayer === 2) {
				player2name = player2name.slice(0, -1);
			}
			return false;
		}

		// add printable characters to the focused player name
		if (key.length === 1 && focusedPlayer === 1 && player1name.length < 10) {
			player1name += key;
			return false;
		} else if (key.length === 1 && focusedPlayer === 2 && player2name.length < 10) {
			player2name += key;
			return false;
		}

		return;
	}

	//controls for player 1 movement
	let playerSize = boxWidth / 3;
	if (key === 'a' || key === 'A') {
		if (showPlayer1Saved) {
			let nextX = blueplayerx - playerSize;
			if (!isBarrierCollision(nextX, blueplayery, playerSize, playerSize, 0)) {
				blueplayerx = nextX;
			}
			print("pressed A")
		}
	} else if (key === 'd' || key === 'D') {
		if (showPlayer1Saved) {
			let nextX = blueplayerx + playerSize;
			if (!isBarrierCollision(nextX, blueplayery, playerSize, playerSize, 0)) {
				blueplayerx = nextX;
			}
			print("pressed D")
		}
	} else if (key === 'w' || key === 'W') {
		if (showPlayer1Saved) {
			let nextY = blueplayery - playerSize;
			if (!isBarrierCollision(blueplayerx, nextY, playerSize, playerSize, 0)) {
				blueplayery = nextY;
			}
			print("pressed W")
		}
	} else if (key === 's' || key === 'S') {
		if (showPlayer1Saved) {
			let nextY = blueplayery + playerSize;
			if (!isBarrierCollision(blueplayerx, nextY, playerSize, playerSize, 0)) {
				blueplayery = nextY;
			}
			print("pressed S")
		}
	} else if (key === 'c' || key === 'C') {
		if (showPlayer1Saved) {
			player1Rotation += 90;
			if (player1Rotation >= 360) player1Rotation = 0;
			print("pressed C - rotated blue player " + player1Rotation);
		}
	}
	//if the left control is pressed, spawn a barrier at the blue circle location for player1
	if ((key === 'CONTROL' || key === 'Control' || keyCode === CONTROL) && showPlayer1Saved) {
		let circleOffset = boxWidth / 3;
		let angleRad = radians(player1Rotation);
		let blockX = blueplayerx + sin(angleRad) * circleOffset;
		let blockY = blueplayery - cos(angleRad) * circleOffset;
		let newBarrier = new Blocks(blockX, blockY, boxWidth / 3, boxWidth / 3, "#0500A3", player1Rotation);
		barriers.push(newBarrier);
		print("Barrier placed for player 1 at (" + blockX + ", " + blockY + ") with rotation " + player1Rotation);
	}
	//if 9 is pressed, place a barrier at the red circle location for player2
	if ((key === '9') && showPlayer2Saved) {
		let circleOffset = boxWidth / 3;
		let angleRad = radians(player2Rotation);
		let blockX = redplayerx + sin(angleRad) * circleOffset;
		let blockY = redplayery - cos(angleRad) * circleOffset;
		let newBarrier = new Blocks(blockX, blockY, boxWidth / 3, boxWidth / 3, "#A30000", player2Rotation);
		barriers.push(newBarrier);
		print("Barrier placed for player 2 at (" + blockX + ", " + blockY + ") with rotation " + player2Rotation);
	}

	//if total barriers blocks is equal to 6, remove the oldest barrier block and add a new one at the location of the blue circle for player1
	if (barriers.length > 6) {
		barriers.shift();
		print("Removed oldest barrier. Total barriers: " + barriers.length);
	}

	//controls for player 2 movement with arrow keys
	if (keyCode === LEFT_ARROW) {
		if (showPlayer2Saved) {
			let nextX = redplayerx - playerSize;
			if (!isBarrierCollision(nextX, redplayery, playerSize, playerSize, 0)) {
				redplayerx = nextX;
			}
			print("pressed LEFT_ARROW")
		}
	} else if (keyCode === RIGHT_ARROW) {
		if (showPlayer2Saved) {
			let nextX = redplayerx + playerSize;
			if (!isBarrierCollision(nextX, redplayery, playerSize, playerSize, 0)) {
				redplayerx = nextX;
			}
			print("pressed RIGHT_ARROW")
		}
	} else if (keyCode === UP_ARROW) {
		if (showPlayer2Saved) {
			let nextY = redplayery - playerSize;
			if (!isBarrierCollision(redplayerx, nextY, playerSize, playerSize, 0)) {
				redplayery = nextY;
			}
			print("pressed UP_ARROW")
		}
	} else if (keyCode === DOWN_ARROW) {
		if (showPlayer2Saved) {
			let nextY = redplayery + playerSize;
			if (!isBarrierCollision(redplayerx, nextY, playerSize, playerSize, 0)) {
				redplayery = nextY;
			}
			print("pressed DOWN_ARROW")
		}
	} else if (key === '0') {
		if (showPlayer2Saved) {
			player2Rotation += 90;
			if (player2Rotation >= 360) player2Rotation = 0;
			print("pressed 0 - rotated red player " + player2Rotation);
		}
	}
}

function arena() {
	// Code to transition to the arena screen
}