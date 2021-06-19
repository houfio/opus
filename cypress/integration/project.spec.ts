describe('project', () => {
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

  it('should create a project', () => {
    cy.visit('/');

    cy.get('app-column:last-child', { timeout: 10000 }).click();
    cy.get('#name').type('e2e');
    cy.get('#description').type('e2e project');
    cy.get('app-button [type="submit"]').click();

    cy.get('app-project-card').should('have.length', 2);
  });

  it('should create a sprint with a task', () => {
    cy.callFirestore('set', 'projects/e2e', {
      name: 'e2e',
      description: 'e2e project',
      owner: Cypress.env('TEST_UID'),
      users: [Cypress.env('TEST_UID')],
      currentSprint: '',
      archived: false
    });
    cy.callFirestore('set', `projects/e2e/users/${Cypress.env('TEST_UID')}`, {
      name: 'e2e user',
      role: 'Owner'
    });
    cy.visit('/projects/e2e');

    cy.contains('Create sprint').click();
    cy.wait(1000);

    cy.get('app-backlog-sprint').should('have.length', 2);
    cy.get('app-backlog-sprint:first-child').contains('Add task...').click();
    cy.get('app-backlog-sprint:first-child').get('form').type('Task 1').submit();

    cy.get('app-backlog-task').should('have.length', 1).should('contain.text', 'Task 1');
  });

  it('should send an invite request', () => {
    cy.callFirestore('set', 'projects/e2e', {
      name: 'e2e',
      description: 'e2e project',
      owner: Cypress.env('OTHER_TEST_UID'),
      users: [Cypress.env('OTHER_TEST_UID')],
      currentSprint: '',
      archived: false
    });
    cy.callFirestore('set', `projects/e2e/users/${Cypress.env('OTHER_TEST_UID')}`, {
      name: 'Other e2e',
      role: 'Owner'
    });

    cy.visit('/projects');

    cy.get('app-project-card').click();

    cy.get('.heading').should('exist');
  });

  it('should should accept an invite request', () => {
    cy.callFirestore('set', 'projects/e2e', {
      name: 'e2e',
      description: 'e2e project',
      owner: Cypress.env('TEST_UID'),
      users: [Cypress.env('TEST_UID')],
      currentSprint: '',
      archived: false
    });
    cy.callFirestore('set', `projects/e2e/users/${Cypress.env('TEST_UID')}`, {
      name: 'e2e user',
      role: 'Owner'
    });
    cy.callFirestore('set', `projects/e2e/users/${Cypress.env('OTHER_TEST_UID')}`, {
      name: 'Other e2e',
      role: 'Member'
    });

    cy.visit('/projects/e2e/settings');
    cy.wait(500);

    cy.get('app-table cdk-row').contains('Member').click();
    cy.get('app-button').contains('Accept and save').click();

    cy.get('app-table cdk-row').contains('Member').get('svg').should('have.class', 'fa-check');
  });
});
