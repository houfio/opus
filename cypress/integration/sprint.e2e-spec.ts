describe('sprint', () => {
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
});
