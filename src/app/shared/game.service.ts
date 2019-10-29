import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';
import { Enemy} from 'src/app/shared/enemy'

@Injectable({
  providedIn: 'root'
})
export class GameService {

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


  enemy: Enemy ={
    id: 2,
    url: '',
    posX: 940,
    posY: 80,
    HP: 100,
    size: 40,
    width:80,
    height:80,
    backgroundColor:"blue",
    life : true,

  }
 
  constructor() {
    setInterval(() => {
      for (let ammo of this.ammos) {
        this.moveAmmo(ammo);
        if((ammo.posX > this.enemy.posX) && (ammo.posX < this.enemy.posX + this.enemy.width)){
          if(ammo.posY < this.enemy.posY){
          this.enemy.life = false;
          this.ammos.delete(ammo);

          }
        }
      }
    }, 50);

  }

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

  //position of ammo
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
}


