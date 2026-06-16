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

  contains(px, py) {
    // Translate point to block's local coordinate system
    let dx = px - this.x;
    let dy = py - this.y;
    
    // Rotate point back by negative angle to align with unrotated rectangle
    let angleRad = radians(this.angle);
    let rotatedX = dx * cos(-angleRad) - dy * sin(-angleRad);
    let rotatedY = dx * sin(-angleRad) + dy * cos(-angleRad);
    
    // Check if point is within rectangle bounds (centered at origin)
    return rotatedX >= -this.w / 2 && rotatedX <= this.w / 2 &&
           rotatedY >= -this.h / 2 && rotatedY <= this.h / 2;
  }

  containsCircle(px, py, r) {
    // Translate point to block's local coordinate system
    let dx = px - this.x;
    let dy = py - this.y;

    // Rotate point back by negative angle to align with unrotated rectangle
    let angleRad = radians(this.angle);
    let rotatedX = dx * cos(-angleRad) - dy * sin(-angleRad);
    let rotatedY = dx * sin(-angleRad) + dy * cos(-angleRad);

    // Rectangle half-extents
    let hx = this.w / 2;
    let hy = this.h / 2;

    // Find closest point on rectangle to the circle center
    let closestX = rotatedX;
    if (closestX < -hx) closestX = -hx;
    if (closestX > hx) closestX = hx;

    let closestY = rotatedY;
    if (closestY < -hy) closestY = -hy;
    if (closestY > hy) closestY = hy;

    // Distance from circle center to closest point
    let distX = rotatedX - closestX;
    let distY = rotatedY - closestY;
    return (distX * distX + distY * distY) <= (r * r);
  }

  intersectsRect(px, py, pw, ph, pAngle) {
    // This game uses only 90-degree rotations for player and barrier blocks.
    // For these rotations, the bounding box is axis-aligned with dimensions swapped on 90/270 degrees.
    const normalizeAngle = (angle) => {
      let a = angle % 180;
      if (a < 0) a += 180;
      return a;
    };

    const getBounds = (cx, cy, w, h, angle) => {
      let a = normalizeAngle(angle);
      let width = a === 90 ? h : w;
      let height = a === 90 ? w : h;
      return {
        left: cx - width / 2,
        right: cx + width / 2,
        top: cy - height / 2,
        bottom: cy + height / 2,
      };
    };

    let a = getBounds(this.x, this.y, this.w, this.h, this.angle);
    let b = getBounds(px, py, pw, ph, pAngle);

    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
  }
}
