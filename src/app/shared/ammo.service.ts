import { Injectable } from '@angular/core';
import { Ammo } from './ammo';

@Injectable({
  providedIn: 'root'
})
export class AmmoService {
 ammos : Ammo[] = new Array<Ammo>();

  constructor() { }


addAmmo(){
  let ammo = new Ammo();
  this.ammos.push(ammo);
  console.log(this.ammos)
}

}

