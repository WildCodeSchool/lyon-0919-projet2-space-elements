import { Component, OnInit, HostListener, } from '@angular/core';
import { Ship } from '../../shared/ship';
import { ShipService } from '../../shared/ship.service';
import { Ammo } from 'src/app/shared/ammo';
import { GameService } from 'src/app/shared/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  ammo : Ammo 
  ammos : Ammo[] = this.gameService.ammos;
  ship : Ship = this.gameService.ship;
  
  gameContainerRef: any;
  maxWidth : number = 1160;
  minWidth : number = 0;
  maxHeight : number = 0;
  minHeight : number = 910;

  constructor(
    public shipService: ShipService,
    public gameService: GameService
    ) { }
    
  ngOnInit() {
    // this.ship = this.shipService.choosenShip;
  }

  @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
  if (event.code === 'Space') {
    let index = this.gameService.addAmmo();
    this.gameService.interval(index);
    console.log(this.ship.posX);
  }  
  
  
  if (event.code === 'ArrowRight' && this.ship.posX < this.maxWidth ) {
    this.ship.posX = this.ship.posX + 10;
    console.log(this.ship.posX);
    
  }
  if (event.code === 'ArrowLeft' && this.ship.posX > this.minWidth) {
    this.ship.posX = this.ship.posX - 10;
    console.log(this.ship.posX);
  }
  if (event.code === 'ArrowDown' && this.ship.posY < this.minHeight) {
    this.ship.posY = this.ship.posY + 10;
    console.log(this.ship.posY);
    
  }
  if (event.code === 'ArrowUp' && this.ship.posY > this.maxHeight) {
    this.ship.posY = this.ship.posY - 10;
    console.log(this.ship.posY);
  }
    

  
  if (event.code === 'KeyC' && this.ship.backgroundColor === "red"){
    this.ship.backgroundColor = "white";
    console.log('ok');
    return;
  }
  if (event.code === 'KeyC' && this.ship.backgroundColor === "white"){
    this.ship.backgroundColor = "brown";
    console.log('ca');
    return;
  }
  if (event.code === 'KeyC'&& this.ship.backgroundColor === "brown"){
    this.ship.backgroundColor = "blue";
    console.log('fonctionne');
    return;
  }
  if (event.code === 'KeyC'&& this.ship.backgroundColor === "blue"){
    this.ship.backgroundColor = "red";
    console.log('bien');
    return;
  }      
  } 
}
