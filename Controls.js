function barrierPlacement() {
	// Code to handle barrier placement logic
}

function placementGuide() {
	// Code to provide visual guidance for barrier placement
}

function handleControlsKeys() {
  let boxWidth = windowWidth * 0.1;

  if (player1X === 0) {
    player1X = windowWidth / 2.6;
    player1Y = windowHeight / 2.1;
  }

  if (key === 'a' || key === 'A') {
    player1X -= boxWidth / 3;
    print("keypressed");
  }
}