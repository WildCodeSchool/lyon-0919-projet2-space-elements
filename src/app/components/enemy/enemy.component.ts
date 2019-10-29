import { Component, OnInit, Input } from '@angular/core';
import { Enemy} from "src/app/shared/enemy"
import { GameService } from 'src/app/shared/game.service';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})

export class EnemyComponent implements OnInit {

  @Input()enemy : Enemy;
  

  constructor() { }

  ngOnInit() {
  }

}
