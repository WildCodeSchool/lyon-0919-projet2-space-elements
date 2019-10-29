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
  ammo : Ammo 
  ammos : Set<Ammo> = this.gameService.ammos;
  ship : Ship = this.gameService.ship;
  
  @ViewChild('gameContainerElt', {static: false}) gameContainerElt: ElementRef;
  sizeGameContainer : number;
  widthTotal : number;
  heightTotal : number;

  constructor(
    public shipService: ShipService,
    public gameService: GameService
    ) { }
    
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
      this.gameService.addAmmo();
    }  
    
    
    if (event.code === 'ArrowRight' && this.ship.posX < this.gameService.setMaxShipX(this.widthTotal, this.sizeGameContainer) ) {
      this.ship.posX = this.ship.posX + 10;    
    }
    if (event.code === 'ArrowLeft' && this.ship.posX > this.gameService.setMinShipX(this.widthTotal)) {
      this.ship.posX = this.ship.posX - 10;
    }
    if (event.code === 'ArrowDown' && this.ship.posY < this.gameService.setMaxShipY(this.heightTotal)) {
      this.ship.posY = this.ship.posY + 10;    
    }
    if (event.code === 'ArrowUp' && this.ship.posY > this.gameService.setMinShipY()) {
      this.ship.posY = this.ship.posY - 10;
    }
      

    
    if (event.code === 'KeyC' && this.ship.backgroundColor === "red"){
      this.ship.backgroundColor = "white";
      return;
    }
    if (event.code === 'KeyC' && this.ship.backgroundColor === "white"){
      this.ship.backgroundColor = "brown";
      return;
    }
    if (event.code === 'KeyC'&& this.ship.backgroundColor === "brown"){
      this.ship.backgroundColor = "blue";
      return;
    }
    if (event.code === 'KeyC'&& this.ship.backgroundColor === "blue"){
      this.ship.backgroundColor = "red";
      return;
    }      
  } 
}
