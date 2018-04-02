function Wall(i) {
  this.pos = createVector(120*i + 120,abs((i%2)*height - 500));
  this.a = 10;
  this.b = 100;
  
  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(255);
    noStroke();
    rect(0,0,2*this.a, 2*this.b);
    pop();
  }
}
