describe('project', () => {
  it('should create a project', () => {
    cy.visit('/');

    cy.get('app-column:last-child', { timeout: 10000 }).click();
    cy.get('#name').type('e2e');
    cy.get('#description').type('e2e project');
    cy.get('app-button [type="submit"]').click();

    cy.get('app-project-card').should('have.length', 2);
  });
});
