class projectiles {
    constructor(x, y, speed, direction) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
    }
}


class Blocks {
  constructor(x, y, width, height, color = "black", angle = 90) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.colour = color;
    this.angle = angle; 
  }

  draw() {
    push();
    translate(this.x, this.y); 
    rotate(radians(this.angle));
    rectMode(CENTER);
    fill(this.colour);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
