//Fruit ninja game
//variables
var score;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var fruitsGroup,fruit1,fruit1Image,fruit2,fruit2Image,fruit3,fruit3Image,fruit4,fruit4Image, fruits2Group;
var GameOver,GameOverImage,GameoverSound;
var enemyGroup,monster,enemyImage,enemyImage2;
var sword,swordImage,swordSound;

//function to load Images and animations
function preload(){
   fruit1Image = loadImage("fruit1.png");
   fruit2Image = loadImage("fruit2.png");
   fruit3Image = loadImage("fruit3.png");
   fruit4Image = loadImage("fruit4.png");
   enemyImage = loadAnimation("alien1.png","alien2.png");
   GameOverImage = loadImage("gameover.png");
   swordImage = loadImage("sword.png");
  GameoverSound = loadSound("gameover.mp3");
  swordSound = loadSound("knifeSwooshSound.mp3");
}

//fuction for sprites and canvas and groups
function setup(){
  createCanvas(500,500);
  
  sword = createSprite(40,200,20,20);
  sword.addImage("sword",swordImage);
  sword.scale = 0.7;
  
  GameOver = createSprite(250,250,20,20);
  GameOver.addImage("over",GameOverImage);
  
  score = 0;
  
  enemyGroup = new Group();
  fruitsGroup = new Group();
  fruits2Group = new Group();
}

//function to control the game
function draw(){
  background("red");
  textSize(20);
  text("Score:"+score,10,480)
  if(gamestate === PLAY){
     sword.y = World.mouseY;
     sword.x = World.mouseX;
    
    if(sword.isTouching(fruitsGroup)){
      score = score+1;
      fruitsGroup.destroyEach();
      swordSound.play();
    }
    
    if(sword.isTouching(fruits2Group)){
      score = score+1;
      fruits2Group.destroyEach();
      swordSound.play();
    }
    
    GameOver.visible = false;
    sword.visible = true;
    
    spawnFruits();
    Enemy(); 
    
    if(sword.isTouching(enemyGroup)){
      sword.x = 250;
      sword.y = 250;
      GameoverSound.play();
      gamestate = END;
    }
  }
  
  if(gamestate === END){
    fruitsGroup.destroyEach();
    fruits2Group.destroyEach();
    enemyGroup.destroyEach();
    fruitsGroup.setVelocityEach(0);
    fruits2Group.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    GameOver.visible = true;
    sword.visible = false;
    
  }
  drawSprites();
 


}

//function for fruits
function spawnFruits(){
  if(World.frameCount % 80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug = true;
    r = Math.round(random(1,4));
   if(r == 1){
      fruit.addImage("fruit",fruit1Image);
    } else if(r == 2){
      fruit.addImage("fruit2",fruit2Image);
    } else if(r == 3){
      fruit.addImage("fruit3",fruit3Image);
    } else{
      fruit.addImage("fruit4",fruit4Image);
    }
    fruit.velocityX = -(7+(score/4));
    fruit.setLifetime = 100;
    fruit.y = Math.round(random(50,350));
    fruitsGroup.add(fruit);    
    
    if(World.frameCount % 100===0){  
    fruit2 = createSprite(20,200,20,20);   
    fruit2.scale = 0.2;
    m = Math.round(random(1,4))
   if(m == 1){
      fruit2.addImage("fruit",fruit1Image);
    } else if(m == 2){
      fruit2.addImage("fruit2",fruit2Image);
    } else if(m == 3){
      fruit2.addImage("fruit3",fruit3Image);
    } else if(m == 4){
      fruit2.addImage("fruit4",fruit4Image);      
    }
    fruit2.velocityX = (7+(score/4));
    fruit2.setLifetime = 100;
    fruit2.y = Math.round(random(50,350));  
    

    fruits2Group.add(fruit2);  
  }
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",enemyImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    enemyGroup.add(monster);
  }
}