import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { canActivate } from '@angular/fire/auth-guard';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authorized } from './guards/authorized';
import { unauthorized } from './guards/unauthorized';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, ...canActivate(authorized) },
  { path: 'login', component: LoginComponent, ...canActivate(unauthorized) }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
