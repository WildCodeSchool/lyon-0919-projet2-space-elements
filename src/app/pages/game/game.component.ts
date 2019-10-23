import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  moveX : number = 250;
  moveY : number = 250;
  shoot : boolean = false;
  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    
    if (event.code === 'Space') {
      this.shoot = true;
    }
    if (event.code === 'ArrowRight') {
      this.moveX = this.moveX + 12  ;
    }
    if (event.code === 'ArrowLeft') {
      this.moveX = this.moveX - 12  ;
    }
    if (event.code === 'ArrowDown') {
      this.moveY = this.moveY + 12  ;
    }
    if (event.code === 'ArrowUp') {
      this.moveY = this.moveY - 12  ;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
