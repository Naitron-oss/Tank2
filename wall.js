function Wall(x, y, a, b) {
  this.pos = createVector(x, y);
  this.a = a;
  this.b = b;
  
  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(255);
    noStroke();
    rect(0,0,2*this.a, 2*this.b);
    pop();
  }
}
