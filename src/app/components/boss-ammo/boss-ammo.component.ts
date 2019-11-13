import { Component, OnInit, Input } from '@angular/core';
import { Ammo } from 'src/app/shared/ammo';

@Component({
  selector: 'app-boss-ammo',
  templateUrl: './boss-ammo.component.html',
  styleUrls: ['./boss-ammo.component.css']
})
export class BossAmmoComponent implements OnInit {

  @Input() bossAmmo: Ammo;

  constructor() { }

  ngOnInit() {
  }


}
