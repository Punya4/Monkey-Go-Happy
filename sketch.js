
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY;
var END;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600, 400);
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;

  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  monkey.setCollider("circle",0,0,40);
  score = 0;
  
}

function draw() {
  
  background("white");
  //displaying score
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    ground.velocityX = -(6 + score/100)
    if(monkey.isTouching("BananaGroup")){
      score = score + 1;
      bananaGroup.DestroyEach();
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y >= 160) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    spawnBananas();
    spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);    
   }
  monkey.collide(Ground);
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage("hallo",obstacleImage)          
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}

function spawnBanana() {
 
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(cloudImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    banana.depth = trex.depth;
    monkey.depth = trex.depth + 1;
    bananaGroup.add(banana);
  }
}