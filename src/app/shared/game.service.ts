import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';
import { Enemy} from 'src/app/shared/enemy';
import { Game } from './game';
import { Boss } from './boss';
import { Obstacle } from './obstacle';
import { Bonus } from './bonus';

@Injectable({
  providedIn: 'root'
})
export class GameService {
 
  enemies : Set<Enemy> = new Set<Enemy>();
  obstacles : Set<Obstacle> = new Set<Obstacle>();
  ammos : Set<Ammo> = new Set<Ammo>();
  bonusArray : Set<Bonus> = new Set<Bonus>();
  types : string[] = ['fire','water','air','earth'];
  isShoot: boolean = false;
  mvLeft: boolean = false;
  mvRight: boolean = false;
  mvUp: boolean = false;
  mvDown: boolean = false;
  mvUpRight: boolean = false;
  mvUpLeft: boolean = false;
  mvDownRight: boolean = false;
  mvDownLeft: boolean = false;
  enemyCount: number = 1;
  obstacleCount: number = 1;
  bonusCount: number = 1;
  bonusType: number;
  intervalNumberEnemyLvl1: any;
  intervalNumberEnemyLvl2: any;
  intervalNumberEnemyLvl3: any;
  intervalNumberEnemyLvl4: any;
  intervalNumberObstacleLvl1: any;
  PausemoveEnemy : any;
  PauseFireAmmo : any;
  PauseShip : any;
  PauseAmmoMove : any;

  obstaclesImg: String[] = [
    '/assets/img/asteroid2.png',
    '/assets/img/asteroid3.png'
  ]

  typeBonus: number[] = [0,1];

  shipTypes : Object[] = [
    {'name' : 'fire', 'url' : '/assets/img/ship_fire.png'},
    {'name': 'air', 'url' : '/assets/img/ship_air.png'},
    {'name': 'earth', 'url' : '/assets/img/ship_earth.png'},
    {'name' : 'water', 'url' : '/assets/img/ship_water.png'},
    ];
  
  enemyTypes : Object[] = [
    {'name' : 'fire', 'url' :[ '/assets/img/enemy_fire.png',
                               '/assets/img/enemy_fire_HP2.png',
                               '/assets/img/enemy_fire_HP1.png']},
    {'name': 'air', 'url' : ['/assets/img/enemy_air.png',
                             '/assets/img/enemy_air_HP2.png',
                             '/assets/img/enemy_air_HP1.png']},
    {'name': 'earth', 'url' : ['/assets/img/enemy_earth.png',
                              '/assets/img/enemy_earth_HP2.png',
                              '/assets/img/enemy_earth_HP1.png']},
    {'name' : 'water', 'url' : ['/assets/img/enemy_water.png',
                                '/assets/img/enemy_water_HP2.png',
                                '/assets/img/enemy_water_HP1.png']},
    ];
  ammoTypes : Object[] = [
    {'name' : 'fire', 'url' : '/assets/img/ammo_fire.png'},
    {'name': 'air', 'url' : '/assets/img/ammo_air.png'},
    {'name': 'earth', 'url' : '/assets/img/ammo_earth.png'},
    {'name' : 'water', 'url' : '/assets/img/ammo_water.png'},
    ];
  
  enemyHP : Object [] = [
    {'HP' : 3, 'url' : '/assets/img/ammo_fire.png'},
  ]  

  ship : Ship = {
    id : 0,
    url : '',
    posX: 0,
    posY: 880,
    height : 60,
    width : 40,
    size : 0,
    HP: 10,
    type: this.shipTypes[0],
  };

  boss: Boss;
  game : Game = new Game;
  enemykill = 0;
  bossCreated: boolean = false;

  
  constructor() {

    // mouvement
    this.movementShip();
    // multi actions
    this.multiAction();
    // Ammo moving and killing enemy
    this.ammoMove();
    //Move Enemy and Collision
    this.moveEnemyAndCollision();
    this.moveObstacleAndCollision(); 
    this.moveBonusAndCollision();

  }

