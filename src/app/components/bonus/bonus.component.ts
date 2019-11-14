import { Component, OnInit, Input } from '@angular/core';
import { Bonus } from 'src/app/shared/bonus';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {

  @Input() bonus: Bonus;

  constructor() { }

  ngOnInit() {
  }

}
