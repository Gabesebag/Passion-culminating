function Startscreen () {
    if (startscreen == 0) {
		buttonColour = color(200, 200, 200);
		if (mouseX > windowWidth / 2 - 100 && mouseX < windowWidth / 2 + 100 &&
			mouseY > windowHeight / 2 - 50 && mouseY < windowHeight / 2 + 50) {
			buttonColour = color(225, 225, 225);
            if (mouseIsPressed) {
                startscreen = 1;
            }
		}
        
    background("#876B65");
    fill(buttonColour);
	rectMode(CENTER)
	rect(windowWidth / 2, windowHeight / 3, windowWidth * 0.1, windowHeight * 0.1, 10);
    fill(255);
    textSize(28);
    textAlign(CENTER, CENTER);
    text("Start", width / 2, height / 3);

    fill(buttonColour);
    rectMode(CENTER)
	rect(windowWidth / 2.6, windowHeight / 2.1, windowWidth * 0.1, windowHeight * 0.1, 10);
    fill(255);
    textSize(28);
    textAlign(CENTER, CENTER);
    text("Type here", width / 2.6, height / 2.1);
    text("Player 1 name", width / 2.6, height / 1.8);
    
    fill(buttonColour);
    rectMode(CENTER)
	rect(windowWidth / 1.64, windowHeight / 2.1, windowWidth * 0.1, windowHeight * 0.1, 10);
    fill(255);
    textSize(28);
    textAlign(CENTER, CENTER);
    text("Player 2 name", width / 1.64, height / 2.1);

    // code for the player name input boxes
    // if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth && 
    //         mouseY >= height / 2 + 20 && mouseY <= height / 2 + 60) {
    //         nameInputFocused = true;
    //         return;
    //     } else {
    //         nameInputFocused = false;
    //     }
    }
}

function arena() {
    // Code to transition to the arena screen
}