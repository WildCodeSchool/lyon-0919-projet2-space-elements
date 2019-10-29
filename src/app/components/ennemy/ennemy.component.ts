import { Component, OnInit, Input } from '@angular/core';
import { Ennemy } from 'src/app/shared/ennemy';

@Component({
  selector: 'app-ennemy',
  templateUrl: './ennemy.component.html',
  styleUrls: ['./ennemy.component.css']
})
export class EnnemyComponent implements OnInit {
  @Input() ennemy : Ennemy;
  constructor() { }

  ngOnInit() {

  }

}