  //Gestion des points de vie
  getShipHP(ship: Ship, value: number){
    ship.HP = ship.HP + value;
    if(ship.HP < 0)
    {
      ship.HP = 0;
    }
    if(ship.HP > 10)
    { ship.HP = 10}
    return ship.HP;
  }

  //Function to add obstacles
  addObstacle() {
    setInterval(() => {
      let obstacleX = this.randomNumber(this.game.minX+130, this.game.maxX-130*2);    
      let obstacle = new Obstacle(obstacleX-100 , -100);
      obstacle.pic = this.setObstaclePic(obstacle);
      this.obstacles.add(obstacle);
      this.obstacleCount++;
    }, 10000);
  }

  //function to add bonus or malus
  addBonusMalus() {
    setInterval(() => {
      let bonusX = this.randomNumber(this.game.minX+100, this.game.maxX-100*2);    
      let bonus = new Bonus(bonusX-100 , -100);
      bonus.pic = this.setBonusPic(bonus);
      console.log(bonus.pic)
      this.bonusArray.add(bonus);
      this.bonusCount++;
    }, 5000);
  }


  //Function to move obstacles
  moveObstacle(obstacle: Obstacle){
    if (obstacle) {
      if (obstacle.posY>this.game.maxY - obstacle.height) {
        this.obstacles.delete(obstacle);
      }
      else {
        obstacle.posY = obstacle.posY + 10;
      }
    }
  }

  //Function to move bonus
  moveBonus(bonus: Bonus){
    if (bonus) {
      if (bonus.posY>this.game.maxY - bonus.height) {
        this.bonusArray.delete(bonus);
      }
      else {
        bonus.posY = bonus.posY + 2;
      }
    }
  }

  //Function to do damage
  doDamage(ammo : Ammo,enemy: Enemy){
    let truc = [[1,2,3],[2,3,0],[3,0,1],[0,1,2]]
    for(let i=0; i<4; i++){
   
      switch(ammo.type){
        case this.ammoTypes[i]:
          switch(enemy.type){
            case this.enemyTypes[truc[i][0]]:
              enemy.HP -= 3;
              break;
            case this.enemyTypes[truc[i][1]]:
              enemy.HP -= 2;
              break;
            case this.enemyTypes[truc[i][2]]:
              enemy.HP -= 1;
              break;
          }
      
        if(enemy.HP<=0){
          this.enemies.delete(enemy);
          this.enemykill = this.enemykill + 1;
        }
        break;
      }
  }
    return enemy.HP;
  }
  //Function ToSeeDamage
  VisuDamage(enemy : Enemy){

   for(let i=0; i<4; i++){
     switch(enemy.type){
       case this.enemyTypes[i]:
         switch(enemy.HP){
          case 2 :
            enemy.pic = this.getUrlPicture(this.enemyTypes[i]['url'][1]);
            break; 
          case 1 :
            enemy.pic = this.getUrlPicture(this.enemyTypes[i]['url'][2]);
            break; 
         }
     }
   }
   return enemy.pic;
  }
  //Function random
  randomNumber(min : number, max : number) {  
    return Math.floor(Math.random() * (max - min)+min);
  }

  //get enemy pic url 
  getUrlPicture(url) {
    return `url('${url}')`;
  }
  
  //Functions to define the container size
  setMaxX(widthTotal, sizeGameContainer){
    this.game.maxX = (widthTotal*0.1) + sizeGameContainer;
    return this.game.maxX;
  }
  setMinX(widthTotal){
    this.game.minX = (widthTotal*0.1);
    return this.game.minX;
  }
  setMaxY(heightTotal){
    this.game.maxY = (heightTotal);
    return this.game.maxY;
  }
  setMinY(){
    this.game.minY = 0;
    return this.game.minY;
  }

  //Position of the ship
  setShipX(widthTotal){
    this.ship.posX = widthTotal/2;
  }
  setShipY(heightTotal){
    this.ship.posY = heightTotal - this.ship.height;
  }

