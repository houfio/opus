declare namespace Cypress {
  interface Chainable {
    resetFirestore(projects: { id: string }[]): Chainable;
  }
}
