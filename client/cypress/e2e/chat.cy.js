describe('Chat', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('test1');
        cy.get('#password').type('secret');
        cy.get('#loginBtn').click();
    });

    it('can be accessed', () => {
        cy.contains('test1 test1');
        cy.get('#friend').click();
        cy.contains('test2 test2');
    });

    it('message can be sent', () => {
        cy.get('#friend').click();
        cy.contains('test2 test2');
        cy.get('#chatInput').type('Hello user!');
        cy.get('#send').click();
        cy.contains('Hello user!');
    });

    it('same message can be viewed from other user', () => {
        cy.get('#logout').click();
        cy.get('#username').type('test2');
        cy.get('#password').type('secret');
        cy.get('#loginBtn').click();
        cy.get('#friend').click();
        cy.contains('Hello user!');
    });

    it('cannot be accessed if not authorized', () => {
        cy.get('#logout').click();
        cy.visit('http://localhost:3000/chat/6565c26924c652de77488ca3');
        cy.contains('Login');
    });
});