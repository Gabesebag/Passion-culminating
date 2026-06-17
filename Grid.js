// let x = 0
// let y = windowHeight


//The border of the canvas
function drawGrid() {
  stroke(255);
  strokeWeight(2);
  line(x, 0, x, windowHeight);
    line(0, y, windowWidth, y);
    x += 20;
    y -= 20;
    if (x > windowWidth) {
        x = 0;
    }
    if (y < 0) {
        y = windowHeight;
    }
}

//draw a grid line every boxWidth pixels
function drawGridLines() {
        strokeWeight(1);
        
        for (let i = boxWidth; i < windowWidth; i += boxWidth) {
            line(i, 0, i, windowHeight);
        }
        for (let j = boxWidth; j < windowHeight; j += boxWidth) {
            line(0, j, windowWidth, j);
        }
    }

