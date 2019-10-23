import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Ship } from '../../shared/ship';
import { ShipService } from '../../shared/ship.service';
import { Ammo } from 'src/app/shared/ammo';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() ship: Ship;
  constructor(private shipService: ShipService) { }

  ngOnInit() {
    this.ship = this.shipService.choosenShip;
  }

  moveX : number = 0;
  moveY : number = 0;
  ammo = new Ammo;
  
  shoot : boolean = false;
  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    
    if (event.code === 'Space') {
      this.shoot = true;
      this.getAmmoPosition();
      let ammoMove = setInterval(()=>this.moveAmmo(),100);
    }

   


    if (event.code === 'ArrowRight') {
      this.moveX = this.moveX + 12;
    }
    if (event.code === 'ArrowLeft' && this.moveX > -600 ) {
      this.moveX = this.moveX - 12;
      
    }
    if (event.code === 'ArrowDown') {
      this.moveY = this.moveY + 12;
    }
    if (event.code === 'ArrowUp') {
      this.moveY = this.moveY - 12;
    }

  }
  getAmmoPosition(){
    this.ammo.posX = this.moveX+18;
    this.ammo.posY = this.moveY-10;
  }
  moveAmmo() : void {
    this.ammo.posY = this.ammo.posY-10;
   
  }
  
}
