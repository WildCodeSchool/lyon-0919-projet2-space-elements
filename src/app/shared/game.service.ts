import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';
import { Enemy} from 'src/app/shared/enemy';
import { Game } from './game';
import { Boss } from './boss';

@Injectable({
  providedIn: 'root'
})
export class GameService {
 
  enemies : Set<Enemy> = new Set<Enemy>();
  ammos : Set<Ammo> = new Set<Ammo>();
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
  intervalNumberEnemyLvl1: any;
  intervalNumberEnemyLvl2: any;
  intervalNumberEnemyLvl3: any;
  intervalNumberEnemyLvl4: any;
  PausemoveEnemy : any;
  PauseFireAmmo : any;
  PauseShip : any;
  PauseAmmoMove : any;

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
    height : 93,
    width : 100,
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
    this.moveEnemyAndCollision()    

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
            enemy.pic = this.getEnnemyPicture(this.enemyTypes[i]['url'][1]);
            break; 
          case 1 :
            enemy.pic = this.getEnnemyPicture(this.enemyTypes[i]['url'][2]);
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
  getEnnemyPicture(url) {
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
    this.ship.posY = heightTotal - this.ship.height - 10;
  }

  //Ammo addition and move
  addAmmo() {
    let ammo : Ammo;
    switch(this.ship.type){
      case this.shipTypes[0] :
        ammo = new Ammo(this.ammoTypes[0], this.ship.posX + 42.116, this.ship.posY - 10);
        break;
      case this.shipTypes[1] :
        ammo = new Ammo(this.ammoTypes[1], this.ship.posX + 42.116, this.ship.posY - 10);
        break;
     case this.shipTypes[2] :
        ammo = new Ammo(this.ammoTypes[2], this.ship.posX + 42.116, this.ship.posY - 10);
        break;
     case this.shipTypes[3] :
        ammo = new Ammo(this.ammoTypes[3], this.ship.posX + 42.116, this.ship.posY - 10);
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
        enemy.pic=this.getEnnemyPicture(this.enemyTypes[i]['url'][0]);
      }
    }
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
    }, 1700);
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
    }, 1400);
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
    }, 1100);
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

  moveEnemyLvl1(enemy:Enemy){
    if (enemy) {
      if (enemy.posY>this.game.maxY - enemy.height*2) {
        this.enemies.delete(enemy);
        this.ship.HP = this.ship.HP - 3 ;
      }
      else {
        enemy.posY = enemy.posY + 5;
      }
    }
  }
  moveEnemyLvl2(enemy:Enemy){
    if (enemy) {
      if (enemy.posY>this.game.maxY - enemy.height*2) {
        this.enemies.delete(enemy);
        this.ship.HP = this.ship.HP - 3 ;
      }
      else {
        enemy.posY = enemy.posY + 8;
      }
    }
  }
  moveEnemyLvl3(enemy:Enemy){
    if (enemy) {
      if (enemy.posY>this.game.maxY - enemy.height*2) {
        this.enemies.delete(enemy);
        this.ship.HP = this.ship.HP - 3 ;
      }
      else {
        enemy.posY = enemy.posY + 11;
      }
    }
  }
  moveEnemyLvl4(enemy:Enemy){
    if (enemy) {
      if (enemy.posY>this.game.maxY - enemy.height*2) {
        this.enemies.delete(enemy);
        this.ship.HP = this.ship.HP - 3 ;
      }
      else {
        enemy.posY = enemy.posY + 14;
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
                this.ship.HP = this.ship.HP -1 ;
                return;
              }  
            }
            if ( this.ship.posX + this.ship.width < enemy.posX + enemy.width && this.ship.posX + this.ship.width> enemy.posX){
              if ( this.ship.posY < enemy.posY + enemy.height && this.ship.posY > enemy.posY){
                this.enemies.delete(enemy);
                this.enemykill = this.enemykill + 1;
                this.ship.HP = this.ship.HP -1 ;
                return;
              }  
            }
            if ( this.ship.posY + this.ship.height < enemy.posY + enemy.height && this.ship.posY + this.ship.height > enemy.posY ){
              if ( this.ship.posX < enemy.posX + enemy.width && this.ship.posX > enemy.posX){
                this.enemies.delete(enemy);
                this.enemykill = this.enemykill + 1;
                this.ship.HP = this.ship.HP -1 ;
                return;
              }
            }
            if ( this.ship.posY + this.ship.height < enemy.posY + enemy.height && this.ship.posY + this.ship.height > enemy.posY ){
              if ( this.ship.posX + this.ship.width < enemy.posX + enemy.width && this.ship.posX  + this.ship.width > enemy.posX){
                this.enemies.delete(enemy);
                this.enemykill = this.enemykill + 1;
                this.ship.HP = this.ship.HP -1 ;
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


