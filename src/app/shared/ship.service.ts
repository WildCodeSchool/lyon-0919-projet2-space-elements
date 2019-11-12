import { Injectable } from '@angular/core';
import { Ship } from './ship';
import { SHIPS } from './mock-ships';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  ships: Ship[] = SHIPS;
  choosenShip : Ship;

  constructor() { }

  setChoosenShip(ship: Ship)
  {
    if (this.choosenShip) {
      this.choosenShip.size = 100;
    }
    this.choosenShip = ship;
    this.choosenShip.size = 150;
    return this.choosenShip;
  }
}
