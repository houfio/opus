import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../models/identifiable.model';
import { ProjectModel } from '../models/project.model';
import { SprintModel } from '../models/sprint.model';
import { StateModel } from '../models/state.model';
import { TaskModel } from '../models/task.model';
import { UserModel } from '../models/user.model';
import { filterNullish } from '../operators/filter-nullish';

import { AuthService } from './auth.service';
import { ProjectService } from './project.service';
import { SprintService } from './sprint.service';
import { StateService } from './state.service';
import { TaskService } from './task.service';
import { UserService } from './user.service';

type Response<T, V extends object> = Observable<Unpack<T, { [K in keyof V]: V[K] extends string ? V[K] : Unpack<V[K]> }>>;
type Unpack<T, V = {}> = T extends Array<infer A> ? IdentifiableModel<A & V>[] : IdentifiableModel<T & V>;

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private stateService: StateService,
    private taskService: TaskService,
    private userService: UserService) {
  }

  public getDashboard(): Response<ProjectModel[], { user: string, ownerData?: UserModel }> {
    return this.projectService.getProjects(true, true).pipe(
      switchMap((projects) => !projects.length ? of([]) : combineLatest(projects.map((project) => combineLatest([
        of(project),
        this.authService.user$,
        this.userService.getOwner(project)
      ])))),
      map((projects) => projects.map(([project, user, ownerData]) => ({
        ...project,
        user: user?.uid ?? '',
        ownerData
      })))
    );
  }

  public getProject(paramMap: Observable<ParamMap>): Response<ProjectModel, { userId: string }> {
    return paramMap.pipe(
      switchMap((params) => combineLatest([
        this.projectService.getProject(params.get('project')),
        this.authService.user$
      ])),
      map(([project, user]) => !project || !user ? undefined : ({
        ...project,
        userId: user.uid
      })),
      filterNullish()
    );
  }

  public getProjectDetails(paramMap: Observable<ParamMap>): Response<ProjectModel, {
    currentSprintData?: SprintModel,
    states: StateModel[],
    tasks: TaskModel[],
    usersData: UserModel[]
  }> {
    return paramMap.pipe(
      switchMap((params) => this.projectService.getProject(params.get('project'))),
      filterNullish(),
      switchMap((project) => combineLatest([
        of(project),
        this.sprintService.getCurrentSprint(project),
        this.stateService.getStates(project),
        this.taskService.getTasks(project),
        this.userService.getUsers(project)
      ])),
      map(([project, currentSprintData, states, tasks, usersData]) => ({
        ...project,
        currentSprintData,
        states,
        tasks,
        usersData: usersData.filter(({ id }) => project.users.indexOf(id) !== -1)
      }))
    );
  }

  public getProjectBacklog(paramMap: Observable<ParamMap>): Response<ProjectModel, {
    sprints: SprintModel[],
    states: StateModel[],
    tasks: TaskModel[]
  }> {
    return paramMap.pipe(
      switchMap((params) => this.projectService.getProject(params.get('project'))),
      filterNullish(),
      switchMap((project) => combineLatest([
        of(project),
        this.stateService.getStates(project),
        this.sprintService.getSprints(project).pipe(
          switchMap((sprints) => combineLatest([
            of(sprints),
            this.taskService.getTasks(project, sprints)
          ]))
        )
      ])),
      map(([project, states, [sprints, tasks]]) => ({
        ...project,
        sprints,
        states,
        tasks
      }))
    )
  }

  public getProjectUsers(paramMap: Observable<ParamMap>): Response<ProjectModel, {
    userData: Array<UserModel & { accepted: boolean }>
  }> {
    return paramMap.pipe(
      switchMap((params) => this.projectService.getProject(params.get('project'))),
      filterNullish(),
      switchMap((project) => combineLatest([
        of(project),
        this.userService.getUsers(project)
      ])),
      map(([project, users]) => ({
        ...project,
        userData: users.map((user) => ({
          ...user,
          accepted: project.users.indexOf(user.id) !== -1
        }))
      }))
    );
  }
}
