var ghost, ghostImage;
var tower, towerImage;
var door, doorImage, doorsGroup;
var climber, climberImage, climbersGroup;
var invisibleBlock, invisibleBlockGroup;
var gameState="play";


function preload(){
  ghostImage=loadImage("ghost-standing.png");
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
}

function setup(){
  createCanvas(600, 600);

  
  tower = createSprite(300, 300);
  tower.addImage("tower",towerImage);
  tower.velocityY=2;
  
  ghost = createSprite(100, 300, 10, 10);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.25;
  
  
  doorsGroup=new Group();
  climbersGroup =new Group();  
  invisibleBlockGroup=new Group();
}

function draw(){
  background("lightgreen");
  
 if(gameState === "play"){ 
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+4;
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-4;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  
  ghost.velocityY=ghost.velocityY+0.5;
  
  if(tower.y >400){
    tower.y=300;
  }
 
  spawnDoor();
   
  
 if(climbersGroup.isTouching(ghost)){
   ghost.velocityY=0;
   tower.velocityY=0;
 }
 
 if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
   ghost.destroy();
   gameState = "end";
 } 
   
  drawSprites();
 }
 if(gameState==="end"){
   textSize(40);
   text("GAME OVER", 220, 300)
 }
}


 function spawnDoor(){
 if(frameCount%240 === 0){
   door=createSprite(200, 100);
   door.addImage("door",doorImage);
   door.velocityY=2;   
   door.x=Math.round(random(100, 500));   
   door.lifetime=600;   
   doorsGroup.add(door);
   
   climber=createSprite(200, 150);
   climber.addImage("climber", climberImage);
   climber.velocityY=2;
   climber.x=door.x;
   climber.lifetime=600;
   climbersGroup.add(climber);
   
   invisibleBlock=createSprite(200, 160, 50, 5);
   invisibleBlock.velocityY=2;
   invisibleBlock.x=door.x;
   invisibleBlock.lifetime=600;
   invisibleBlockGroup.add(invisibleBlock);
   //invisibleBlock.visible = true;
  }
 }

 