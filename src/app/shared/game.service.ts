import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';
import { Enemy} from 'src/app/shared/enemy';

@Injectable({
  providedIn: 'root'
})
export class GameService {
 
 enemies : Set<Enemy> = new Set<Enemy>();

 types : string[] = ['fire','water','air','earth'];
 
 ammos : Set<Ammo> = new Set<Ammo>();

 ship : Ship = {
    id: 1,
    url: '',
    posX: 940,
    posY: 880,
    HP: 100,
    size: 40,
    backgroundColor:"red",
  };
  // Ship position
  maxShipX : number;
  minShipX : number;
  maxShipY : number;
  minShipY : number;

  enemyX : number;
  enemyY : number = -30;
  
  constructor() {
    setInterval(() => {
      for (let ammo of this.ammos) {
            this.moveAmmo(ammo);
      for (let enemy of this.enemies){
        if((ammo.posX > enemy.posX) && (ammo.posX < enemy.posX + enemy.width)){
          if(ammo.posY < enemy.posY + enemy.height){       
            this.enemies.delete(enemy);
            this.ammos.delete(ammo);
          }
        if(ammo.posX + ammo.width > enemy.posX && ammo.posX + ammo.width < enemy.posX + enemy.width){
          if(ammo.posY < enemy.posY + enemy.height){       
            this.enemies.delete(enemy);
            this.ammos.delete(ammo);
          }

        }          
          
        }

      }
      }
    }, 50);
    setInterval(() => {
      for (let enemy of this.enemies) {
        this.moveEnemy(enemy);
      }
    }, 200);

  }


  //Function random
  randomNumber(min : number, max : number) {  
    return Math.floor(Math.random() * (max - min)+min);
  }

  
  //Functions to define the container size
  setMaxShipX(widthTotal, sizeGameContainer){
    this.maxShipX = (widthTotal*0.1) + sizeGameContainer - this.ship.size -10;
    return this.maxShipX;
  }
  setMinShipX(widthTotal){
    this.minShipX = (widthTotal*0.1);
    return this.minShipX;
  }
  setMaxShipY(heightTotal){
    this.maxShipY = (heightTotal) - this.ship.size - 30;
    return this.maxShipY;
  }
  setMinShipY(){
    this.minShipY = 0;
    return this.minShipY;
  }

  //Ammo addition and move
  addAmmo() {
    let ammo = new Ammo('fire', this.ship.posX + 18, this.ship.posY - 10);
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

  
  //Enemy addition and move
  addEnemy(contMinX : number, contMaxX : number){
   
    this.enemyX = this.randomNumber(contMinX, contMaxX)
    let enemy = new Enemy(this.types[this.randomNumber(0,3)], this.enemyX,this.enemyY )
    this.enemies.add(enemy);
  }

  moveEnemy(enemy:Enemy){
    if (enemy) {
      if (enemy.posY>1080) {
        this.enemies.delete(enemy);
      }
      else {
        enemy.posY = enemy.posY + 5;
      }
    }
  }
}


