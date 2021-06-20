describe('invite', () => {
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

  it('should accept an invite request', () => {
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
