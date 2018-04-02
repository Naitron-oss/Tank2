function Tank(x, y, h, colour) {
  this.pos = createVector(x, y);
  this.heading = h;
  this.dampening = 0.95;
  this.rotation = 0;
  this.colour = colour;
  this.vel = createVector(0,0);
  this.thrust = 0;
  var poly = [];
  
  this.update = function() {
    this.boost();
    this.turn();
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
  
  this.turn = function() {
    this.heading += this.rotation;
  }
  
  this.show = function() {
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

  this.collisionbox = function() {
    var a = 15, b = 25;
    var c = cos(this.heading), s = sin(this.heading);
    poly[0] = this.createRotatedVector( a, b);
    poly[1] = this.createRotatedVector( a,-b);
    poly[2] = this.createRotatedVector(-a,-b);
    poly[3] = this.createRotatedVector(-a, b);
    return poly;
  }
}


