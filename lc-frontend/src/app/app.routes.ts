import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CakesPageComponent } from './pages/cakes-page/cakes-page.component';
import { PlatesPageComponent } from './pages/plates-page/plates-page/plates-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page/contact-page.component';
import { AboutPageComponent } from './pages/about-page/about-page/about-page.component';
import { PanelPageComponent } from './pages/panel-page/panel-page.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'home', component: MainPageComponent },
  { path: 'cakes', component: CakesPageComponent },
  { path: 'plates', component: PlatesPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'panel', component: PanelPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderFormComponent },
  { path: 'order/:productId', component: OrderFormComponent },
  { path: '**', redirectTo: '' },
];
