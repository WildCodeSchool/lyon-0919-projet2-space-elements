import { Component, OnInit, HostListener } from '@angular/core';
import { Ammo } from 'src/app/shared/ammo';
import { GameService } from 'src/app/shared/game.service';
import { Ship } from 'src/app/shared/ship';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  ammo : Ammo 
  ammos : Ammo[] = this.gameService.ammos;
  ship : Ship = this.gameService.ship;
  

  constructor(public gameService : GameService) { }

  ngOnInit() {
  }

  @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
  if (event.code === 'Space') {
    let index = this.gameService.addAmmo();
    this.gameService.interval(index);

    
    
  }
  else if (event.code === 'ArrowRight') {
    this.ship.posX = this.ship.posX + 12  ;
  }
  else if (event.code === 'ArrowLeft') {
    this.ship.posX = this.ship.posX - 12  ;
  }
  else if (event.code === 'ArrowDown') {
    this.ship.posY = this.ship.posY + 12  ;
  }
  else if (event.code === 'ArrowUp') {
    this.ship.posY = this.ship.posY - 12  ;
  }
}
 
}
