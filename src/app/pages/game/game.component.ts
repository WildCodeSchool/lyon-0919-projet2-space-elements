import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { Ship } from '../../shared/ship';
import { ShipService } from '../../shared/ship.service';
import { Ammo } from 'src/app/shared/ammo';
import { GameService } from 'src/app/shared/game.service';
import { Ennemy } from 'src/app/shared/ennemy';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  ammo : Ammo 
  ammos : Set<Ammo> = this.gameService.ammos;
  ship : Ship = this.gameService.ship;
  ennemies : Set<Ennemy> = this.gameService.ennemies;

  
//game frame  
  @ViewChild('gameContainerElt', {static: false}) gameContainerElt: ElementRef;
  sizeGameContainer : number;
  widthTotal : number;
  heightTotal : number;


  constructor(
    public shipService: ShipService,
    public gameService: GameService
    ) { 
     
    }
    
  ngOnInit() {
    
    
  }
//Get the game mensurations
  ngAfterViewInit() {
    this.sizeGameContainer = this.gameContainerElt.nativeElement.clientWidth;
    this.widthTotal = window.innerWidth;
    this.heightTotal = window.innerHeight;
    this.gameService.maxShipX = this.gameContainerElt.nativeElement.clientWidth;
    
    // ennemy creation
   setInterval(()=>{
      this.gameService.addEnnemy(this.getMinContainerLimit(), this.getMaxContainerLimit())},1000)
    

    
    
  }
  getMaxContainerLimit(){
    return this.gameService.setMaxShipX(this.widthTotal, this.sizeGameContainer);
  }
  getMinContainerLimit(){
    return this.gameService.setMinShipX(this.widthTotal);
  }

//Get the keyborad key
  @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
      //space (shoot)
    if (event.code === 'Space') {
      this.gameService.addAmmo();
    }  
    
     // arrows (direction)
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
      

     // C (change type)
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
