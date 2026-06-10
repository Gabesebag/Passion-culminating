function barrierPlacement() {
	// Code to handle barrier placement logic
}


<<<<<<< HEAD

function handleControlsKeys() {
  let boxWidth = windowWidth * 0.1;
  
=======
function handleControlsKeys() {
  let boxWidth = windowWidth * 0.1;

>>>>>>> f1a13034decff694a8b9e1b3e61cd48565ad5f8a
  if (player1X === 0) {
    player1X = windowWidth / 2.6;
    player1Y = windowHeight / 2.1;
  }
<<<<<<< HEAD
  
=======

>>>>>>> f1a13034decff694a8b9e1b3e61cd48565ad5f8a
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