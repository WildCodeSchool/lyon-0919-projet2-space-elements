import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';
import { Enemy } from 'src/app/shared/enemy';
import { Game } from './game';
import { Boss } from './boss';
import { Obstacle } from './obstacle';
import { Bonus } from './bonus';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { VictoryComponent } from '../components/victory/victory.component';
import { ShipService } from './ship.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  enemies: Set<Enemy> = new Set<Enemy>();
  obstacles: Set<Obstacle> = new Set<Obstacle>();
  ammos: Set<Ammo> = new Set<Ammo>();
  bonusArray: Set<Bonus> = new Set<Bonus>();
  types: string[] = ['fire', 'water', 'air', 'earth'];
  bossAmmos: Set<Ammo> = new Set<Ammo>();
  isShoot: boolean = false;
  mvLeft: boolean = false;
  mvRight: boolean = false;
  mvUp: boolean = false;
  mvDown: boolean = false;
  mvUpRight: boolean = false;
  mvUpLeft: boolean = false;
  mvDownRight: boolean = false;
  mvDownLeft: boolean = false;
  enemyCount: number = 1;
  obstacleCount: number = 1;
  bonusCount: number = 1;
  bonusType: number;
  obstaclePause: any;
  intervalNumberEnemyLvl1: any;
  intervalNumberEnemyLvl2: any;
  intervalNumberEnemyLvl3: any;
  intervalNumberEnemyLvl4: any;
  intervalNumberObstacleLvl1: any;
  PausemoveEnemy: any;
  pauseBonus: any;
  PauseObstacle
  PauseFireAmmo: any;
  PauseShip: any;
  PauseAmmoMove: any;
  pauseBossAmmoMove: any;
  sound: boolean = true;
  mySoundShoot = new Audio(`../../../assets/Bruitage/tir35db.mp3`);
  mySoundExplosion = new Audio(`../../../assets/Bruitage/explosion25db.mp3`);
  position : number = 0;
  mySoundBossExplosion = new Audio('../../assets/Bruitage/bossexplosion.mp3')
  shipChoice: boolean = true;

  shipTypes: Object[] = [
    { 'name': 'fire', 'url': '/assets/img/ship_fire.png' },
    { 'name': 'air', 'url': '/assets/img/ship_air.png' },
    { 'name': 'earth', 'url': '/assets/img/ship_earth.png' },
    { 'name': 'water', 'url': '/assets/img/ship_water.png' },
  ];
  ship2Types: Object[] = [
    { 'name': 'fire', 'url': '/assets/img/ship2_fire.png' },
    { 'name': 'air', 'url': '/assets/img/ship2_air.png' },
    { 'name': 'earth', 'url': '/assets/img/ship2_earth.png' },
    { 'name': 'water', 'url': '/assets/img/ship2_water.png' },
  ];

  enemyTypes: Object[] = [
    {
      'name': 'fire', 'url': ['/assets/img/enemy_fire.png',
        '/assets/img/enemy_fire_HP1.png',
        '/assets/img/enemy_fire_HP2.png']
    },
    {
      'name': 'air', 'url': ['/assets/img/enemy_air.png',
        '/assets/img/enemy_air_HP1.png',
        '/assets/img/enemy_air_HP2.png']
    },
    {
      'name': 'earth', 'url': ['/assets/img/enemy_earth.png',
        '/assets/img/enemy_earth_HP1.png',
        '/assets/img/enemy_earth_HP2.png']
    },
    {
      'name': 'water', 'url': ['/assets/img/enemy_water.png',
        '/assets/img/enemy_water_HP1.png',
        '/assets/img/enemy_water_HP2.png']
    },
  ];
  ammoTypes: Object[] = [
    { 'name': 'fire', 'url': '/assets/img/ammo_fire.png' },
    { 'name': 'air', 'url': '/assets/img/ammo_air.png' },
    { 'name': 'earth', 'url': '/assets/img/ammo_earth.png' },
    { 'name': 'water', 'url': '/assets/img/ammo_water.png' },
  ];

  obstaclesImg: String[] = [
    '/assets/img/asteroid2.png',
    '/assets/img/asteroid3.png'
  ]

  typeBonus: number[] = [0, 1];


  enemyHP: Object[] = [
    { 'HP': 3, 'url': '/assets/img/ammo_fire.png' },
  ]
  shipSkin: string[][] = []; 
  enemySkin: string[][] = [
    ["url('/assets/img/enemy_air.png')", "url('/assets/img/enemy_air1.png')"],
    ["url('/assets/img/enemy_fire.png')", "url('/assets/img/enemy_fire1.png')"],
    ["url('/assets/img/enemy_earth.png')", "url('/assets/img/enemy_earth1.png')"],
    ["url('/assets/img/enemy_water.png')", "url('/assets/img/enemy_water1.png')"],
    ["url('/assets/img/enemy_air_HP1.png')", "url('/assets/img/enemy_air_HP11.png')"],
    ["url('/assets/img/enemy_fire_HP1.png')", "url('/assets/img/enemy_fire_HP11.png')"],
    ["url('/assets/img/enemy_earth_HP1.png')", "url('/assets/img/enemy_earth_HP11.png')"],
    ["url('/assets/img/enemy_water_HP1.png')", "url('/assets/img/enemy_water_HP11.png')"],
    ["url('/assets/img/enemy_air_HP2.png')", "url('/assets/img/enemy_air_HP21.png')"],
    ["url('/assets/img/enemy_fire_HP2.png')", "url('/assets/img/enemy_fire_HP21.png')"],
    ["url('/assets/img/enemy_earth_HP2.png')", "url('/assets/img/enemy_earth_HP21.png')"],
    ["url('/assets/img/enemy_water_HP2.png')", "url('/assets/img/enemy_water_HP21.png')"],
  ]

  bossSkin: string[] = [
    "url('/assets/img/boss_01.png')",
    "url('/assets/img/boss_02.png')"
  ]

  ship: Ship = {
    id: 0,
    url: '',
    posX: 0,
    posY: 880,
    height: 133,
    width: 124,
    size: 0,
    HP: 10,
    type: this.shipTypes[0],
  };

  boss: Boss;
  game: Game = new Game;
  enemykill = 0;
  bossCreated: boolean = false;
  bossKill : number = 0 ;


  constructor( 
    public dialog : MatDialog,
    public shipService: ShipService
    ) {
    // Ship skin
    this.setShipSkin();

    // mouvement
    this.movementShip();
    // multi actions
    this.multiAction();
    // Ammo moving and killing enemy
    this.ammoMove();
    // BossAmmo moving and damaging ship
    this.bossAmmoMove();
    //Move Enemy and Collision
    this.moveEnemyAndCollision();
    this.moveObstacleAndCollision();
    this.moveBonusAndCollision();
    // Ship animation   
    // Enemy animation
    this.animEnemy();
  }
  
  setShipSkin() {
    this.shipChoice = this.shipService.shipChoice;
    if (this.shipChoice === true ){
      this.shipSkin = [
        ['/assets/img/ship_fire.png', '/assets/img/ship_fire1.png'],
        ['/assets/img/ship_water.png', '/assets/img/ship_water1.png'],
        ['/assets/img/ship_air.png', '/assets/img/ship_air1.png'],
        ['/assets/img/ship_earth.png', '/assets/img/ship_earth1.png']
      ];
      
    }
    else if (this.shipChoice === false){
      this.ship.type['url'] = '/assets/img/ship2_fire.png';
      for (let i = 1; i < 4; i++){
      this.shipTypes[i] = this.ship2Types[i];
      }
      this.shipSkin = [
        ['/assets/img/ship2_fire.png', '/assets/img/ship2_fire1.png'],
        ['/assets/img/ship2_water.png', '/assets/img/ship2_water1.png'],
        ['/assets/img/ship2_air.png', '/assets/img/ship2_air1.png'],
        ['/assets/img/ship2_earth.png', '/assets/img/ship2_earth1.png']
      ]
    }
    this.animShip();
  }
  //Gestion des points de vie
  getShipHP(ship: Ship, value: number) {
    ship.HP = ship.HP + value;
    if (ship.HP < 0) {
      ship.HP = 0;
    }
    if (ship.HP > 10) { ship.HP = 10 }
    return ship.HP;
  }

  //Function to add obstacles
  addObstacle() {
    this.obstaclePause = setInterval(() => {
      let obstacleX = this.randomNumber(this.game.minX + 130, this.game.maxX - 130 * 2);
      let obstacle = new Obstacle(obstacleX - 100, -100);
      obstacle.pic = this.setObstaclePic(obstacle);
      this.obstacles.add(obstacle);
      this.obstacleCount++;
    }, 10000);
  }

  //function to add bonus or malus
  addBonusMalus() {
    setInterval(() => {
      let bonusX = this.randomNumber(this.game.minX + 100, this.game.maxX - 100 * 2);
      let bonus = new Bonus(bonusX - 100, -100);
      bonus.pic = this.setBonusPic(bonus);
      this.bonusArray.add(bonus);
      this.bonusCount++;
    }, 20000);
  }


  //Function to move obstacles
  moveObstacle(obstacle: Obstacle) {
    if (obstacle) {
      if (obstacle.posY > this.game.maxY - obstacle.height) {
        this.obstacles.delete(obstacle);
      }
      else {
        obstacle.posY = obstacle.posY + 10;
      }
    }
  }

  //Function to move bonus
  moveBonus(bonus: Bonus) {
    if (bonus) {
      if (bonus.posY > this.game.maxY - bonus.height) {
        this.bonusArray.delete(bonus);
      }
      else {
        bonus.posY = bonus.posY + 2;
      }
    }

  }

  // ship animation
  animShip() {
    setInterval(() => {
      for (let i = 0; i < this.shipSkin.length; i++) {
        if (this.ship.type['url'] === this.shipSkin[i][0]) {
          this.ship.type['url'] = this.shipSkin[i][1];
        }
        else if (this.ship.type['url'] === this.shipSkin[i][1]) {
          this.ship.type['url'] = this.shipSkin[i][0];
        }
      }
    }, 200);
  }

  //Function to do damage to enemies
  doDamage(ammo: Ammo, enemy: Enemy) {
    let truc = [[1, 2, 3], [2, 3, 0], [3, 0, 1], [0, 1, 2]]
    for (let i = 0; i < 4; i++) {
      switch (ammo.type) {
        case this.ammoTypes[i]:
          switch (enemy.type) {
            case this.enemyTypes[truc[i][0]]:
              enemy.HP -= 3;
              break;
            case this.enemyTypes[truc[i][1]]:
              enemy.HP -= 2;
              break;
            case this.enemyTypes[truc[i][2]]:
              enemy.HP -= 1;
              break;
          }
          if (enemy.HP <= 0) {
            this.enemies.delete(enemy);
            this.enemykill = this.enemykill + 1;
            if (this.sound === true) {
              this.mySoundExplosion.play()
            }
            else {
              this.mySoundExplosion.pause()
            }
          }
          break;
      }
    }
    return enemy.HP;
  }
  //Function to do damage to ship with boss
  doShipDamage(ammo: Ammo) {
    let truc = [[1, 2, 3], [2, 3, 0], [3, 0, 1], [0, 1, 2]]
    for (let i = 0; i < 4; i++) {
      switch (ammo.type) {
        case this.ammoTypes[i]:
          switch (this.ship.type) {
            case this.shipTypes[truc[i][0]]:
              this.ship.HP -= 3;
              break;
            case this.shipTypes[truc[i][1]]:
              this.ship.HP -= 2;
              break;
            case this.shipTypes[truc[i][2]]:
              this.ship.HP -= 1;
              break;
          }
          break;
      }
    }
    return this.ship.HP;
  }


  //Function ToSeeDamage on enemies
  VisuDamage(enemy: Enemy) {
    for (let i = 0; i < 4; i++) {
      switch (enemy.type) {
        case this.enemyTypes[i]:
          switch (enemy.HP) {
            case 2:
              enemy.pic = this.getUrlPicture(this.enemyTypes[i]['url'][1]);
              break;
            case 1:
              enemy.pic = this.getUrlPicture(this.enemyTypes[i]['url'][2]);
              break;
          }
      }
    }
    return enemy.pic;
  }

  // anim Enemies
  animEnemy() {
    setInterval(() => {
      for (let enemy of this.enemies) {
        for (let i = 0; i < this.enemySkin.length; i++) {
          if (enemy.pic === this.enemySkin[i][0]) {
            enemy.pic = this.enemySkin[i][1];
          }
          else if (enemy.pic === this.enemySkin[i][1]) {
            enemy.pic = this.enemySkin[i][0];
          }
        }
      }
    }, 200);
  }

  //Function random
  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  //get enemy pic url 
  getUrlPicture(url) {
    return `url('${url}')`;
  }

  //Functions to define the container size
  setMaxX(widthTotal, sizeGameContainer) {
    this.game.maxX = (widthTotal * 0.15 - this.ship.width / 2) + sizeGameContainer;
    return this.game.maxX;
  }
  setMinX(widthTotal) {
    this.game.minX = (widthTotal * 0.15);
    return this.game.minX;
  }
  setMaxY(heightTotal) {
    this.game.maxY = heightTotal;
    return this.game.maxY;
  }
  setMinY() {
    this.game.minY = 0;
    return this.game.minY;
  }

  //Position of the ship
  setShipX(widthTotal) {
    this.ship.posX = widthTotal / 2 - this.ship.width / 2;
  }
  setShipY(heightTotal) {
    this.ship.posY = heightTotal - this.ship.height;
  }

  //Ammo addition and move
  addAmmo() {

    let ammo: Ammo;
    switch (this.ship.type) {
      case this.shipTypes[0]:
        ammo = new Ammo(this.ammoTypes[0], this.ship.posX + 53, this.ship.posY - 10);
        break;
      case this.shipTypes[1]:
        ammo = new Ammo(this.ammoTypes[1], this.ship.posX + 53, this.ship.posY - 10);
        break;
      case this.shipTypes[2]:
        ammo = new Ammo(this.ammoTypes[2], this.ship.posX + 53, this.ship.posY - 10);
        break;
      case this.shipTypes[3]:
        ammo = new Ammo(this.ammoTypes[3], this.ship.posX + 53, this.ship.posY - 10);
        break;
    }
    switch (this.ship.type) {
      case this.ship2Types[0]:
        ammo = new Ammo(this.ammoTypes[0], this.ship.posX + 53, this.ship.posY - 10);
        break;
      case this.ship2Types[1]:
        ammo = new Ammo(this.ammoTypes[1], this.ship.posX + 53, this.ship.posY - 10);
        break;
      case this.ship2Types[2]:
        ammo = new Ammo(this.ammoTypes[2], this.ship.posX + 53, this.ship.posY - 10);
        break;
      case this.ship2Types[3]:
        ammo = new Ammo(this.ammoTypes[3], this.ship.posX + 53, this.ship.posY - 10);
        break;
    }
      if ( this.sound === true){
        this.mySoundShoot.play();
      }
      else{
        this.mySoundShoot.pause();
      }   
    return this.ammos.add(ammo);
  }

  //Ammo movement and delete
  moveAmmo(ammo: Ammo): void {
    ammo.posY = ammo.posY - 15;
    if (ammo) {
      if (ammo.posY < 0) {
        this.ammos.delete(ammo);
      }
      else {
        ammo.posY = ammo.posY - 5;
      }
    }
  }
  moveBossAmmo(bossAmmo: Ammo): void {
    bossAmmo.posY = bossAmmo.posY + 30;
    if (bossAmmo) {
      if (bossAmmo.posY > this.game.maxY - 35) {
        this.bossAmmos.delete(bossAmmo);
      }
      else {
        bossAmmo.posY = bossAmmo.posY + 5;
      }
    }
  }


  //Enemy addition
  addEnemy() {
    if (this.enemyCount < 16) {
      this.addEnemyLvl1();
    }
    else if (this.enemyCount < 36) {
      this.addEnemyLvl2();
    }
    else if (this.enemyCount < 61) {
      this.addEnemyLvl3();
    }
    else if (this.enemyCount < 91) {
      this.addEnemyLvl4();
    }  
    else
    if (this.enemyCount === 91 && this.bossCreated === false) {
      setTimeout(() => {
        this.boss = new Boss(710, -300, this.bossSkin[0]);
        this.bossCreated = true;
        this.bossMoveDown();
        this.bossShoot();
      }, 5000)
    }
  }

  bossMoveDown() {
    let stopMoveBoss: any;
    stopMoveBoss = setInterval(() => {
      this.boss.posY = this.boss.posY + 5;
      if (this.boss.posY === 50) {
        clearTimeout(stopMoveBoss);
      }
    }, 50);
    this.bossDance()
  }
  
  bossDance() {
    setInterval(() => {
    switch (this.position) {
      case 0:
        if(this.boss.posX<this.game.maxX-500){
          this.boss.posX +=5;
        }
        else{this.position = 1;}
        break;
      case 1:
        if(this.boss.posX>this.game.minX) {
          this.boss.posX -=5;
        }
        else{this.position = 0;}
        break;
      }
    // switch (this.position) {
    //   case 0:
    //     if(this.boss.posX<1000){
    //       this.boss.posX +=5;
    //       this.boss.posY +=5;
    //     }
    //     else{this.position = 1;}
    //     break;
    //   case 1:
    //     if(this.boss.posX<this.game.maxX-500){
    //       this.boss.posX +=5;
    //       this.boss.posY -=5;
    //     }
    //     else{this.position = 2;}
    //     break;
    //   case 2:
    //     if(this.boss.posY>0){
    //       this.boss.posX -=5;
    //       this.boss.posY -=5;
    //     }
    //     else{this.position = 3;}
    //     break;
    //   case 3:
    //     if(this.boss.posX>400){
    //       this.boss.posX -=7;
    //       this.boss.posY +=3;
    //     }
    //     else{this.position = 4;}
    //     break;
    //   case 4:
    //     if(this.boss.posX>this.game.minX){
    //       this.boss.posX -=5;
    //       this.boss.posY -=5;
    //     }
    //     else{this.position = 5;}
    //     break;
    //   case 5:
    //     if(this.boss.posY>0){
    //       this.boss.posX +=5;
    //       this.boss.posY -=5;
    //     }
    //     else{this.position = 6;}
    //     break;
    //   case 6:
    //     if(this.boss.posX<710){
    //       this.boss.posX +=5;
    //       this.boss.posY +=5;
    //     }
    //     else{this.position = 0;}
    //     break;
    // }
  }, 50);
  }

  bossShoot() {
    setInterval(() => {
      let bossAmmo = new Ammo(this.ammoTypes[this.randomNumber(0, 4)], this.boss.posX + 240, this.boss.posY + 240);
      let bossAmmo2 = new Ammo(this.ammoTypes[this.randomNumber(0, 4)], this.boss.posX + 25, this.boss.posY + 240);
      let bossAmmo3 = new Ammo(this.ammoTypes[this.randomNumber(0, 4)], this.boss.posX + 459, this.boss.posY + 240);
      this.bossAmmos.add(bossAmmo);
      this.bossAmmos.add(bossAmmo2);
      this.bossAmmos.add(bossAmmo3);
    }, 1500)
  }

  bossAmmoMove() {
    this.pauseBossAmmoMove = setInterval(() => {
      for (let bossAmmo of this.bossAmmos) {
        this.moveBossAmmo(bossAmmo);
        if ((bossAmmo.posX > this.ship.posX) && (bossAmmo.posX < this.ship.posX + this.ship.width)) {
          if (bossAmmo.posY > this.ship.posY) {
            this.ship.HP = this.doShipDamage(bossAmmo)
            this.bossAmmos.delete(bossAmmo);
            return;
          }
        }
        if (bossAmmo.posX + bossAmmo.width > this.ship.posX && bossAmmo.posX + bossAmmo.width < this.ship.posX + this.ship.width) {
          if (bossAmmo.posY > this.ship.posY) {
            this.ship.HP = this.doShipDamage(bossAmmo)
            this.bossAmmos.delete(bossAmmo);
          }
        }
      }
    }, 100);
  }


  //Function to set enemy first pic
  setEnemyPic(enemy) {
    for (let i = 0; i < 4; i++) {
      if (enemy.type === this.enemyTypes[i]) {
        enemy.pic = this.getUrlPicture(this.enemyTypes[i]['url'][0]);
      }
    }
  }

  setObstaclePic(obstacle) {
    let index = this.randomNumber(0, this.obstaclesImg.length + 1)
    return obstacle.pic = this.getUrlPicture(this.obstaclesImg[index]);
  }

  setBonusPic(bonus) {
    return bonus.pic = this.getUrlPicture(bonus.pic);
  }

  addEnemmies() {
    let enemyX = this.randomNumber(this.game.minX + 60, this.game.maxX);
    let enemy = new Enemy(this.enemyTypes[this.randomNumber(0, 4)], enemyX - 60, -20);
    this.setEnemyPic(enemy);
    this.enemies.add(enemy);
    this.enemyCount++;
  }
  addEnemyLvl1() {
    this.intervalNumberEnemyLvl1 = setInterval(() => {
      this.addEnemmies();
      if (this.enemyCount === 16) {
        clearInterval(this.intervalNumberEnemyLvl1);
        this.addEnemy();
      }
    }, 1700);
  }

  addEnemyLvl2() {
    this.intervalNumberEnemyLvl2 = setInterval(() => {
      this.addEnemmies();
      if (this.enemyCount === 36) {
        clearInterval(this.intervalNumberEnemyLvl2);
        this.addEnemy();
      }
    }, 1400);
  }

  addEnemyLvl3() {
    this.intervalNumberEnemyLvl3 = setInterval(() => {
      this.addEnemmies();
      if (this.enemyCount === 61) {
        clearInterval(this.intervalNumberEnemyLvl3);
        this.addEnemy();
      }
    }, 1100);
  }

  addEnemyLvl4() {
    this.intervalNumberEnemyLvl4 = setInterval(() => {
      this.addEnemmies();
      if (this.enemyCount === 91) {
        clearInterval(this.intervalNumberEnemyLvl4);
        this.addEnemy();
      }
    }, 800);
  }

  // Enemy moves
  //test Fonction bouger l'ennemi horizontalement

  moveEnemyX(enemy: Enemy) {
    enemy.posX = enemy.posX + Math.floor(Math.random() * 20) - 10;
    if (enemy.posX < this.game.minX) {
      enemy.posX = this.game.minX;
    }
    if (enemy.posX > this.game.maxX - 60) {
      enemy.posX = this.game.maxX - (enemy.width + 60 * 2);
    }
  }


  moveEnemy(enemy: Enemy) {
    if (enemy) {
      if (enemy.posY > this.game.maxY - enemy.height * 2.8) {
        this.enemies.delete(enemy);
        this.ship.HP = this.ship.HP - 3;
      }
      else {
        if (this.enemyCount < 16) {
          enemy.posY = enemy.posY + 5;
          this.moveEnemyX(enemy);
        }
        else if (this.enemyCount < 36) {
          enemy.posY = enemy.posY + 8;
          this.moveEnemyX(enemy);
        }
        else if (this.enemyCount < 61) {
          enemy.posY = enemy.posY + 11;
          this.moveEnemyX(enemy);
        }
        else if (this.enemyCount <= 91) {
          enemy.posY = enemy.posY + 14;
          this.moveEnemyX(enemy);
        }
      }
    }
  }

  //moveEnemyAndCollision
  moveEnemyAndCollision() {
    this.PausemoveEnemy = setInterval(() => {
      for (let enemy of this.enemies) {
        this.moveEnemy(enemy);
        if (this.ship.posX < enemy.posX + enemy.width && this.ship.posX > enemy.posX) {
          if (this.ship.posY < enemy.posY + enemy.height && this.ship.posY > enemy.posY) {
            this.enemies.delete(enemy);
            this.mySoundExplosion.play()
            this.enemykill = this.enemykill + 1;
            this.ship.HP = this.getShipHP(this.ship, -1);
            return;
          }
        }
        if (this.ship.posX + this.ship.width < enemy.posX + enemy.width && this.ship.posX + this.ship.width > enemy.posX) {
          if (this.ship.posY < enemy.posY + enemy.height && this.ship.posY > enemy.posY) {
            this.enemies.delete(enemy);
            this.mySoundExplosion.play()
            this.enemykill = this.enemykill + 1;
            this.ship.HP = this.getShipHP(this.ship, -1);
            return;
          }
        }
        if (this.ship.posY + this.ship.height < enemy.posY + enemy.height && this.ship.posY + this.ship.height > enemy.posY) {
          if (this.ship.posX < enemy.posX + enemy.width && this.ship.posX > enemy.posX) {
            this.enemies.delete(enemy);
            this.mySoundExplosion.play();
            this.enemykill = this.enemykill + 1;
            this.ship.HP = this.getShipHP(this.ship, -1);
            return;
          }
        }
        if (this.ship.posY + this.ship.height < enemy.posY + enemy.height && this.ship.posY + this.ship.height > enemy.posY) {
          if (this.ship.posX + this.ship.width < enemy.posX + enemy.width && this.ship.posX + this.ship.width > enemy.posX) {
            this.enemies.delete(enemy);
            this.mySoundExplosion.play();
            this.enemykill = this.enemykill + 1;
            this.ship.HP = this.getShipHP(this.ship, -1);
            return;
          }
        }
      }
    }, 200);

  }


  moveObstacleAndCollision() {
    this.PauseObstacle = setInterval(() => {
      for (let obstacle of this.obstacles) {
        this.moveObstacle(obstacle);
        if (this.ship.posX < obstacle.posX + obstacle.width && this.ship.posX > obstacle.posX) {
          if (this.ship.posY < obstacle.posY + obstacle.height && this.ship.posY > obstacle.posY) {
            this.obstacles.delete(obstacle);
            this.ship.HP = this.getShipHP(this.ship, -1);
            return;
          }
        }
        if (this.ship.posX + this.ship.width < obstacle.posX + obstacle.width && this.ship.posX + this.ship.width > obstacle.posX) {
          if (this.ship.posY < obstacle.posY + obstacle.height && this.ship.posY > obstacle.posY) {
            this.obstacles.delete(obstacle);
            this.ship.HP = this.getShipHP(this.ship, -1);
            return;
          }
        }
        if (this.ship.posY + this.ship.height < obstacle.posY + obstacle.height && this.ship.posY + this.ship.height > obstacle.posY) {
          if (this.ship.posX < obstacle.posX + obstacle.width && this.ship.posX > obstacle.posX) {
            this.obstacles.delete(obstacle);
            this.ship.HP = this.getShipHP(this.ship, -1);
            return;
          }
        }
        if (this.ship.posY + this.ship.height < obstacle.posY + obstacle.height && this.ship.posY + this.ship.height > obstacle.posY) {
          if (this.ship.posX + this.ship.width < obstacle.posX + obstacle.width && this.ship.posX + this.ship.width > obstacle.posX) {
            this.obstacles.delete(obstacle);
            this.ship.HP = this.getShipHP(this.ship, -1);
            return;
          }
        }
      }
    }, 200);

  }

  //moveBonusAndCollision
  moveBonusAndCollision() {
    this.pauseBonus = setInterval(() => {
      for (let bonus of this.bonusArray) {
        this.moveBonus(bonus);
        if (this.ship.posX < bonus.posX + bonus.width && this.ship.posX > bonus.posX) {
          if (this.ship.posY < bonus.posY + bonus.height && this.ship.posY > bonus.posY) {
            this.bonusArray.delete(bonus);
            bonus.type = this.typeBonus[this.randomNumber(0, 2)];
            this.bonusType = bonus.type;
            if (this.bonusType === 1) {
              this.ship.HP = this.getShipHP(this.ship, 2)
            }
            return;
          }
        }
        if (this.ship.posX + this.ship.width < bonus.posX + bonus.width && this.ship.posX + this.ship.width > bonus.posX) {
          if (this.ship.posY < bonus.posY + bonus.height && this.ship.posY > bonus.posY) {
            this.bonusArray.delete(bonus);
            bonus.type = this.typeBonus[this.randomNumber(0, 2)];
            this.bonusType = bonus.type;
            if (this.bonusType === 1) {
              this.ship.HP = this.getShipHP(this.ship, 2)
            }
            return;
          }
        }
        if (this.ship.posY + this.ship.height < bonus.posY + bonus.height && this.ship.posY + this.ship.height > bonus.posY) {
          if (this.ship.posX < bonus.posX + bonus.width && this.ship.posX > bonus.posX) {
            this.bonusArray.delete(bonus);
            bonus.type = this.typeBonus[this.randomNumber(0, 2)];
            this.bonusType = bonus.type;
            if (this.bonusType === 1) {
              this.ship.HP = this.getShipHP(this.ship, 2)
            }
            return;
          }
        }
        if (this.ship.posY + this.ship.height < bonus.posY + bonus.height && this.ship.posY + this.ship.height > bonus.posY) {
          if (this.ship.posX + this.ship.width < bonus.posX + bonus.width && this.ship.posX + this.ship.width > bonus.posX) {
            this.bonusArray.delete(bonus);
            bonus.type = this.typeBonus[this.randomNumber(0, 2)];
            this.bonusType = bonus.type;
            if (this.bonusType === 1) {
              this.ship.HP = this.getShipHP(this.ship, 2)
            }
            return;
          }
        }
      }
    }, 200);

  }

  //DeclarationMethode movementShip
  movementShip() {
    this.PauseShip = setInterval(() => {
      if (this.mvRight && this.ship.posX < this.game.maxX - this.ship.width / 2 - 10) {
        this.ship.posX = this.ship.posX + 15;
      }
      if (this.mvLeft && this.ship.posX > this.game.minX + 10) {
        this.ship.posX = this.ship.posX - 15;
      }
      if (this.mvUp && this.ship.posY > 0) {
        this.ship.posY = this.ship.posY - 15;
      }
      if (this.mvDown && this.ship.posY < this.game.maxY - this.ship.height) {
        this.ship.posY = this.ship.posY + 15;
      }
    }, 50);
  }

  //DeclarationMethode multiAction
  multiAction() {
    this.PauseFireAmmo = setInterval(() => {
      if (this.isShoot) {
        this.addAmmo();
      }
    }, 120);
  }

  //Ammo collision
  ammoMove() {
    this.PauseAmmoMove = setInterval(() => {
      for (let ammo of this.ammos) {
        this.moveAmmo(ammo);
        // with enemies
        for (let enemy of this.enemies) {
          if ((ammo.posX > enemy.posX) && (ammo.posX < enemy.posX + enemy.width)) {
            if (ammo.posY < enemy.posY + enemy.height) {
              enemy.HP = this.doDamage(ammo, enemy)
              enemy.pic = this.VisuDamage(enemy);
              this.ammos.delete(ammo);
              return;
            }
          }
          if (ammo.posX + ammo.width > enemy.posX && ammo.posX + ammo.width < enemy.posX + enemy.width) {
            if (ammo.posY < enemy.posY + enemy.height) {
              enemy.HP = this.doDamage(ammo, enemy)
              enemy.pic = this.VisuDamage(enemy);
              this.ammos.delete(ammo);
            }
          }
        }
        // with boss
        if (this.boss != undefined) {
          if ((ammo.posX > this.boss.posX) && (ammo.posX < this.boss.posX + this.boss.width)) {
            if (ammo.posY < this.boss.posY + this.boss.height) {
              this.boss.HP -= 1;
              this.ammos.delete(ammo);
              return;
            }
          }
          if (ammo.posX + ammo.width > this.boss.posX && ammo.posX + ammo.width < this.boss.posX + this.boss.width) {
            if (ammo.posY < this.boss.posY + this.boss.height) {
              this.boss.HP -= 1;
              this.ammos.delete(ammo);
            }
          }
          if (this.boss.HP <= 0) {
            this.boss = undefined;
            this.bossCreated = false;
            this.mySoundBossExplosion.play()
            this.bossKill = this.bossKill + 1;
            this.openVictory();
            return this.bossCreated;
          }
        }
      }
    }, 100);
  }

   //Victory Modal
   openVictory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    this.dialog.open(VictoryComponent, { panelClass: 'custom-dialogGameOver-container' });
    this.pauseGame();
   }

  //Pause du game
  pauseGame() {
    clearTimeout(this.PausemoveEnemy);
    clearTimeout(this.intervalNumberEnemyLvl1);
    clearTimeout(this.intervalNumberEnemyLvl2);
    clearTimeout(this.intervalNumberEnemyLvl3);
    clearTimeout(this.intervalNumberEnemyLvl4);
    clearTimeout(this.PauseFireAmmo);
    clearTimeout(this.PauseShip);
    clearTimeout(this.PauseAmmoMove);
    clearTimeout(this.pauseBossAmmoMove);
    clearTimeout(this.pauseBonus);
    clearTimeout(this.PauseObstacle);
    clearTimeout(this.obstaclePause);



  };

  //Reprise du game
  pauseGameReprise() {
    this.moveEnemyAndCollision();
    this.addEnemy();
    this.movementShip();
    this.multiAction();
    this.ammoMove();
    this.bossAmmoMove();
    this.addObstacle();
    this.moveObstacleAndCollision();
    this.addBonusMalus();
    this.moveBonusAndCollision();
  };
}


