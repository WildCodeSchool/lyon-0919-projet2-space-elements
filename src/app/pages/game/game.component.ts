import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { Ship } from '../../shared/ship';
import { ShipService } from '../../shared/ship.service';
import { Ammo } from 'src/app/shared/ammo';
import { GameService } from 'src/app/shared/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  ammos : Ammo[] = this.gameService.ammos;
  ship : Ship = this.gameService.ship;
  
  @ViewChild('gameContainerElt', {static: false}) gameContainerElt: ElementRef;
  sizeGameContainer : number;
  widthTotal : number;
  heightTotal : number;

  constructor(
    public shipService: ShipService,
    public gameService: GameService,
    ) {}
    
  ngOnInit() {
    // this.ship = this.shipService.choosenShip;
    
  }
  
  ngAfterViewInit() {
    this.sizeGameContainer = this.gameContainerElt.nativeElement.clientWidth;
    this.widthTotal = window.innerWidth;
    this.heightTotal = window.innerHeight;
    this.gameService.maxShipX = this.gameContainerElt.nativeElement.clientWidth;
  }

  @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
  if (event.code === 'Space') {
    let index = this.gameService.addAmmo();
    this.gameService.interval(index);
    console.log(this.ship.posX);
  if ( event.code === 'Space' && this.ship.backgroundColor === "red"){
      //this.ammo.backgroundColor = "red"
      return;
    }
  if ( event.code === 'Space' && this.ship.backgroundColor === "white"){
      //this.ammo.backgroundColor = "white"
      return;
    }
  if ( event.code === 'Space' && this.ship.backgroundColor === "brown"){
      //this.ammo.backgroundColor = "brown"
      return;
    }
  if ( event.code === 'Space' && this.ship.backgroundColor === "blue"){
      //this.ammo.backgroundColor = "blue"
      return;
    }
  }  
  
  
  if (event.code === 'ArrowRight' && this.ship.posX < this.gameService.setMaxShipX(this.widthTotal, this.sizeGameContainer) ) {
    this.ship.posX = this.ship.posX + 10;
    console.log(this.ship.posX);
    
  }
  if (event.code === 'ArrowLeft' && this.ship.posX > this.gameService.setMinShipX(this.widthTotal)) {
    this.ship.posX = this.ship.posX - 10;
    console.log(this.ship.posX);
  }
  if (event.code === 'ArrowDown' && this.ship.posY < this.gameService.setMaxShipY(this.heightTotal)) {
    this.ship.posY = this.ship.posY + 10;
    console.log(this.ship.posY);
    
  }
  if (event.code === 'ArrowUp' && this.ship.posY > this.gameService.setMinShipY()) {
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
