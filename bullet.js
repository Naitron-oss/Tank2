function Bullet(tpos, angle, colour) {
  this.startFrame = frameCount;
  this.lifeSpan = 2*60;
  this.pos = createVector(tpos.x + 25*cos(angle), tpos.y + 25*sin(angle));
  this.vel = p5.Vector.fromAngle(radians(angle));
  this.colour = colour;
  this.vel.mult(5);
  
  this.update = function() {
    this.pos.add(this.vel);
  }
  
  this.render = function() {
    push();
    stroke(this.colour);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.alive = function() {
    return frameCount - this.startFrame <= this.lifeSpan
  }
}
