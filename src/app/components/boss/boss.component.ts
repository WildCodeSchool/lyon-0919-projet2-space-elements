import { Component, OnInit, Input } from '@angular/core';
import { Boss} from '../../shared/boss';

@Component({
  selector: 'app-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.css']
})
export class BossComponent implements OnInit {

  @Input() boss: Boss;

  constructor() { }

  ngOnInit() {
  }

}
