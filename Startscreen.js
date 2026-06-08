let focusedPlayer = 0; // 0 = none, 1 = player1, 2 = player2
let showPlayer1Saved = false;
let showPlayer2Saved = false;

function Startscreen () {
    if (startscreen == 0) {
        buttonColour = color(200, 200, 200);
        if (mouseX > windowWidth / 2 - 100 && mouseX < windowWidth / 2 + 100 &&
            mouseY > windowHeight / 2 - 50 && mouseY < windowHeight / 2 + 50) {
            buttonColour = color(225, 225, 225);
            // if (mouseIsPressed) {
            //     thisScreen = 1; // Switch to arena screen when the start button is pressed
            //     print(thisScreen)
            // }
        }

        const boxWidth = windowWidth * 0.1;
        const boxHeight = windowHeight * 0.1;
        const player1X = windowWidth / 2.6;
        const player1Y = windowHeight / 2.1;
        const player2X = windowWidth / 1.64;
        const player2Y = windowHeight / 2.1;

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
			fill(0, 0, 255);
			rectMode(CENTER)
			rect(player1X - 80, player1Y + boxHeight, boxWidth / 3, boxWidth / 3, 0);
			fill(255);
			textSize(18);
			textAlign(CENTER, CENTER);
			text(player1name, player1X - 80, player1Y + boxHeight);
		}
		if (showPlayer2Saved) {
			fill(255, 0, 0);
			rect(player2X + 80, player2Y + boxHeight, boxWidth / 3, boxWidth / 3, 0);
			fill(255);
			textSize(18);
			textAlign(CENTER, CENTER);
			text(player2name, player2X + 80, player2Y + boxHeight);
		}
    }
}

function mousePressed() {
	if (startscreen === 0) {
		const boxWidth = windowWidth * 0.1;
		const boxHeight = windowHeight * 0.1;
		const player1X = windowWidth / 2.6;
		const player1Y = windowHeight / 2.1;
		const player2X = windowWidth / 1.64;
		const player2Y = windowHeight / 2.1;

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
			print("typed/clicked")
			return;
		}

        //check if player 2 name box is clicked
		if (mouseX >= player2X - boxWidth / 2 && mouseX <= player2X + boxWidth / 2 &&
			mouseY >= player2Y - boxHeight / 2 && mouseY <= player2Y + boxHeight / 2) {
			focusedPlayer = 2;
			nameInputFocused = true;
			print("typed/clickedNUMBER2")
			return;
		}
        
        //if clicked outside of player 1 name box and has text in the box, spawn in a blue box for player 1 below player 1 name text
        if (mouseX < player1X - boxWidth / 2 || mouseX > player1X + boxWidth / 2 ||
            mouseY < player1Y - boxHeight / 2 || mouseY > player1Y + boxHeight / 2) {
            if (player1name.length > 0) {
                showPlayer1Saved = true;
            }
        }

        //if clicked outside of player 2 name box and has text in the box, spawn in a red box for player 2 below player 2 name text
        if (mouseX < player2X - boxWidth / 2 || mouseX > player2X + boxWidth / 2 ||
            mouseY < player2Y - boxHeight / 2 || mouseY > player2Y + boxHeight / 2) {
            if (player2name.length > 0) {
                showPlayer2Saved = true;
            }
        }
	}

    focusedPlayer = 0;
    nameInputFocused = false;
}

function keyTyped() {
    if (!nameInputFocused) {
        return;
    }

    if (focusedPlayer === 1) {
        player1name += key;
    } else if (focusedPlayer === 2) {
        player2name += key;
    }
}

function keyPressed() {
    if (!nameInputFocused) {
        return;
    }
    if (keyCode === BACKSPACE) {
        if (focusedPlayer === 1) {
            player1name = player1name.slice(0, -1);
        } else if (focusedPlayer === 2) {
            player2name = player2name.slice(0, -1);
        }
        return false;
    }
}

function arena() {
    // Code to transition to the arena screen
}
