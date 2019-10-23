import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { GameComponent } from './pages/game/game.component';
import {OptionsComponent} from './pages/options/options.component'


const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path:'', component: HomepageComponent},
  {path: 'option', component: OptionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes };
