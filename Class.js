class Projectile {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    // 1. Array of cardinal directions (dx, dy)
    const directions = [
      { dx: 0, dy: -1 }, // North
      { dx: 1, dy: 0 },  // East
      { dx: 0, dy: 1 },  // South
      { dx: -1, dy: 0 }  // West
    ];

    // 2. Pick a random direction
    const randomDir = directions[Math.floor(Math.random() * directions.length)];

    // 3. Set velocities
    this.vx = randomDir.dx * this.speed;
    this.vy = randomDir.dy * this.speed;
  }

  update() {
    // 4. Move projectile based on randomized direction
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    // Basic rendering (e.g., a circle)
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
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
    // Calculate true AABB (axis-aligned bounding box) for rotated block
    const getAABB = (cx, cy, w, h, angle) => {
      let rad = angle * PI / 180;
      let cos_a = Math.cos(rad);
      let sin_a = Math.sin(rad);
      let hw = w / 2;
      let hh = h / 2;
      
      // Get all four corners rotated
      let corners = [
        { x: -hw, y: -hh },
        { x: hw, y: -hh },
        { x: hw, y: hh },
        { x: -hw, y: hh }
      ];
      
      let rotatedCorners = corners.map(pt => ({
        x: cx + pt.x * cos_a - pt.y * sin_a,
        y: cy + pt.x * sin_a + pt.y * cos_a
      }));
      
      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      for (let corner of rotatedCorners) {
        if (corner.x < minX) minX = corner.x;
        if (corner.x > maxX) maxX = corner.x;
        if (corner.y < minY) minY = corner.y;
        if (corner.y > maxY) maxY = corner.y;
      }
      
      return { left: minX, right: maxX, top: minY, bottom: maxY };
    };
    
    let a = getAABB(this.x, this.y, this.w, this.h, this.angle);
    let b = getAABB(px, py, pw, ph, pAngle);
    
    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
  }
}
