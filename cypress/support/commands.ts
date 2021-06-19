import { attachCustomCommands } from "cypress-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

import { environment } from '../../src/environments/environment';

firebase.initializeApp(environment.firebase);

attachCustomCommands({ Cypress, cy, firebase });

Cypress.Commands.add('resetFirestore', (projects: { id: string }[]) => {
  projects.forEach((project) => {
    cy.callFirestore('delete', `projects/${project.id}/users`);
    cy.callFirestore('delete', `projects/${project.id}/states`);
    cy.callFirestore('delete', `projects/${project.id}/tasks`);
    cy.callFirestore('delete', `projects/${project.id}/sprints`);
    cy.callFirestore('delete', `projects/${project.id}`);
  });
});
