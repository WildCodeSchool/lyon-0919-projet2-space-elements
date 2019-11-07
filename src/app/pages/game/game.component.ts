import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Input, } from '@angular/core';
import { Ship } from '../../shared/ship';
import { ShipService } from '../../shared/ship.service';
import { Ammo } from 'src/app/shared/ammo';
import { GameService } from 'src/app/shared/game.service';
import { Enemy } from 'src/app/shared/enemy';
import { Game } from 'src/app/shared/game';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { RouterState } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('animateWeel', [

      state('fire', style({
        transform: 'rotate(0deg)',
        width: '100px',
        height: '100px',
      })),  
      state('air', style({      
        transform: 'rotate(90deg)',
        width: '100px',
        height: '100px',
      })),

      state('earth', style({
        transform: 'rotate(270deg)',
        width: '100px',
        height: '100px',
      })),

      state('water', style({
        transform: 'rotate(180deg)',
        width: '100px',
        height: '100px',
      })),
   
      transition ('fire=>air', animate('000ms')),
      transition ('air=>earth', animate('000ms')),
      transition ('earth=>water', animate('000ms')),
      transition ('water=>fire', animate('000ms')),
    ]),
  ]
})
export class GameComponent implements OnInit, AfterViewInit {
  ammo : Ammo 
  ammos : Set<Ammo> = this.gameService.ammos;
  ship : Ship = this.gameService.ship;
  enemies : Set<Enemy> = this.gameService.enemies;
  game :Game = new Game;
  score : Number = this.gameService.enemykill;
  valueLifePercentage : Number = 100;
 

  //Weel animation:

currentState = 'fire';

changeState() {

  this.currentState=this.currentState;

switch (this.currentState) 
{
    case "fire":
      this.currentState = this.currentState === 'fire' ? 'air' : 'fire';
        break;

    case "air":
      this.currentState = this.currentState === 'air' ? 'earth' : 'air';
        break;

    case "earth":
      this.currentState = this.currentState === 'earth' ? 'water' : 'earth';
        break;

    case "water":
      this.currentState = this.currentState === 'water' ? 'fire' : 'water';
        break;

}
}

  //game frame  
  @ViewChild('gameContainerElt', {static: false}) gameContainerElt: ElementRef;
  sizeGameContainer : number;
  widthTotal : number;
  heightTotal : number;
  

  // Ammo position
  ammoPosX = this.ship.posX + 18;
  ammoPosY = this.ship.posY - 10;
  currentPosition = this.ammoPosY;
  type = "fire"
  


  constructor(
    public shipService: ShipService,
    public gameService: GameService
    ) { }
    
  ngOnInit() {
    
  }
  //Get the game mensurations
  ngAfterViewInit() {
    this.sizeGameContainer = this.gameContainerElt.nativeElement.clientWidth;
    this.widthTotal = window.innerWidth;
    this.heightTotal = window.innerHeight;

    this.game.minX = this.gameService.setMinX(this.widthTotal);
    this.game.maxX = this.gameService.setMaxX(this.widthTotal, this.sizeGameContainer);
    this.game.maxY = this.gameService.setMaxY(this.heightTotal);

    this.gameService.setShipX(this.widthTotal);
    this.gameService.setShipY(this.heightTotal);

    
  // ennemy creation
    this.gameService.addEnemy();
    
  }
  

//Get the keyborad key
  @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
      //space (shoot)
    if (event.code === 'Space') {
      this.gameService.isShoot = true;
    }  
    
     // arrows (direction)
    if (event.code === 'ArrowRight' && this.ship.posX < this.gameService.game.maxX - this.gameService.ship.width/2 - 10 ) {
      this.gameService.mvRight = true;    
    }
    if (event.code === 'ArrowLeft' && this.ship.posX > this.gameService.game.minX + 10) {
      this.gameService.mvLeft = true;
    }
    if (event.code === 'ArrowDown' && this.ship.posY < this.gameService.game.maxY - this.gameService.ship.height) {
      this.gameService.mvDown = true;    
    }
    if (event.code === 'ArrowUp' && this.ship.posY > 0 ) {
      this.gameService.mvUp = true;
    }
    

     // C (change type)
    if (event.code === 'KeyC' && this.ship.type === this.gameService.shipTypes[0]){
      this.ship.type = this.gameService.shipTypes[1];
      this.changeState();
      return;
    }
    if (event.code === 'KeyC' && this.ship.type === this.gameService.shipTypes[1]){
      this.ship.type = this.gameService.shipTypes[2];
      this.changeState();
      return;
    }
    if (event.code === 'KeyC'&& this.ship.type === this.gameService.shipTypes[2]){
      this.ship.type = this.gameService.shipTypes[3];
      this.changeState();
      return;
    }
    if (event.code === 'KeyC'&& this.ship.type === this.gameService.shipTypes[3]){
      this.ship.type = this.gameService.shipTypes[0];
      this.changeState();
      return;
    }      
  }

  getScore() {
    return this.gameService.enemykill;
  };

  getLifePercentage(){
    this.valueLifePercentage = (this.gameService.ship.HP*10);
      if ( this.valueLifePercentage <= 0){
        this.valueLifePercentage = 0;
      return;
    }
    return this.valueLifePercentage;
  }
  

   
  @HostListener('document:keyup', ['$event'])
      onKeyupHandler(event: KeyboardEvent) {
        if (event.code === 'Space') {
          this.gameService.isShoot = false;
        }
        if (event.code === 'ArrowRight') {
          this.gameService.mvRight = false;
        }
        if (event.code === 'ArrowLeft') {
          this.gameService.mvLeft = false;
        }
        if (event.code === 'ArrowDown') {
          this.gameService.mvDown = false;
        }
        if (event.code === 'ArrowUp') {
          this.gameService.mvUp = false;
        }
      }
}

