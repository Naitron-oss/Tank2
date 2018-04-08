var tank1, tank2;
var walls = [], bullets1 = [], bullets2= [];
var gameend = false;
var loser;
var bgcolor = 0;

var fw = 1.5, bw = 1.2, lr = 5;
var maxbullets = 5;

function setup() {
  createCanvas(50*(windowWidth/50), 50*(windowHeight/50));
  tank1 = new Tank(40, 40, 0, 'green', 1);                 
  tank2 = new Tank(width - 40, height - 40, 180,  'red', 2);                
  walls = randmap().slice()
  rectMode(CENTER);
  angleMode(DEGREES);
  // fr = createP('');
}

function draw() {
  // fr.html(floor(frameRate()));
  background(bgcolor);  
  tank1.render();
  tank2.render();
  tank1.collisionBox();
  tank2.collisionBox();
  
  
  if (keyIsDown(UP_ARROW)) {
    tank1.setBoost(fw);
  } else if (keyIsDown(DOWN_ARROW)) {
    tank1.setBoost(-bw);
  } 
  if (keyIsDown(LEFT_ARROW)) {
    tank1.setRotation(-lr);
  } else if (keyIsDown(RIGHT_ARROW)) {
    tank1.setRotation(lr);
  } 
  if (keyIsDown(87)) {
    tank2.setBoost(fw);
  } else if (keyIsDown(83)) {
    tank2.setBoost(-bw);
  }  
  if (keyIsDown(65)) {
    tank2.setRotation(-lr);
  } else if (keyIsDown(68)) {
    tank2.setRotation(lr);
  }
  
  bullets2 = [];
  for (var i = 0; i < bullets1.length; i++) {
    bullets1[i].render();
    bullets1[i].update();
    
    if(bullets1[i].alive()){
      bullets2.push(bullets1[i]);
    }
    else if(bullets1[i].id == 1)
      tank1.ctr--;
    else
      tank2.ctr--;
    
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
    fill(loser == 2 ? 'GREEN' : 'RED');
    textAlign(CENTER);
    textSize(60);
    text('WINNER ' + (loser == 2 ? 'GREEN' : 'RED'), windowWidth / 2, windowHeight / 2);
  }
}

function collideBW(bullet, wall){
  var delta = bullet.vel.mag();
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
    if(!gameend) 
      loser = tank.id;
    gameend = true;    
  }
}


function collideTW(tank, wall) {
  var delta = -5;
  var delta_push = 1;
  // var e = -0.5;
  var dir = 0;
  if (collideRectPoly(wall.pos.x - wall.a, wall.pos.y - wall.b, 2 * wall.a, 2 * wall.b, tank.hitbox)) {
    // tank.pos = tank.prevPos.copy();
    tank.heading = tank.prevHeading;
    if (tank.pos.x >= wall.pos.x - wall.a + delta && tank.pos.x <= wall.pos.x + wall.a - delta) {
      tank.thrust.y *= 0;
      tank.vel.y *= -wall.e;
      dir = wall.pos.y - tank.pos.y > 0 ? 1 : -1;
      tank.pos.y -= dir * delta_push;
    }
    if (tank.pos.y >= wall.pos.y - wall.b + delta && tank.pos.y <= wall.pos.y + wall.b - delta) {
      tank.thrust.x *= 0;
      tank.vel.x *= -wall.e;
      dir = wall.pos.x - tank.pos.x > 0 ? 1 : -1;
      tank.pos.x -= dir * delta_push;
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
  if (key == 'M' && tank1.ctr < maxbullets){
    tank1.ctr++;
    bullets1.push(new Bullet(tank1.pos, tank1.heading, tank1.colour, 1));
  }
  if (key == 'G' && tank2.ctr < maxbullets){
    tank2.ctr++;
    bullets1.push(new Bullet(tank2.pos, tank2.heading, tank2.colour, 2)); 
  }
}
