import { Component, OnInit } from '@angular/core';
import { ShipService } from '../../shared/ship.service';
import { Ship } from '../../shared/ship';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  stageCodes: string [] = ['butterfly', 'kitten', 'wasabi', 'emmental'];
  stageCode : string;
  choosenShip: Ship;
  ships: Ship[];
  shipSelected: boolean = false;

  constructor(private shipService: ShipService) { }

  ngOnInit() {
    this.ships = this.shipService.ships;
  }
  goToGame(ship: Ship){
    this.shipService.setChoosenShip(ship);
    let stage;
    if(this.stageCode){
      for (let i=0; i<this.stageCodes.length; i++){
        if(this.stageCode === this.stageCodes[i]){
          stage = i+1;
        }
      }
    }
    console.log(stage);
    return stage;
  }

  onSelectedShip(ship: Ship)
  {
    this.choosenShip = this.shipService.setChoosenShip(ship);
    console.log(ship.id);
    return this.choosenShip;
  }


}
