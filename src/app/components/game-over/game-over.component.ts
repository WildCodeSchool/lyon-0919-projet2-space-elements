import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }


  replay(){
    location.reload();
  }
}
