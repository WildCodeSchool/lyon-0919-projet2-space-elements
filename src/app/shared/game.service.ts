import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';

@Injectable({
  providedIn: 'root'
})
export class GameService {
 ammos : Ammo[] = new Array<Ammo>();
 ship : Ship = {
    id: 1,
    url: '',
    posX: 0,
    posY: 0,
    HP: 100,
    size: '' 
  };

  constructor() { }

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

}


