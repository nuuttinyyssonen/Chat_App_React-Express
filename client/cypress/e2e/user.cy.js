describe('User', () => {
  it('setup', () => {
    const user = {
      user1: 'cypressTest1'
    };
    cy.request('DELETE', 'http://localhost:5000/resetCypress', user);
  });

  describe('Signup', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    })
    it('succeeds with correct credentials', () => {
      cy.get('#signup-link').click();
      cy.contains('Register');
      cy.get('#firstName').type('cypressTest1');
      cy.get('#lastName').type('cypressTest1');
      cy.get('#username').type('cypressTest1');
      cy.get('#email').type('cypressTest1@gmail.com');
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
    });

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
    });
  });

  describe('Login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    })

    it('succeeds with correct credentials', () => {
      cy.get('#username').type('cypressTest1');
      cy.get('#password').type('secret');
      cy.get('#loginBtn').click();
      cy.contains('cypressTest1 cypressTest1');
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
});