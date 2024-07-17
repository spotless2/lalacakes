import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CakesPageComponent } from './pages/cakes-page/cakes-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent},
    { path: 'home', component: MainPageComponent},
    { path: 'cakes', component: CakesPageComponent},
];
