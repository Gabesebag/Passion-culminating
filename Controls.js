function barrierPlacement() {
	// Code to handle barrier placement logic
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
  //if 0 is pressed move the circle of player1 to the side of player1 aswell as not making it diagnol to player1
if (key === '0') {
    player1X -= boxWidth / 3;
    print("keypressed");
  }

}