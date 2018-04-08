function Bullet(tpos, angle, colour, id) {
  this.id = id;
  this.startFrame = frameCount;
  this.lifeSpan = 5*60;
  this.pos = createVector(tpos.x + 50*cos(angle), tpos.y + 50*sin(angle));
  this.vel = p5.Vector.fromAngle(radians(angle));
  this.colour = colour;
  this.vel.mult(12);
  
  this.update = function() {
    this.pos.add(this.vel);
  }
  
  this.render = function() {
    push();
    stroke(this.colour);
    strokeWeight(12);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.alive = function() {
    return (frameCount - this.startFrame <= this.lifeSpan);
    // return (this.pos.x <= windowWidth && this.pos.x >= 0) && (this.pos.y <= windowHeight && this.pos.y >= 0) && (frameCount - this.startFrame <= this.lifeSpan);
  }
}