  //Ammo addition and move
  addAmmo() {
    let ammo : Ammo;
    switch(this.ship.type){
      case this.shipTypes[0] :
        ammo = new Ammo(this.ammoTypes[0], this.ship.posX + 18, this.ship.posY - 10);
        break;
      case this.shipTypes[1] :
        ammo = new Ammo(this.ammoTypes[1], this.ship.posX + 18, this.ship.posY - 10);
        break;
     case this.shipTypes[2] :
        ammo = new Ammo(this.ammoTypes[2], this.ship.posX + 18, this.ship.posY - 10);
        break;
     case this.shipTypes[3] :
        ammo = new Ammo(this.ammoTypes[3], this.ship.posX + 18, this.ship.posY - 10);
        break;
    }
      return this.ammos.add(ammo);
  }
  
  moveAmmo(ammo: Ammo) : void {
    ammo.posY = ammo.posY - 15;
    if (ammo) {
      if (ammo.posY < 0) {
        this.ammos.delete(ammo);
      }
      else {
        ammo.posY = ammo.posY - 5;
      }
    }
  }

  
  //Enemy addition
  addEnemy(){
    if  (this.enemyCount < 16) {
      this.addEnemyLvl1();
    }
    else if (this.enemyCount < 36) {
      this.addEnemyLvl2();
    }
    else if (this.enemyCount < 61) {
      this.addEnemyLvl3();
    }
    else if (this.enemyCount < 91) {
      this.addEnemyLvl4();
    }
    else if (this.enemyCount === 91) {
      setTimeout(() => {
        let bossX = this.randomNumber(this.game.minX+300, this.game.maxX);
        this.boss = new Boss(bossX-300, 0, 'red');
      }, 5000);
    }
  }
  //Function to set enemy first pic
  setEnemyPic(enemy){
    for (let i =0; i<4; i++){
      if (enemy.type === this.enemyTypes[i]){
        enemy.pic=this.getUrlPicture(this.enemyTypes[i]['url'][0]);
      }
    }
  }

  setObstaclePic(obstacle){
    let index = this.randomNumber(0, this.obstaclesImg.length+1)
        return obstacle.pic=this.getUrlPicture(this.obstaclesImg[index]);
  }

  setBonusPic(bonus){
        return bonus.pic = this.getUrlPicture(bonus.pic);
  }

  addEnemyLvl1() {
    this.intervalNumberEnemyLvl1 = setInterval(() => {
      let enemyX = this.randomNumber(this.game.minX+60, this.game.maxX);    
      let enemy = new Enemy(this.enemyTypes[this.randomNumber(0,4)], enemyX-60 , -20);
      this.setEnemyPic(enemy);
      this.enemies.add(enemy);
      this.enemyCount++; 
      if (this.enemyCount === 16) {
        clearInterval(this.intervalNumberEnemyLvl1);
        this.addEnemy();
      }
    }, 3000);
  }
  
  addEnemyLvl2() {
    this.intervalNumberEnemyLvl2 = setInterval(() => {
      let enemyX = this.randomNumber(this.game.minX+60, this.game.maxX);    
      let enemy = new Enemy(this.enemyTypes[this.randomNumber(0,4)], enemyX-60 , -20);
      this.setEnemyPic(enemy);
      this.enemies.add(enemy);
      this.enemyCount++;      
      if (this.enemyCount === 36) {
        clearInterval(this.intervalNumberEnemyLvl2);
        this.addEnemy();
      }
    }, 3300);
  }

  addEnemyLvl3() {
    this.intervalNumberEnemyLvl3 = setInterval(() => {
      let enemyX = this.randomNumber(this.game.minX+60, this.game.maxX);    
      let enemy = new Enemy(this.enemyTypes[this.randomNumber(0,4)], enemyX-60 , -20);
      this.setEnemyPic(enemy);
      this.enemies.add(enemy);
      this.enemyCount++;      
      if (this.enemyCount === 61) {
        clearInterval(this.intervalNumberEnemyLvl3);
        this.addEnemy();
      }
    }, 3600);
  }

