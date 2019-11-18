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
import { Obstacle } from 'src/app/shared/obstacle';
import { Bonus } from 'src/app/shared/bonus';
import { GameOverComponent } from 'src/app/components/game-over/game-over.component';
import { AlertPromise } from 'selenium-webdriver';
import { PauseComponent } from 'src/app/components/pause/pause.component';
import { VictoryComponent } from 'src/app/components/victory/victory.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('animateWeel', [

      state('fire', style({
        transform: 'rotate(0deg)',
        width: '150px',
        height: '150px',
        opacity: '0.7',
      })),  
      state('air', style({      
        transform: 'rotate(-60deg)',
        width: '150px',
        height: '150px',
        opacity: '0.7',
      })),

      state('earth', style({
        transform: 'rotate(-270deg)',
        width: '150px',
        height: '150px',
        opacity: '0.7',
      })),

      state('water', style({
        transform: 'rotate(-180deg)',
        width: '150px',
        height: '150px',
        opacity: '0.7',
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
  obstacles: Set<Obstacle> = this.gameService.obstacles;
  bonusArray: Set<Bonus> = this.gameService.bonusArray;
  game :Game = new Game;
  score : number = this.gameService.enemykill;
  boss: Boss = this.gameService.boss;
  bossCreated: boolean = this.gameService.bossCreated;
  valueLifePercentage : number = 100;
  valueLifePercentageBoss : number;
  gamePaused : boolean = false;
  gameOver : number = 0;
  wonLevel1 : number = 0;
  audioGame;
  resultHP : number;
 
 

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
    this.SoundGameInit()

    this.choosenShipGame()
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

  // obstacle creation
    this.gameService.addObstacle();

  //Bonus creation
    this.gameService.addBonusMalus();
    
  }
  
  //Get the keyborad key
  @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
  
    if(this.gameService.bonusType === 0)
    {
      if (event.code === 'Space') {
        //space (shoot)
        this.gameService.isShoot = true;
      } 
       // arrows (direction)
      if (event.code === 'ArrowRight' && this.ship.posX > this.gameService.game.minX) {
        
        this.gameService.mvLeft = true;
      }
      if (event.code === 'ArrowLeft' && this.ship.posX < this.gameService.game.maxX - this.gameService.ship.width) {
        
          this.gameService.mvRight = true;
      }
      if (event.code === 'ArrowDown' && this.ship.posY > 0 ) {
        
        this.gameService.mvUp = true; 
      }

      if (event.code === 'ArrowUp' && this.ship.posY < this.gameService.game.maxY - this.gameService.ship.height) {

          this.gameService.mvDown = true;
        
      }
      setTimeout(() => {
        this.gameService.bonusType = 1;
      },10000);
    } else {
      if (event.code === 'Space') {
        this.gameService.isShoot = true;
      }  
    
      // arrows (direction)
      if (event.code === 'ArrowRight' && this.ship.posX < this.gameService.game.maxX - this.gameService.ship.width) {
        
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

  //Score display
  getScore() {
    return this.gameService.enemykill;
  };

  //Display Ship lifeBar
  getLifePercentage(){
    this.valueLifePercentage = (this.gameService.ship.HP*10);
      if ( this.valueLifePercentage <= 0 && this.gameOver < 1){
          this.gameOver  = this.gameOver + 1;
          this.openGameOver();
          }
    return this.valueLifePercentage;
  }
  //Display Boss lifeBar
  getLifePercentageBoss(){
    return this.gameService.boss.HP;
  }
 



  //Game Over Modal
    openGameOver() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    this.dialog.open(GameOverComponent, { panelClass: 'custom-dialogGameOver-container' });
   }
   //Pause Modal
   openPause() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    this.dialog.open(PauseComponent, { panelClass: 'custom-dialog-container' });
   }
   
   
  @HostListener('document:keyup', ['$event'])
      onKeyupHandler(event: KeyboardEvent) {
        if(this.gameService.bonusType === 0)
        {
          if (event.code === 'Space') {
            this.gameService.isShoot = false;
             if ( this.gameService.sound === true){
              this.gameService.mySoundShoot.play();
            }
            else{
              this.gameService.mySoundShoot.pause()
            } 
            
          }
          if (event.code === 'ArrowRight') {
            this.gameService.mvLeft = false;
          }
          if (event.code === 'ArrowLeft') {
            this.gameService.mvRight = false;
          }
          if (event.code === 'ArrowDown') {
            this.gameService.mvUp = false;
          }
          if (event.code === 'ArrowUp') {
            this.gameService.mvDown = false;
          }
          setTimeout(() => {
            this.gameService.bonusType = 1;
          },10000);  
        }
        else{
          if (event.code === 'Space') {
            this.gameService.isShoot = false;
            if ( this.gameService.sound === false){
              this.gameService.mySoundShoot.pause()
            } 
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

  //SoundGameInit
  SoundGameInit(){
    if ( this.gameService.sound === true){
      this.audioGame = new Audio('../../../assets/Musique/knight20.mp3');
      this.audioGame.play();
    }
    else{
      this.audioGame = new Audio('../../../assets/Musique/knight20.mp3');
      this.audioGame.pause();
    }
  }

  //Sound Mute
  SoundMuted(){
    if ( this.gameService.sound === true){
      this.gameService.sound = false;
      let backElt = document.getElementById('SoundNoMuted');
      let frontElt = document.getElementById('SoundMuted');
      backElt.style.display = "none";
      frontElt.style.display = "block";
      this.audioGame.pause();
    }
    else{
      this.gameService.sound = true;
      let backElt = document.getElementById('SoundNoMuted');
      let frontElt = document.getElementById('SoundMuted');
      backElt.style.display = "block";
      frontElt.style.display = "none";
      this.audioGame.play();
    }
  }

  //ChoosenShipGame
  choosenShipGame(){
    //if ( this.shipService. === 1)

  }
}

