import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  moveX : number = 250;
  moveY : number = 250;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
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
  // @HostListener('document:keyup', ['$event'])
  // onKeyupHandler(event: KeyboardEvent) {
  //   if (event.code === 'ArrowRight') {
  //     this.move = false;
  //     console.log(this.move)
  //   }
  // }
}
