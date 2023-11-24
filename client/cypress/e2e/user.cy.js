describe('User', () => {
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
      cy.contains('Test User');
    });
    it('fails with wrong credentials', () => {
      cy.get('#username').type('test');
      cy.get('#password').type('test');
      cy.get('#loginBtn').click();
      cy.contains('Invalid password or username')
    })
    it('cannot be accessed without authorization', () => {
      cy.visit('http://localhost:3000/main');
      cy.contains('Login');
    })
  });
  describe('Signup', () => {
    beforeEach(() => {
      cy.request('DELETE', 'http://localhost:5000/resetCypress')
    })
    it('succeeds with correct credentials', () => {
      cy.get('#signup-link').click();
      cy.contains('Register');
      cy.get('#firstName').type('Cypress');
      cy.get('#lastName').type('Test');
      cy.get('#username').type('cypresstest');
      cy.get('#email').type('cypresstest@gmail.com');
      cy.get('#password').type('secret');
      cy.get('#passwordRepeat').type('secret');
      cy.get('#Signup').click();
      cy.contains('Login');
    });
    it('fails with wrong credentials', () => {
      cy.get('#signup-link').click();
      cy.contains('Register');
      cy.get('#Signup').click();
      cy.contains('Password or username must be greater than 3');
    })
    it('fails if passwords not the same', () => {
      cy.get('#signup-link').click();
      cy.contains('Register');
      cy.get('#firstName').type('Cypress');
      cy.get('#lastName').type('Test');
      cy.get('#username').type('cypresstest');
      cy.get('#email').type('cypresstest@gmail.com');
      cy.get('#password').type('secret');
      cy.get('#passwordRepeat').type('test');
      cy.get('#Signup').click();
      cy.contains('Passwords are not the same');
    })
  });
});