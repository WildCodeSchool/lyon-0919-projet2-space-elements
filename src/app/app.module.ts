import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { routes } from './app-routing.module'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RouterModule,  } from '@angular/router';
import { OptionsComponent } from './pages/options/options.component';
import { GameComponent } from './pages/game/game.component';
import { AmmoComponent } from './components/ammo/ammo.component';
import { ShipComponent } from './components/ship/ship.component';
import { EnemyComponent } from './components/enemy/enemy.component';
import { BossComponent } from './components/boss/boss.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameOverComponent } from './components/game-over/game-over.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    OptionsComponent,
    GameComponent,
    AmmoComponent,
    ShipComponent,
    EnemyComponent,
    BossComponent,
    GameOverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
  entryComponents: [
    GameOverComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
