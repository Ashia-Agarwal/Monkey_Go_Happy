var m, mr, g, ig;
var b, bi, o, oi;
var fg, og;
var PLAY = 1, END = 0, gs = PLAY;
var score;
var r, ri;

function preload(){
  mr = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bi = loadImage("banana.png");
  oi = loadImage("obstacle.png");
  rimage = loadImage("restart.png");
}

function setup() {
  createCanvas(600,400);
  m = createSprite(50, 100, 20, 50);//monkey//
  m.addAnimation("monkey", mr);
  m.scale = 0.2;
  m.setCollider("circle", 0, 0, 40);
  g = createSprite(300, 390, 1200, 25);//ground//
  g.x = g.width / 2;
  ig = createSprite(200, 340, 600, 10);//invisble ground//
  ig.visible = false;
  score = 0;
  fg = new Group();//food group//
  og = new Group();//obstacle group//
  r = createSprite(300,100,0,0);//restart//
  r.addImage("restart", rimage);
  r.visible = false;
}

function draw() {
  background("white");
  m.collide(ig);
  if (gs == PLAY) {
    Play();
  } else if (gs == END) {
    End();
  }
  Score();
  drawSprites();  
}

function Play() {
  m.velocityY = m.velocityY + 1;
  g.velocityX = -7;
  score = Math.round(frameCount/24);
  Spawn_Obstacles();
  Spawn_Bananas();
  if (g.x < 0) {
    g.x = g.width / 2;
  }
  if (keyDown("space") && m.y >= 90) {
    m.velocityY = -12;
  }
  if (m.isTouching(og)) {
    gameState = END;
  }
}

function End() {
  ground.velocityX = 0;
  m.velocityY = 0;
  og.setVelocityXEach(0);
  fg.setVelocityXEach(0);
  og.setLifetimeEach(-1);
  fg.setLifetimeEach(-1);
  r.visible = true;
  if(mousePressedOver(restart)) {
    reset();
  }
}

function Reset() {
  gs = PLAY;
  restart.visible = false;
  fg.destroyEach();
  og.destroyEach();
  score = 0;
  frameCount = 0;
  m.y = 170;
}

function Score() {
  textSize(13);
  textFont("Comic Sans MS");
  text("Survival Time: " + score + " seconds", 420, 20);
}

function Spawn_Bananas() {
  if (frameCount % 80 == 0) {
    b = createSprite(600, Math.round(random(120,320)), 0, 0);//banana//
    b.addImage("banana", bi);
    b.scale = 0.1;
    b.velocityX = g.velocityX;
    m.depth = b.depth + 1;
    b.lifetime = 600 / b.velocityX;
    fg.add(b);
  }
}

function Spawn_Obstacles() {
  if (frameCount % 300== 0) {
    o = createSprite(600, Math.round(random(120,375)), 0, 0);//obstacle//
    o.addImage("banana", oi);
    o.scale = 0.1;
    o.velocityX = g.velocityX;
    m.depth = o.depth + 1;
    o.lifetime = 600 / o.velocityX;
    og.add(b);
  }
}