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
  //if c or C is pressed, rotate the blue circle by 90 degrees to the right each time
  if (key === 'c' || key === 'C') {
    player1Rotation += 90; // Add 90 degrees each time
    if (player1Rotation >= 360) player1Rotation = 0; // Reset after full rotation
    print("Blue circle rotated. Current angle: " + player1Rotation);
  }

  //if 0 is pressed, rotate the red circle by 90 degrees to the right each time
  if (key === '0') {
    player2Rotation += 90; // Add 90 degrees each time
    if (player2Rotation >= 360) player2Rotation = 0; // Reset after full rotation
    print("Red circle rotated. Current angle: " + player2Rotation);
  }
}