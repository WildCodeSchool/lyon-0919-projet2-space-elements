import { Component, OnInit } from '@angular/core';
import { ShipService } from '../../shared/ship.service';
import { Ship } from '../../shared/ship';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
  animations: [

    trigger('dropMenus', [
      state('initial', style({
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderColor: 'rgba(255, 86, 24, 0.65)',
        borderStyle: 'outset',
        height: '5px',
        width: '400px',    
      })),
      state('final', style({
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderColor: 'rgba(255, 86, 24, 0.65)',
        borderStyle: 'outset',
        height: '500px',
        width: '600px',
        
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms'))
    ]),

    trigger('animatePlay', [
      state('intialPlay', style({
        borderColor: 'rgba(239, 92, 16, 0.8);',
        backgroundColor:'rgba(255, 86, 24, 0.95)',
        borderStyle: 'outset',
        height: '100px',
        width: '0px',    
      })),
      state('finalPlay', style({
        backgroundColor:'rgba(255, 86, 24, 0.95)',
        borderColor: 'rgba(239, 92, 16, 0.8);',
        borderStyle: 'outset',
        height: '100px',
        width: '400px',
        
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms'))
    ]),
  ]

})
export class OptionsComponent implements OnInit {

  stageCodes: string [] = ['butterfly', 'kitten', 'wasabi', 'emmental'];
  stageCode : string;
  choosenShip: Ship;
  ships: Ship[];
  shipSelected: boolean = false;
  currentState = 'initial';
  currentShipState = 'initial';
  showComponents = false;
  playState = 'intialPlay';

  constructor(private shipService: ShipService) { }

changeState() {

  this.currentState = this.currentState === 'initial' ? 'final' : 'initial';

    if (this.showComponents === false) {
      setTimeout(()=>{ this.showComponents = true}, 1500)  
    }
    else{
      setTimeout(()=>{ this.showComponents = false}, 200)
    }
        
  }

  changePlayState(){
    this.playState = this.playState === 'intialPlay' ? 'finalPlay' : 'intialPlay';
  }

  ngOnInit() {
    this.ships = this.shipService.ships;
    setTimeout(()=> {this.changeState()}, 500);
    setTimeout(()=> {this.changePlayState()}, 2000);
    
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
