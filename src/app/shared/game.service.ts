import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';
import { Enemy} from 'src/app/shared/enemy';
import { Game } from './game';

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
  enemyTypes : Object[] = [
    {'name' : 'fire', 'url' : '../../../assets/img/enemy_fire.png'},
    {'name' : 'water', 'url' : '../../../assets/img/enemy_water.png'},
    {'name': 'air', 'url' : '../../../assets/img/enemy_air.png'},
    {'name': 'earth', 'url' : '../../../assets/img/enemy_earth.png'},
    ]
  ship : Ship = {
    id : 0,
    url : '',
    posX: 0,
    posY: 880,
    height : 60,
    width : 40,
    size : 0,
    HP: 100,
    backgroundColor:"red",
  };
  game : Game = new Game;
  enemykill = 0;

  
  constructor() {
    // multi actions
    setInterval(() => {
      if (this.isShoot) {
        this.addAmmo();
      }
    }, 120);

    // mouvement
    setInterval(() => {
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

    // Ammo moving and killing enemy
    setInterval(() => {
      for (let ammo of this.ammos) {
            this.moveAmmo(ammo);
        for (let enemy of this.enemies){
          if((ammo.posX > enemy.posX) && (ammo.posX < enemy.posX + enemy.width)){
            if(ammo.posY < enemy.posY + enemy.height){       
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
              this.ammos.delete(ammo);
              return;
            }
          }
          if(ammo.posX + ammo.width > enemy.posX && ammo.posX + ammo.width < enemy.posX + enemy.width){
            if(ammo.posY < enemy.posY + enemy.height){       
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
              console.log(this.enemykill);
              this.ammos.delete(ammo);
            }
          }        

        }
      }
    }, 100);

    // Enemy moving down and colision of the ship with enemy
    this.moveEnemyAndCollision()    

  }

  //Function random
  randomNumber(min : number, max : number) {  
    return Math.floor(Math.random() * (max - min)+min);
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
    let ammo = new Ammo(this.ship.backgroundColor, this.ship.posX + 18, this.ship.posY - 10);
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
  }

  addEnemyLvl1() {
    this.intervalNumberEnemyLvl1 = setInterval(() => {
      let enemyX = this.randomNumber(this.game.minX+60, this.game.maxX);    
      let enemy = new Enemy(this.enemyTypes[this.randomNumber(0,4)], enemyX-60 , -20);
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
      let enemy = new Enemy(this.enemyTypes[this.randomNumber(0,4)], enemyX-60 , -20);
      this.enemies.add(enemy);
      this.enemyCount++;      
      if (this.enemyCount === 91) {
        clearInterval(this.intervalNumberEnemyLvl4);
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
      }
      else {
        enemy.posY = enemy.posY + 14;
      }
    }
  }

  moveEnemyAndCollision() {
    setInterval(() => {
      for (let enemy of this.enemies) {
        this.moveEnemy(enemy);
          if ( this.ship.posX < enemy.posX + enemy.width && this.ship.posX > enemy.posX){
            if ( this.ship.posY < enemy.posY + enemy.height && this.ship.posY > enemy.posY){
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
            }  
          }
          if ( this.ship.posX + this.ship.width < enemy.posX + enemy.width && this.ship.posX + this.ship.width> enemy.posX){
            if ( this.ship.posY < enemy.posY + enemy.height && this.ship.posY > enemy.posY){
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
            }  
          }
          if ( this.ship.posY + this.ship.height < enemy.posY + enemy.height && this.ship.posY + this.ship.height > enemy.posY ){
            if ( this.ship.posX < enemy.posX + enemy.width && this.ship.posX > enemy.posX){
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
            }
          }
          if ( this.ship.posY + this.ship.height < enemy.posY + enemy.height && this.ship.posY + this.ship.height > enemy.posY ){
            if ( this.ship.posX + this.ship.width < enemy.posX + enemy.width && this.ship.posX  + this.ship.width > enemy.posX){
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
            }
          }    
      }
    }, 200);
  }
}


