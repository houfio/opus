import './commands';

before(() => {
  cy.login();
});

beforeEach(() => {
  cy.callFirestore('get', 'projects').then((projects) => {
    if (!projects) {
      return;
    }

    cy.resetFirestore(projects);
  });
});
