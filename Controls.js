function barrierPlacement() {
	// Code to handle barrier placement logic
}

function placementGuide() {
	// Code to provide visual guidance for barrier placement
}

let player1X;
let player1Y;

function keyPressed() {
  let boxWidth = windowWidth * 0.1;
  
  player1X = player1X || windowWidth / 2.6;
  player1Y = player1Y || windowHeight / 2.1;

  if (key === 'a' || key === 'A') {
    player1X -= boxWidth / 3;
    print("keypressed");
  }
}