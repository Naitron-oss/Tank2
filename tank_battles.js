var tank1;
var bullets1 = [];
var poly1 = [];

var tank2;
var bullets2 = [];
var poly2 = [];

var walls = [];
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

function draw() {
  background(0);
  tank1.update();
  tank1.show();
  poly1 = tank1.collisionbox();
  
  tank2.update();
  tank2.show();
  poly2 = tank2.collisionbox();
  
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
  
  for (var i = 0; i < bullets1.length; i++) {
    bullets1[i].render();
    bullets1[i].update();
    
    if(frameCount - bullets1[i].startFrame <= bullets1[i].lifeSpan){
      bullets2.push(bullets1[i]);
    }
    for (var j = 0; j < walls.length; j++) {
      collide(bullets1[i], walls[j]);    
    }
    
    if (collidePointPoly(bullets1[i].pos.x, bullets1[i].pos.y,poly1))
      gameend = true;
    if (collidePointPoly(bullets1[i].pos.x, bullets1[i].pos.y,poly2))
      gameend = true;
  
  }
  bullets1 = bullets2.slice();
  bullets2 = [];
  for (var i = 0; i < walls.length; i++) {
    walls[i].render();
  }
  
  if (gameend == true) {
      fill(255);
      textSize(60);
      text('GAME OVER', 100, 300);
  }
}

function collide(bullet, wall){
  delta = 5;
  if(collidePointRect(bullet.pos.x, bullet.pos.y, wall.pos.x - wall.a, wall.pos.y - wall.b, 2*wall.a, 2*wall.b)) {
    if(bullet.pos.x >= wall.pos.x - wall.a + delta && bullet.pos.x <= wall.pos.x + wall.a - delta){
      bullet.vel.y *= -1;
    }
    if(bullet.pos.y >= wall.pos.y - wall.b + delta && bullet.pos.y <= wall.pos.y + wall.b - delta){
      bullet.vel.x *= -1;
    }
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
