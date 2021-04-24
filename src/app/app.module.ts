import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { BoardComponent } from './components/board/board.component';
import { ButtonComponent } from './components/button/button.component';
import { ContainerComponent } from './components/container/container.component';
import { HeadingComponent } from './components/heading/heading.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PaletteDirective } from './directives/palette.directive';
import { authorized } from './guards/authorized';
import { unauthorized } from './guards/unauthorized';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectComponent } from './pages/project/project.component';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, ...canActivate(authorized) },
  { path: 'login', component: LoginComponent, ...canActivate(unauthorized) },
  { path: ':project', component: ProjectComponent, ...canActivate(authorized) }
];

@NgModule({
  declarations: [
    AppComponent,
    // directives
    PaletteDirective,
    // components
    BoardComponent,
    ButtonComponent,
    ContainerComponent,
    HeadingComponent,
    NavigationComponent,
    // pages
    DashboardComponent,
    LoginComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FontAwesomeModule,
    DragDropModule
  ],
  providers: [
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
