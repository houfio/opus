import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { canActivate } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { ContainerComponent } from './components/container/container.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { authorized } from './guards/authorized';
import { unauthorized } from './guards/unauthorized';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, ...canActivate(authorized) },
  { path: 'login', component: LoginComponent, ...canActivate(unauthorized) }
];

@NgModule({
  declarations: [
    AppComponent,
    // components
    ButtonComponent,
    ContainerComponent,
    NavigationComponent,
    // pages
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
