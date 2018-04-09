var tank1, tank2;
var walls, bullets1, bullets2;
var gameend, winner, timeout, handle;
var bgcolor;
var fw, bw, lr;
var maxbullets;

var score = [0,0,0];

function setup() {
  createCanvas(50*floor((windowWidth-20)/50),50*floor((windowHeight-20)/50));
  newGame();                  
  rectMode(CENTER);
  angleMode(DEGREES);
  textAlign(CENTER);  
  // fr = createP('');
}
function newGame(){
  score[winner]++;
  walls = randmap().slice();
  bullets1 = []; bullets2 = [];
  tank1 = new Tank(random(60, width - 60), random(60, height - 60), random(360), 'green', 1);
  tank2 = new Tank(random(60, width - 60), random(60, height - 60), random(360), 'red', 2);
  winner = 0;
  gameend = false, timeout = false;
  fw = 1.5; bw = 1.2; lr = 5; maxbullets = 5;
  bgcolor = 0;
}

function randPos(){
  return createVector(random(60, width - 60), random(60, height - 60));
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
  if (keyIsDown(69)) {
    tank2.setBoost(fw);
  } else if (keyIsDown(68)) {
    tank2.setBoost(-bw);
  }  
  if (keyIsDown(83)) {
    tank2.setRotation(-lr);
  } else if (keyIsDown(70)) {
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
    
    collideBT(bullets1[i], tank1);
    collideBT(bullets1[i], tank2);
    //GOOD ENOUGH FOR SLOW BULLET VELOCITY
    for (var j = 0; j < walls.length; j++)
      if(collideBW(bullets1[i], walls[j])) j = -1;  //Multiple collisions per bullet
  }
  bullets1 = bullets2.slice();
  
  bgcolor = 0;
  for (var i = 0; i < walls.length; i++) {
    collideTW(tank1, walls[i]);
    collideTW(tank2, walls[i]);
    walls[walls.length-1-i].render();
  }
  
  collideTT(tank1, tank2);  
  collideTT(tank2, tank1);  

  tank1.update();
  tank2.update();
  
  if (gameend) {
    if(!timeout){
      timeout = true; 
      handle = setTimeout(newGame, 2500);
    }
    bgcolor = 50;
    fill(winner == 0 ? 'GRAY' : winner == 1 ? 'GREEN' : 'RED');
    textSize(200);
    text((winner == 0 ? 'DRAW' : winner == 1 ? 'GREEN WINS' : 'RED WINS'), windowWidth / 2, windowHeight / 2);
  }
  else{
    fill(0, 255, 0, 40);
    textSize(500);
    text(score[1], width/4, height/2 + 150); 
    fill(255, 0, 0, 40);
    textSize(500);
    text(score[2], 3 * width/4, height/2 + 150);
  } 
}

function collideBW(bullet, wall){
  var hit = collideLineRect(bullet.pos.x, bullet.pos.y, bullet.prevPos.x, bullet.prevPos.y, wall.pos.x - wall.a, wall.pos.y - wall.b, 2*wall.a, 2*wall.b, true);
  if(wall.a <= 10 || wall.b <= 10)
    return false;  
  if(hit.top.x && hit.top.y && bullet.prevPos.y < bullet.pos.y) {
    bullet.pos.y = bullet.pos.y += 2 * (hit.top.y - bullet.pos.y);
    bullet.vel.y *= -1;
    bullet.prevPos.x = hit.top.x;
    bullet.prevPos.y = hit.top.y;
  } else if(hit.bottom.x && hit.bottom.y && bullet.prevPos.y > bullet.pos.y) {
    bullet.pos.y = bullet.pos.y += 2 * (hit.bottom.y - bullet.pos.y);
    bullet.vel.y *= -1;
    bullet.prevPos.x = hit.bottom.x;   
    bullet.prevPos.y = hit.bottom.y;
  } else if(hit.left.x && hit.left.y && bullet.prevPos.x < bullet.pos.x) {
    bullet.pos.x += 2 * (hit.left.x - bullet.pos.x);
    bullet.vel.x *= -1;
    bullet.prevPos.x = hit.left.x;
    bullet.prevPos.y = hit.left.y;
  } else if(hit.right.x && hit.right.y && bullet.prevPos.x > bullet.pos.x) {
    bullet.pos.x += 2 * (hit.right.x - bullet.pos.x);
    bullet.vel.x *= -1;
    bullet.prevPos.x = hit.right.x;
    bullet.prevPos.y = hit.right.y;
  } else if (bullet.pos.x >= wall.pos.x - wall.a && bullet.pos.x <= wall.pos.x + wall.a 
          && bullet.pos.y >= wall.pos.y - wall.b && bullet.pos.y <= wall.pos.y + wall.b){
    bullet.vel.mult(0);
    bullet.lifeSpan = 0;
    return false;
  } else
    return false;
  push();
  strokeWeight(12);
  stroke(bullet.colour);
  point(bullet.prevPos.x, bullet.prevPos.y);
  pop();
  return true;
}

function collideBT(bullet, tank){
  if(collideLinePoly(bullet.pos.x, bullet.pos.y, bullet.prevPos.x, bullet.prevPos.y, tank.hitbox)){
    if(gameend && tank.id == winner){
      winner = 0;
      clearTimeout(handle);
      timeout = false;
    } else if(!gameend){
      winner = 3 - tank.id;
    } 
    gameend = true;    
  }
}


function collideTW(tank, wall) {
  var delta = -25;
  var delta_push = 1;
  var dir = 0;
  if (collideRectPoly(wall.pos.x - wall.a, wall.pos.y - wall.b, 2 * wall.a, 2 * wall.b, tank.hitbox)) {
    tank.heading = tank.prevHeading;
    if (tank.pos.x >= wall.pos.x - wall.a + delta && tank.pos.x <= wall.pos.x + wall.a - delta) {
      dir = wall.pos.y - tank.pos.y > 0 ? 1 : -1;
      tank.thrust.y *= 0;
      tank.vel.y *= -wall.e;
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

function collideTT(tank1, tank2) {
  if(collidePolyPoly(tank1.hitbox, tank2.hitbox)){
    var dir = p5.Vector.sub(tank2.pos, tank1.pos);
    dir.setMag(tank1.vel.mag());
    tank2.vel.add(dir);
  }  
}


function keyReleased() {
  tank1.setRotation(0); 
  tank2.setRotation(0);
  tank1.setBoost(0);
  tank2.setBoost(0);  
}

function keyPressed() {
  if ((key == 'M' || key == ' ') && tank1.ctr < maxbullets){
    tank1.ctr++;
    bullets1.push(new Bullet(tank1.pos, tank1.heading, tank1.colour, 1));
  }
  if ((key == 'Q' || key == 'G') && tank2.ctr < maxbullets){
    tank2.ctr++;
    bullets1.push(new Bullet(tank2.pos, tank2.heading, tank2.colour, 2)); 
  }
}
