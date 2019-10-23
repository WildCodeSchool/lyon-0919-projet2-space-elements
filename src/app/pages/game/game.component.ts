import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../../shared/ship';
import { ShipService } from '../../shared/ship.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() ship: Ship;
  constructor(private shipService: ShipService) { }

  ngOnInit() {
    this.ship = this.shipService.choosenShip;
  }

}
