import { Component, OnInit, HostListener } from '@angular/core';
import { Ammo } from 'src/app/shared/ammo';
import { AmmoService } from 'src/app/shared/ammo.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  ammo = new Ammo;
  ammos : Ammo[] = new Array<Ammo>();
  moveX : number = 250;
  moveY : number = 250;
  shoot : boolean = false;

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    
    if (event.code === 'Space') {
      this.ammoService.addAmmo();
      this.ammos = this.ammoService.ammos;
      this.getAmmoPosition();
      let ammoMove = setInterval(()=>this.moveAmmo(),100);
    }

   
    if (event.code === 'ArrowRight') {
      this.moveX = this.moveX + 12  ;
    }
    if (event.code === 'ArrowLeft') {
      this.moveX = this.moveX - 12  ;
    }
    if (event.code === 'ArrowDown') {
      this.moveY = this.moveY + 12  ;
    }
    if (event.code === 'ArrowUp') {
      this.moveY = this.moveY - 12  ;
    }
  }

  constructor(private ammoService : AmmoService) { }

  ngOnInit() {
  }
  getAmmoPosition(){
    this.ammo.posX = this.moveX+18;
    this.ammo.posY = this.moveY-10;
  }
  moveAmmo() : void {
    this.ammo.posY = this.ammo.posY-10;
   
  }
  
}
