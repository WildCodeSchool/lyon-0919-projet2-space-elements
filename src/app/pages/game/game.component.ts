import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
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
  gameContainerRef: any;
  constructor(private shipService: ShipService) { }

  ngOnInit() {
    this.ship = this.shipService.choosenShip;
  }

  maxWidth : number = 580;
  minWidth : number = -580;
  maxHeight : number = -910;
  minHeight : number = 0;
  moveX : number = 0 ;
  moveY : number = 0 ;
  ammo = new Ammo;
  shipColor = document.getElementById('color')
  backgroundColor :string = "red";
  
  shoot : boolean = false;
  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    
    if (event.code === 'Space') {
      this.shoot = true;
      this.getAmmoPosition();
      let ammoMove = setInterval(()=>this.moveAmmo(),100);
    }
  
    if (event.code === 'KeyC' && this.backgroundColor === "red"){
      this.backgroundColor = "white";
      return;
    }
    if (event.code === 'KeyC' && this.backgroundColor === "white"){
      this.backgroundColor = "brown";
      return;
    }
    if (event.code === 'KeyC'&& this.backgroundColor === "brown"){
      this.backgroundColor = "blue";
      return;
    }
    if (event.code === 'KeyC'&& this.backgroundColor === "blue"){
    this.backgroundColor = "red";
    return;
  }  



    if (event.code === 'ArrowRight' && this.moveX < this.maxWidth ) {
      this.moveX = this.moveX + 10;
      console.log(this.moveX);
    
    }
    if (event.code === 'ArrowLeft' && this.moveX > this.minWidth) {
      this.moveX = this.moveX - 10;
      console.log(this.moveX);
    }
    if (event.code === 'ArrowDown' && this.moveY < this.minHeight) {
      this.moveY = this.moveY + 10;
      console.log(this.moveY);
;
    }
    if (event.code === 'ArrowUp' && this.moveY > this.maxHeight) {
      this.moveY = this.moveY - 10;
      console.log(this.moveY);
;
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
