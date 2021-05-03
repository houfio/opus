import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { canActivate } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ButtonComponent } from './components/button/button.component';
import { ColumnComponent } from './components/column/column.component';
import { ContainerComponent } from './components/container/container.component';
import { HeadingComponent } from './components/heading/heading.component';
import { InputComponent } from './components/input/input.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { RowComponent } from './components/row/row.component';
import { PaletteDirective } from './directives/palette.directive';
import { authorized } from './guards/authorized';
import { unauthorized } from './guards/unauthorized';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, ...canActivate(authorized) },
  { path: 'login', component: LoginComponent, ...canActivate(unauthorized) },
  { path: 'projects', component: ProjectsComponent, ...canActivate(authorized) },
  { path: 'projects/:project', component: ProjectComponent, ...canActivate(authorized) }
];

@NgModule({
  declarations: [
    AppComponent,
    // directives
    PaletteDirective,
    // components
    BoardComponent,
    ButtonComponent,
    ColumnComponent,
    ContainerComponent,
    HeadingComponent,
    InputComponent,
    NavigationComponent,
    ProjectCardComponent,
    RowComponent,
    // pages
    DashboardComponent,
    LoginComponent,
    ProjectComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
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
