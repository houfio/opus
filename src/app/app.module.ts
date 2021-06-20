import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { canActivate } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { DatepickerModule } from 'ng2-datepicker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BacklogSprintComponent } from './components/backlog-sprint/backlog-sprint.component';
import { BacklogTaskComponent } from './components/backlog-task/backlog-task.component';
import { BoardComponent } from './components/board/board.component';
import { ButtonComponent } from './components/button/button.component';
import { ColumnComponent } from './components/column/column.component';
import { ContainerComponent } from './components/container/container.component';
import { HeadingComponent } from './components/heading/heading.component';
import { InputComponent } from './components/input/input.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ReportComponent } from './components/report/report.component';
import { RowComponent } from './components/row/row.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SprintOverlayComponent } from './components/sprint-overlay/sprint-overlay.component';
import { TableComponent } from './components/table/table.component';
import { TaskOverlayComponent } from './components/task-overlay/task-overlay.component';
import { PaletteDirective } from './directives/palette.directive';
import { authorized } from './guards/authorized';
import { unauthorized } from './guards/unauthorized';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectBacklogComponent } from './pages/project-backlog/project-backlog.component';
import { ProjectBoardComponent } from './pages/project-board/project-board.component';
import { ProjectReportComponent } from './pages/project-report/project-report.component';
import { ProjectSettingsComponent } from './pages/project-settings/project-settings.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AuthService } from './services/auth.service';
import { PageService } from './services/page.service';
import { ProjectService } from './services/project.service';
import { SprintService } from './services/sprint.service';
import { StateService } from './services/state.service';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, ...canActivate(authorized) },
  { path: 'login', component: LoginComponent, ...canActivate(unauthorized) },
  { path: 'projects', component: ProjectsComponent, ...canActivate(authorized) },
  {
    path: 'projects/:project',
    component: ProjectComponent,
    children: [
      { path: '', component: ProjectBacklogComponent },
      { path: 'board', component: ProjectBoardComponent },
      { path: 'report', component: ProjectReportComponent },
      { path: 'settings', component: ProjectSettingsComponent }
    ],
    ...canActivate(authorized)
  }
];

@NgModule({
  declarations: [
    AppComponent,
    // directives
    PaletteDirective,
    // components
    BacklogSprintComponent,
    BacklogTaskComponent,
    BoardComponent,
    ButtonComponent,
    ColumnComponent,
    ContainerComponent,
    HeadingComponent,
    InputComponent,
    NavigationComponent,
    OverlayComponent,
    ProjectCardComponent,
    ReportComponent,
    RowComponent,
    SidebarComponent,
    SpinnerComponent,
    SprintOverlayComponent,
    TableComponent,
    TaskOverlayComponent,
    // pages
    DashboardComponent,
    LoginComponent,
    ProjectBacklogComponent,
    ProjectBoardComponent,
    ProjectReportComponent,
    ProjectSettingsComponent,
    ProjectComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FontAwesomeModule,
    DragDropModule,
    CdkTableModule,
    ChartsModule,
    DatepickerModule
  ],
  providers: [
    AuthService,
    PageService,
    ProjectService,
    SprintService,
    StateService,
    TaskService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
