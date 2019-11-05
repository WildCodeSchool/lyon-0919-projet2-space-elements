import { Component, OnInit, Input } from '@angular/core';
import { Ammo } from '../../shared/ammo';

@Component({
  selector: 'app-ammo',
  templateUrl: './ammo.component.html',
  styleUrls: ['./ammo.component.css']
})
export class AmmoComponent implements OnInit {

  constructor() { }

  @Input() ammo: Ammo;
  
  ngOnInit() {
  }

}