  addEnemyLvl4() {
    this.intervalNumberEnemyLvl4 = setInterval(() => {
      let enemyX = this.randomNumber(this.game.minX+60, this.game.maxX);    
      let enemy = new Enemy(this.enemyTypes[this.randomNumber(0,4)] , enemyX-60 , -20);
      this.setEnemyPic(enemy);
      this.enemies.add(enemy);
      this.enemyCount++;      
      if (this.enemyCount === 91) {
        clearInterval(this.intervalNumberEnemyLvl4);
        console.log(this.enemyCount);
        this.addEnemy();
      }
    }, 800);
  }

  // Enemy moves
  moveEnemy(enemy: Enemy){
    if  (this.enemyCount < 16) {
      this.moveEnemyLvl1(enemy);
    }
    else if (this.enemyCount < 36) {
      this.moveEnemyLvl2(enemy);
    }
    else if (this.enemyCount < 61) {
      this.moveEnemyLvl3(enemy);
    }
    else if (this.enemyCount <= 91) {
      this.moveEnemyLvl4(enemy);
    }
  }

   //test Fonction bouger l'ennemi horizontalement

   moveEnemyX(enemy: Enemy)
   {
    enemy.posX = enemy.posX + Math.floor(Math.random()*20) - 10;
     if(enemy.posX<this.game.minX)
     {
       enemy.posX = this.game.minX;
     }
     if(enemy.posX>this.game.maxX-60)
     {
       enemy.posX = this.game.maxX - (enemy.width+60*2);
     }
   }

  moveEnemyLvl1(enemy:Enemy){
    if (enemy) {
      if (enemy.posY>this.game.maxY - enemy.height*2) {
        this.enemies.delete(enemy);
        this.ship.HP = this.getShipHP(this.ship, -3) ;
      }
      else {
        enemy.posY = enemy.posY + 5;
        this.moveEnemyX(enemy);
      }
    }
  }

  moveEnemyLvl2(enemy:Enemy){
    if (enemy) {
      if (enemy.posY>this.game.maxY - enemy.height*2) {
        this.enemies.delete(enemy);
        this.ship.HP = this.getShipHP(this.ship, -3) ;
      }
      else {
        enemy.posY = enemy.posY + 8;
        this.moveEnemyX(enemy);
      }
    }
  }
  moveEnemyLvl3(enemy:Enemy){
    if (enemy) {
      if (enemy.posY>this.game.maxY - enemy.height*2) {
        this.enemies.delete(enemy);
        this.ship.HP = this.getShipHP(this.ship, -3) ;
      }
      else {
        enemy.posY = enemy.posY + 11;
        this.moveEnemyX(enemy);
      }
    }
  }
  moveEnemyLvl4(enemy:Enemy){
    if (enemy) {
      if (enemy.posY>this.game.maxY - enemy.height*2) {
        this.enemies.delete(enemy);
        this.ship.HP = this.getShipHP(this.ship, -3);
      }
      else {
        enemy.posY = enemy.posY + 14;
        this.moveEnemyX(enemy);
      }
    }
  }
//moveEnemyAndCollision
moveEnemyAndCollision() {
    this.PausemoveEnemy =   setInterval(() => {
        for (let enemy of this.enemies) {
          this.moveEnemy(enemy);
            if ( this.ship.posX < enemy.posX + enemy.width && this.ship.posX > enemy.posX){
              if ( this.ship.posY < enemy.posY + enemy.height && this.ship.posY > enemy.posY){
                this.enemies.delete(enemy);
                this.enemykill = this.enemykill + 1;
                this.ship.HP = this.getShipHP(this.ship, -1);
                return;
              }  
            }
            if ( this.ship.posX + this.ship.width < enemy.posX + enemy.width && this.ship.posX + this.ship.width> enemy.posX){
              if ( this.ship.posY < enemy.posY + enemy.height && this.ship.posY > enemy.posY){
                this.enemies.delete(enemy);
                this.enemykill = this.enemykill + 1;
                this.ship.HP = this.getShipHP(this.ship, -1) ;
                return;
              }  
            }
            if ( this.ship.posY + this.ship.height < enemy.posY + enemy.height && this.ship.posY + this.ship.height > enemy.posY ){
              if ( this.ship.posX < enemy.posX + enemy.width && this.ship.posX > enemy.posX){
                this.enemies.delete(enemy);
                this.enemykill = this.enemykill + 1;
                this.ship.HP = this.getShipHP(this.ship, -1) ;
                return;
              }
            }
            if ( this.ship.posY + this.ship.height < enemy.posY + enemy.height && this.ship.posY + this.ship.height > enemy.posY ){
              if ( this.ship.posX + this.ship.width < enemy.posX + enemy.width && this.ship.posX  + this.ship.width > enemy.posX){
                this.enemies.delete(enemy);
                this.enemykill = this.enemykill + 1;
                this.ship.HP = this.getShipHP(this.ship, -1);
                return;
              }
            }    
        }
      }, 200);
    
  }

