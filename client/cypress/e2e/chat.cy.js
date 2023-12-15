import initialUser from "./chat_helper";
describe('Chat', () => {
    it('setup', () => {
        const user = {
            user1: 'cypressTest1',
            user2: 'cypressTest2',
            user3: 'cypressTest3'
        }
        cy.request('DELETE', 'http://localhost:5000/resetCypress', user)
        cy.request('POST', 'http://localhost:5000/signup', initialUser[0]);
        cy.request('POST', 'http://localhost:5000/signup', initialUser[1]);
        cy.request('POST', 'http://localhost:5000/signup', initialUser[2]);
    });
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('cypressTest1');
        cy.get('#password').type('secret');
        cy.get('#loginBtn').click();
    })

    describe('Chat test', () => {
        it('can make a friend', () => {

        });
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