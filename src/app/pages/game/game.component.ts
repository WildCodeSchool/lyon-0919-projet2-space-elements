import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Input, } from '@angular/core';
import { Ship } from '../../shared/ship';
import { ShipService } from '../../shared/ship.service';
import { Ammo } from 'src/app/shared/ammo';
import { GameService } from 'src/app/shared/game.service';
import { Enemy } from 'src/app/shared/enemy';
import { Game } from 'src/app/shared/game';
import { Boss } from '../../shared/boss';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { RouterState } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { HomepageComponent } from '../homepage/homepage.component';
import { GameOverComponent } from 'src/app/components/game-over/game-over.component';
import { PauseComponent } from 'src/app/components/pause/pause.component';



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
  bossAmmos : Set<Ammo> = this.gameService.bossAmmos;
  ship : Ship = this.gameService.ship;
  enemies : Set<Enemy> = this.gameService.enemies;
  game :Game = new Game;
  score : number = this.gameService.enemykill;
  boss: Boss = this.gameService.boss;
  bossCreated: boolean = this.gameService.bossCreated;
  valueLifePercentage : number = 100;
  gamePaused : boolean = false;
  gameOver : number = 0;
 

//Weel animation:

currentState = 'fire';



  //game frame  
  @ViewChild('gameContainerElt', {static: false}) gameContainerElt: ElementRef;
  sizeGameContainer : number;
  widthTotal : number;
  heightTotal : number;
  

  // Ammo position
  ammoPosX = this.ship.posX + 45.116;
  ammoPosY = this.ship.posY - 10;
  currentPosition = this.ammoPosY;
  type = "fire"
  
  // bossAmmo position


  constructor(
    public shipService: ShipService,
    public gameService: GameService,
    public dialog : MatDialog,
    ) {}
    
    
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

     //Pause Game
    if (event.code === 'Escape' && this.gamePaused === false) {
      this.gameService.pauseGame();
      this.openPause()
      this.gamePaused = true;
      return;
    }
    if(event.code === 'Escape' && this.gamePaused === true){
      this.gameService.pauseGameReprise();
      this.gamePaused = false;
      return;
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

  //Affichage du score
  getScore() {
    return this.gameService.enemykill;
  };

  //Affichage Barre de Vie
  getLifePercentage(){
    this.valueLifePercentage = (this.gameService.ship.HP*10);
      if ( this.valueLifePercentage <= 0 && this.gameOver < 1){
          this.gameOver  = this.gameOver + 1;
          this.openGameOver();
          }
    return this.valueLifePercentage;
  }

  openGameOver() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    this.dialog.open(GameOverComponent, { panelClass: 'custom-dialogGameOver-container' });
   }

   openPause() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    this.dialog.open(PauseComponent, { panelClass: 'custom-dialog-container' });
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
  changeState() {

    this.currentState=this.currentState;
  
  switch (this.currentState) {
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
}