  moveObstacleAndCollision() {
    this.PausemoveEnemy =   setInterval(() => {
        for (let obstacle of this.obstacles) {
          this.moveObstacle(obstacle);
            if ( this.ship.posX < obstacle.posX + obstacle.width && this.ship.posX > obstacle.posX){
              if ( this.ship.posY < obstacle.posY + obstacle.height && this.ship.posY > obstacle.posY){
                this.obstacles.delete(obstacle);
                this.ship.HP = this.getShipHP(this.ship, -1) ;
                return;
              }  
            }
            if ( this.ship.posX + this.ship.width < obstacle.posX + obstacle.width && this.ship.posX + this.ship.width> obstacle.posX){
              if ( this.ship.posY < obstacle.posY + obstacle.height && this.ship.posY > obstacle.posY){
                this.obstacles.delete(obstacle);
                this.ship.HP = this.getShipHP(this.ship, -1) ;
                return;
              }  
            }
            if ( this.ship.posY + this.ship.height < obstacle.posY + obstacle.height && this.ship.posY + this.ship.height > obstacle.posY ){
              if ( this.ship.posX < obstacle.posX + obstacle.width && this.ship.posX > obstacle.posX){
                this.obstacles.delete(obstacle);
                this.ship.HP = this.getShipHP(this.ship, -1);
                return;
              }
            }
            if ( this.ship.posY + this.ship.height < obstacle.posY + obstacle.height && this.ship.posY + this.ship.height > obstacle.posY ){
              if ( this.ship.posX + this.ship.width < obstacle.posX + obstacle.width && this.ship.posX  + this.ship.width > obstacle.posX){
                this.obstacles.delete(obstacle);
                this.ship.HP = this.getShipHP(this.ship, -1) ;
                return;
              }
            }    
        }
      }, 200);
    
  }

  //moveBonusAndCollision
moveBonusAndCollision() {
  this.PausemoveEnemy =   setInterval(() => {
      for (let bonus of this.bonusArray) {
        this.moveBonus(bonus);
          if ( this.ship.posX < bonus.posX + bonus.width && this.ship.posX > bonus.posX){
            if ( this.ship.posY < bonus.posY + bonus.height && this.ship.posY > bonus.posY){
              this.bonusArray.delete(bonus);
              bonus.type = this.typeBonus[this.randomNumber(0,2)];
              this.bonusType = bonus.type;
              if(this.bonusType === 1)
              {
                this.ship.HP = this.getShipHP(this.ship, 2)
                console.log(this.bonusType)
              }
              return;
            }  
          }
          if ( this.ship.posX + this.ship.width < bonus.posX + bonus.width && this.ship.posX + this.ship.width> bonus.posX){
            if ( this.ship.posY < bonus.posY + bonus.height && this.ship.posY > bonus.posY){
              this.bonusArray.delete(bonus);
              bonus.type = this.typeBonus[this.randomNumber(0,2)];
              this.bonusType = bonus.type;
              if(this.bonusType === 1)
              {
                this.ship.HP = this.getShipHP(this.ship, 2)
                console.log(this.bonusType)
              }
              return;
            }  
          }
          if ( this.ship.posY + this.ship.height < bonus.posY + bonus.height && this.ship.posY + this.ship.height > bonus.posY ){
            if ( this.ship.posX < bonus.posX + bonus.width && this.ship.posX > bonus.posX){
              this.bonusArray.delete(bonus);
              bonus.type = this.typeBonus[this.randomNumber(0,2)];
              this.bonusType = bonus.type;
              if(this.bonusType === 1)
              {
                this.ship.HP = this.getShipHP(this.ship, 2)
                console.log(this.bonusType)
              }
              return;
            }
          }
          if ( this.ship.posY + this.ship.height < bonus.posY + bonus.height && this.ship.posY + this.ship.height > bonus.posY ){
            if ( this.ship.posX + this.ship.width < bonus.posX + bonus.width && this.ship.posX  + this.ship.width > bonus.posX){
              this.bonusArray.delete(bonus);
              bonus.type = this.typeBonus[this.randomNumber(0,2)];
              this.bonusType = bonus.type;
              if(this.bonusType === 1)
              {
                this.ship.HP = this.getShipHP(this.ship, 2)
                console.log(this.bonusType)
              }
              return;
            }
          }    
      }
    }, 200);
  
}

