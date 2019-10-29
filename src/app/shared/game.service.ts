import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';
import { Ennemy } from './ennemy';

@Injectable({
  providedIn: 'root'
})
export class GameService {
 ammos : Ammo[] = new Array<Ammo>();
 ennemies : Ennemy[] = new Array<Ennemy>();

 types : string[] = ['fire','water','air','earth'];
 
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
  ennemyY : number = 0;


  constructor() { }
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
    return this.ammos.push(ammo) - 1;
    
  }
  
  moveAmmo(i: number) : void {
    if (this.ammos[i]) {
      if (this.ammos[i].posY < 0) {
        this.ammos.splice(i, 1);
      }
      else {
        this.ammos[i].posY = this.ammos[i].posY - 10;
      }

    }
    this.interval(i);
  }

  interval(index: number) {
    setTimeout(() => this.moveAmmo(index), 100);
  }

  //Ennemy addition and move
  addEnnemy(index : number, contMinX : number, contMaxX : number){
   
    this.ennemyX = this.randomNumber(contMinX, contMaxX)
    let ennemy = new Ennemy(this.types[this.randomNumber(0,3)], this.ennemyX,this.ennemyY )
    this.ennemies.push(ennemy);
    console.log(ennemy.posX);
  }
}


