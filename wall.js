function Wall(x, y, a, b, e=0.2, clr = 255) {
  this.pos = createVector(x, y);
  this.a = a;
  this.b = b;
  this.e = e; 
  this.clr = clr;
  
  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.clr);
    noStroke();
    // noFill();
    // stroke(255);
    rect(0,0,2*this.a, 2*this.b,4);
    pop();
  }
}