  //DeclarationMethode movementShip
  movementShip(){
    this.PauseShip = setInterval(() => {
                        if (this.mvRight && this.ship.posX < this.game.maxX - this.ship.width/2 - 10 ) {
                          this.ship.posX = this.ship.posX + 10;
                        }
                        if (this.mvLeft && this.ship.posX > this.game.minX + 10) {
                          this.ship.posX = this.ship.posX - 10;
                        }
                        if (this.mvUp && this.ship.posY > 0) {
                          this.ship.posY = this.ship.posY - 10;
                        }
                        if (this.mvDown && this.ship.posY < this.game.maxY - this.ship.height) {
                          this.ship.posY = this.ship.posY + 10;
                        }
                      }, 50);
    }

  //DeclarationMethode multiAction
  multiAction(){
  this.PauseFireAmmo = setInterval(() => {
    if (this.isShoot) {
      this.addAmmo();
    }
  }, 120);
  }
  //DeclarationMethode multiAction
  ammoMove(){
    this.PauseAmmoMove =  setInterval(() => {
      for (let ammo of this.ammos) {
            this.moveAmmo(ammo);
        for (let enemy of this.enemies){
          if((ammo.posX > enemy.posX) && (ammo.posX < enemy.posX + enemy.width)){
            if(ammo.posY < enemy.posY + enemy.height){       
              enemy.HP = this.doDamage(ammo,enemy)
              enemy.pic = this.VisuDamage(enemy);
              this.ammos.delete(ammo);
              return;
            }
          }
          if(ammo.posX + ammo.width > enemy.posX && ammo.posX + ammo.width < enemy.posX + enemy.width){
            if(ammo.posY < enemy.posY + enemy.height){       
              enemy.HP = this.doDamage(ammo,enemy)
              enemy.pic = this.VisuDamage(enemy);
              this.ammos.delete(ammo);
            }
          }        

        }
      }
    }, 100);
  }

  //Ouverture fenetre Modale GameOver
  fenetreModale(): void {
    let modaleGameOver = document.getElementById('GameOver');
    modaleGameOver.style.display="block";
    this.pauseGame();
  }
  
  //Pause du game
  pauseGame(){
    clearTimeout(this.PausemoveEnemy);
    clearTimeout(this.intervalNumberEnemyLvl1);
    clearTimeout(this.intervalNumberEnemyLvl2);
    clearTimeout(this.intervalNumberEnemyLvl3);
    clearTimeout(this.intervalNumberEnemyLvl4);
    clearTimeout(this.PauseFireAmmo);
    clearTimeout(this.PauseShip);
    clearTimeout(this.PauseAmmoMove);
  };

  //Reprise du game
  pauseGameReprise(){
    this.moveEnemyAndCollision();
    this.addEnemy();
    this.movementShip();
    this.multiAction();
    this.ammoMove();
  };
}


