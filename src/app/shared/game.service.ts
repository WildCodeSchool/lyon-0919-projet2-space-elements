import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';
import { Ennemy } from './ennemy';

@Injectable({
  providedIn: 'root'
})
export class GameService {
 
 ennemies : Set<Ennemy> = new Set<Ennemy>();

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

  maxShipX : number;
  minShipX : number;
  maxShipY : number;
  minShipY : number;

  ennemyX : number;
  ennemyY : number = -30;


  
  
  constructor() {
    setInterval(() => {
      for (let ammo of this.ammos) {
        this.moveAmmo(ammo);
      }
    }, 50);
    setInterval(() => {
      for (let ennemy of this.ennemies) {
        this.moveEnnemy(ennemy);
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

  
  //Ennemy addition and move
  addEnnemy(contMinX : number, contMaxX : number){
   
    this.ennemyX = this.randomNumber(contMinX, contMaxX)
    let ennemy = new Ennemy(this.types[this.randomNumber(0,3)], this.ennemyX,this.ennemyY )
    this.ennemies.add(ennemy);
  }

  moveEnnemy(ennemy:Ennemy){
    if (ennemy) {
      if (ennemy.posY>1080) {
        this.ennemies.delete(ennemy);
      }
      else {
        ennemy.posY = ennemy.posY + 5;
      }
    }
  }
}


