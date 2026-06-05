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
            
// Name input text box - highlight if focused
// if (nameInputFocused) {
//     buttonColour = color(255, 255, 0);  // Yellow when focused
// } else {
//     buttonColour = color(200, 200, 200);  // Light blue when not focused
// }

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
text("Type here", width / 1.64, height / 2.1);
text("Player 2 name", width / 1.64, height / 1.8);
            
// check if the mouse is clicked within the bounds of the first name input box
// if (mouseX >= windowWidth / 2.6 && mouseX <= windowWidth / 2.6 + buttonWidth && 
//         mouseY >= windowHeight / 2.1 + 20 && mouseY <= windowHeight / 2.1 + 60) {
//         nameInputFocused = true;
//         return;
//     } else {
//         nameInputFocused = false;
//     }


// rect(windowWidth / 2.6, windowHeight / 2.1, windowWidth * 0.1, windowHeight * 0.1, 10);
}
}

function mousePressed() {
    
    	nameInputFocused = false; // Unfocus text box
			if (playerName.length > 0) { // Only proceed if name is entered

            }
        }

function arena() {
    // Code to transition to the arena screen
}
