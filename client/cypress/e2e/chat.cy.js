describe('Chat', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('can be accessed', () => {
        cy.get('#username').type('testuser');
        cy.get('#password').type('secret');
        cy.get('#loginBtn').click();
        cy.contains('Test User');
        cy.get('#friend').click();
        cy.contains('tester tester')
    })
})