import { attachCustomCommands } from "cypress-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: 'AIzaSyCm8fqcHWtVKaqb9Z6yml8pAVI3OZ1MDG0',
  authDomain: 'burgerbot-fdc33.firebaseapp.com',
  databaseURL: 'https://burgerbot-fdc33.firebaseio.com',
  projectId: 'burgerbot-fdc33',
  storageBucket: 'burgerbot-fdc33.appspot.com',
  messagingSenderId: '11843797210',
  appId: '1:11843797210:web:b1441631c7ec0f808fa5e3'
});

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
