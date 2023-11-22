describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Login form is showed', () => {
    cy.contains('Login');
  });
  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('testuser');
      cy.get('#password').type('secret');
      cy.get('#loginBtn').click();
    });
  });
});
