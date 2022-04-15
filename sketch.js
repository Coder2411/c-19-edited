var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameOver, g_over;
var gameState = "play";
var score = 0;
var rs;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  restart = loadImage("restart.png");
  gameOver = loadImage("game_over.png");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 5;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  g_over = createSprite(300,300,1,1);
  g_over.scale = 0.5;
  g_over.addImage("over",gameOver);
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  rs = createSprite(300,500,10,10);
  rs.addImage("restart",restart);
}

function draw(){
  rs.visible = false;
  g_over.visible = false;
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
    
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
    
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
    
  ghost.velocityY = ghost.velocityY + 0.8
    
  if(tower.y > 400){
    tower.y = 300
  }
  spawnDoors();

    
  climbersGroup.collide(ghost);
  if(climbersGroup.isTouching(ghost) || doorsGroup.isTouching(ghost)){
    gameState = "end";

  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    gameState = "end";
  }

  if (gameState === "end") {
    tower.velocityY = 0;
    ghost.destroy();
    invisibleBlockGroup.destroyEach();
    climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    g_over.visible = true;
    rs.visible = true;
    if(mousePressedOver(rs)) {
      gameState = "play";
      ghost = createSprite(200,200,50,50);
      ghost.scale = 0.3;
      ghost.addImage("ghost", ghostImg);
      tower.velocityY = 5;
    }
  }
  
  text("Score: " + score,270,50);

  drawSprites();
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 500 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 5;
    climber.velocityY = 5;
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 70;

    
    //add each door to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    if (door.y > 600 && climber.y > 600) {
      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
    }
  }
}
