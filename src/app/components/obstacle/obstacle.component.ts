import { Component, OnInit, Input } from '@angular/core';
import { Obstacle } from 'src/app/shared/obstacle';

@Component({
  selector: 'app-obstacle',
  templateUrl: './obstacle.component.html',
  styleUrls: ['./obstacle.component.css']
})
export class ObstacleComponent implements OnInit {

  @Input() obstacle: Obstacle;

  constructor() { }

  ngOnInit() {

  }

}
