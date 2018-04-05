function Tank(x, y, h, colour) {
  this.pos = createVector(x, y);
  this.prevPos = this.pos.copy()
  this.heading = h;
  this.prevHeading = this.heading;
  this.dampening = 0.95;
  this.rotation = 0;
  this.colour = colour;
  this.vel = createVector(0,0);
  this.thrust = 0;
  this.hitbox = [];
  
  this.update = function() {
    this.prevPos = this.pos.copy();
    this.prevHeading = this.heading;
    this.boost();
    this.rotate();
    this.pos.add(this.vel);
    this.vel.mult(this.dampening);
  }
  
  this.setBoost = function(b) {
    this.thrust = b;
  }
  
  this.boost = function() {
    var force = p5.Vector.fromAngle(radians(this.heading));
    force.mult(this.thrust);
    this.vel.add(force);
  }
  
  this.setRotation = function(angle) {
    this.rotation = angle;
  }  
  
  this.rotate = function() {
    this.heading += this.rotation;
  }
  
  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    fill(this.colour);
    rect(0, 0, 30, 20);
    rect(0, 0, 10, 10);
    rect(0 + 12.5, 0, 25, 4);
    pop();
  }

  this.createRotatedVector = function(px, py) {
    var vx = px * cos(this.heading) - py * sin(this.heading);
    var vy = px * sin(this.heading) + py * cos(this.heading);
    return createVector(this.pos.x + vx ,this.pos.y + vy);
  }  

  this.collisionBox = function() {
    var a = 15, b = 10;
    var c = cos(this.heading), s = sin(this.heading);
    var poly = [];
    poly[0] = this.createRotatedVector( a, b);
    poly[1] = this.createRotatedVector( a,-b);
    poly[2] = this.createRotatedVector(-a,-b);
    poly[3] = this.createRotatedVector(-a, b);
    // beginShape();
    // fill(150,150,150,50);
    // vertex(poly[0].x, poly[0].y);
    // vertex(poly[1].x, poly[1].y);
    // vertex(poly[2].x, poly[2].y);
    // vertex(poly[3].x, poly[3].y);
    // endShape(CLOSE);
    this.hitbox = poly.slice();
  }
}


