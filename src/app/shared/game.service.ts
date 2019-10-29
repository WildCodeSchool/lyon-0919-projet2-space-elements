import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';
import { Enemy} from 'src/app/shared/enemy'

@Injectable({
  providedIn: 'root'
})
export class GameService {
 ammos : Ammo[] = new Array<Ammo>();
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

  // Ammo position
  ammoPosX = this.ship.posX + 18;
  ammoPosY = this.ship.posY - 10;
  currentPosition = this.ammoPosY;


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
  constructor() { }

  setMaxShipX(widthTotal, sizeGameContainer){
    this.maxShipX = (widthTotal*0.1) + sizeGameContainer - this.ship.size -10;
    console.log(this.maxShipX);
    return this.maxShipX;
  }
  setMinShipX(widthTotal){
    this.minShipX = (widthTotal*0.1);
    console.log(this.minShipX);
    return this.minShipX;
  }
  setMaxShipY(heightTotal){
    this.maxShipY = (heightTotal) - this.ship.size - 30;
    console.log(this.maxShipY);
    return this.maxShipY;
  }
  setMinShipY(){
    this.minShipY = 0;
    console.log(this.minShipX);
    return this.minShipY;
  }

  //position of ammo
  addAmmo() {
    let ammo = new Ammo('fire', this.ship.posX + 18, this.ship.posY - 10 );
    return this.ammos.push(ammo) - 1;    
  }
  

  moveAmmo(i: number) : void {
    if (this.ammos[i]) {
      if (this.ammos[i].posY < 0) {
        this.ammos.splice(i, 1);
      }
      else {
        this.ammos[i].posY = this.ammos[i].posY - 10;
        this.currentPosition -= 10;
        
        
      }

    }
    this.interval(i);
  }

  interval(index: number) {
    setTimeout(() => this.moveAmmo(index), 100);
   
  }



  
}


