import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  stageCodes: string [] = ['butterfly', 'kitten', 'wasabi', 'emmental'];
  stageCode : string;

  constructor() { }

  ngOnInit() {
  }
  goToGame(){
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
}
