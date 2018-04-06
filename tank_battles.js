var tank1, tank2;
var walls = [], bullets1 = [], bullets2= [];
var gameend = false;

function setup() {
  createCanvas(600,600);
  tank1 = new Tank(40, 40, 0, 'green');                 
  tank2 = new Tank(500, 500, 180, 'red');                
  
  for (var i = 0; i < 4; i++) {                   
    walls.push(new Wall(i));
  }
  rectMode(CENTER);
  angleMode(DEGREES);
}

var bgcolor = 0;
function draw() {
  background(bgcolor);
  
  tank1.render();
  tank2.render();
  tank1.collisionBox();
  tank2.collisionBox();
  
  if (keyIsDown(UP_ARROW)) {
    tank1.setBoost(0.2);
  } else if (keyIsDown(DOWN_ARROW)) {
    tank1.setBoost(-0.15);
  } 
  if (keyIsDown(LEFT_ARROW)) {
    tank1.setRotation(-10);
  } else if (keyIsDown(RIGHT_ARROW)) {
    tank1.setRotation(10);
  } 
  if (keyIsDown(87)) {
    tank2.setBoost(0.2);
  } else if (keyIsDown(83)) {
    tank2.setBoost(-0.15);
  }  
  if (keyIsDown(65)) {
    tank2.setRotation(-10);
  } else if (keyIsDown(68)) {
    tank2.setRotation(10);
  }
  
  bullets2 = [];
  for (var i = 0; i < bullets1.length; i++) {
    bullets1[i].render();
    bullets1[i].update();
    
    if(bullets1[i].alive()){
      bullets2.push(bullets1[i]);
    }
    
    for (var j = 0; j < walls.length; j++) {
      collideBW(bullets1[i], walls[j]);    
    }    
    collideBT(bullets1[i], tank1);
    collideBT(bullets1[i], tank2);   
  }
  bullets1 = bullets2.slice();
  
  bgcolor = 0;
  for (var i = 0; i < walls.length; i++) {
    collideTW(tank1, walls[i]);
    collideTW(tank2, walls[i]);
    walls[i].render();
  }
  
  // collideTT(tank1, tank2);

  tank1.update();
  tank2.update();
  
  if (gameend == true) {
      fill(255);
      textSize(60);
      text('GAME OVER', 100, 300);
  }
}

function collideBW(bullet, wall){
  var delta = 5;
  if(collidePointRect(bullet.pos.x, bullet.pos.y, wall.pos.x - wall.a, wall.pos.y - wall.b, 2*wall.a, 2*wall.b)) {
    if(bullet.pos.x >= wall.pos.x - wall.a + delta && bullet.pos.x <= wall.pos.x + wall.a - delta){
      bullet.vel.y *= -1;
    }
    if(bullet.pos.y >= wall.pos.y - wall.b + delta && bullet.pos.y <= wall.pos.y + wall.b - delta){
      bullet.vel.x *= -1;
    }
  }
}

function collideBT(bullet, tank){
  if(collidePointPoly(bullet.pos.x, bullet.pos.y, tank.hitbox)){
    gameend = true;
  }
}


function collideTW(tank, wall){
  var delta = -5;
  var delta2 = 0.5;
  var dir = 0;
  if(collideRectPoly(wall.pos.x-wall.a, wall.pos.y-wall.b, 2*wall.a, 2*wall.b, tank.hitbox)){
    tank.pos = tank.prevPos.copy();
    tank.heading = tank.prevHeading;
    if (tank.pos.x >= wall.pos.x - wall.a + delta && tank.pos.x <= wall.pos.x + wall.a - delta) {
      tank.thrust.y *= 0;
      tank.vel.y *= 0;
      dir = wall.pos.y - tank.pos.y > 0 ? 1 : -1;
      tank.pos.y -= dir * delta2;
    }
    if (tank.pos.y >= wall.pos.y - wall.b + delta && tank.pos.y <= wall.pos.y + wall.b - delta) {
      tank.thrust.x *= 0;
      tank.vel.x *= 0;
      dir = wall.pos.x - tank.pos.x > 0 ? 1 : -1;
      tank.pos.x -= dir * delta2;
    }
  }
}


function collideTT(tank1, tank2){
  if(collidePolyPoly(tank1.hitbox, tank2.hitbox)){
    tank1.pos = tank1.prevPos.copy();
    tank1.heading = tank1.prevHeading;
    tank1.thrust = 0;
    tank1.vel.mult(0);
    tank1.rotation = 0;

    tank2.pos = tank2.prevPos.copy();
    tank2.heading = tank2.prevHeading;
    tank2.thrust = 0;
    tank2.vel.mult(0);
    tank2.rotation = 0;
    // bgcolor = 50;
  }
}

function keyReleased() {
  tank1.setRotation(0); 
  tank2.setRotation(0);
  tank1.setBoost(0);
  tank2.setBoost(0);  
}

function keyPressed() {
  if (key == ' '){
    bullets1.push(new Bullet(tank1.pos, tank1.heading, tank1.colour));
  }
  if (key == 'G')     {
    bullets1.push(new Bullet(tank2.pos, tank2.heading, tank2.colour)); 
  }
}
