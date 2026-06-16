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
    const toRadians = (degrees) => degrees * PI / 180;

    const getCorners = (cx, cy, w, h, angle) => {
      let hw = w / 2;
      let hh = h / 2;
      let rad = toRadians(angle);
      let cosA = cos(rad);
      let sinA = sin(rad);
      let corners = [
        { x: -hw, y: -hh },
        { x: hw, y: -hh },
        { x: hw, y: hh },
        { x: -hw, y: hh }
      ];
      return corners.map((pt) => ({
        x: cx + pt.x * cosA - pt.y * sinA,
        y: cy + pt.x * sinA + pt.y * cosA
      }));
    };

    const projectOntoAxis = (points, axis) => {
      let min = Infinity;
      let max = -Infinity;
      for (let i = 0; i < points.length; i++) {
        let proj = points[i].x * axis.x + points[i].y * axis.y;
        if (proj < min) min = proj;
        if (proj > max) max = proj;
      }
      return { min, max };
    };

    const getAxes = (corners) => {
      let axes = [];
      for (let i = 0; i < corners.length; i++) {
        let p1 = corners[i];
        let p2 = corners[(i + 1) % corners.length];
        let edge = { x: p2.x - p1.x, y: p2.y - p1.y };
        let normal = { x: -edge.y, y: edge.x };
        let len = sqrt(normal.x * normal.x + normal.y * normal.y);
        axes.push({ x: normal.x / len, y: normal.y / len });
      }
      return axes;
    };

    let cornersA = getCorners(this.x, this.y, this.w, this.h, this.angle);
    let cornersB = getCorners(px, py, pw, ph, pAngle);
    let axes = getAxes(cornersA).concat(getAxes(cornersB));

    for (let i = 0; i < axes.length; i++) {
      let axis = axes[i];
      let projA = projectOntoAxis(cornersA, axis);
      let projB = projectOntoAxis(cornersB, axis);
      if (projA.max <= projB.min || projB.max <= projA.min) {
        return false;
      }
    }
    return true;
  }
}
