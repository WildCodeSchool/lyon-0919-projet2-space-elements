import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import {routes} from './app-routing.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RouterModule,  } from '@angular/router';
import { OptionsComponent } from './pages/options/options.component';
import { GameComponent } from './pages/game/game.component';
import { AmmoComponent } from './components/ammo/ammo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    OptionsComponent,
    GameComponent,
    AmmoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
