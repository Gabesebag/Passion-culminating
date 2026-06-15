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
    // Oriented bounding box (OBB) vs OBB using Separating Axis Theorem
    let angleA = radians(this.angle);
    let angleB = radians(pAngle);

    // local axes for A
    let uxA = { x: cos(angleA), y: sin(angleA) };
    let uyA = { x: -sin(angleA), y: cos(angleA) };
    let hxA = this.w / 2;
    let hyA = this.h / 2;

    // local axes for B (player)
    let uxB = { x: cos(angleB), y: sin(angleB) };
    let uyB = { x: -sin(angleB), y: cos(angleB) };
    let hxB = pw / 2;
    let hyB = ph / 2;

    // centers
    let cA = { x: this.x, y: this.y };
    let cB = { x: px, y: py };

    // axes to test: uxA, uyA, uxB, uyB
    let axes = [uxA, uyA, uxB, uyB];

    for (let i = 0; i < axes.length; i++) {
      let axis = axes[i];
      // normalize axis
      let len = Math.hypot(axis.x, axis.y);
      let ax = axis.x / len;
      let ay = axis.y / len;

      // project centers
      let projA = cA.x * ax + cA.y * ay;
      let projB = cB.x * ax + cB.y * ay;

      // projection radius of A and B onto axis
      let rA = hxA * abs(ax * uxA.x + ay * uxA.y) + hyA * abs(ax * uyA.x + ay * uyA.y);
      let rB = hxB * abs(ax * uxB.x + ay * uxB.y) + hyB * abs(ax * uyB.x + ay * uyB.y);

      if (abs(projA - projB) > rA + rB) {
        return false; // separation found
      }
    }

    return true; // overlap on all axes
  }
}
