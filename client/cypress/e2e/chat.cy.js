import initialUser from "./test_helper";
describe('Chat', () => {
    it('delete users', () => {
        cy.request('DELETE', `http://localhost:5000/api/resetCypress/${initialUser[0].username}`)
        cy.request('DELETE', `http://localhost:5000/api/resetCypress/${initialUser[1].username}`)
        cy.request('DELETE', `http://localhost:5000/api/resetCypress/${initialUser[2].username}`)
    });

    it('setup', () => {
        cy.visit('http://localhost:5000')
        cy.get('#signup-link').click();
        cy.get('#firstName').type('cypressTest1');
        cy.get('#lastName').type('cypressTest1');
        cy.get('#username').type('cypressTest1');
        cy.get('#email').type('cypressTest1@gmail.com');
        cy.get('#password').type('secret');
        cy.get('#passwordRepeat').type('secret');
        cy.get('#Signup').click();

        cy.visit('http://localhost:5000')
        cy.get('#signup-link').click();
        cy.get('#firstName').type('cypressTest2');
        cy.get('#lastName').type('cypressTest2');
        cy.get('#username').type('cypressTest2');
        cy.get('#email').type('cypressTest2@gmail.com');
        cy.get('#password').type('secret');
        cy.get('#passwordRepeat').type('secret');
        cy.get('#Signup').click();

        cy.visit('http://localhost:5000')
        cy.get('#signup-link').click();
        cy.get('#firstName').type('cypressTest3');
        cy.get('#lastName').type('cypressTest3');
        cy.get('#username').type('cypressTest3');
        cy.get('#email').type('cypressTest3@gmail.com');
        cy.get('#password').type('secret');
        cy.get('#passwordRepeat').type('secret');
        cy.get('#Signup').click();
    });

    describe('Chat test', () => {
        beforeEach(() => {
            cy.visit('http://localhost:5000')
            cy.get('#username').type('cypressTest1');
            cy.get('#password').type('secret');
            cy.get('#loginBtn').click();
        })

        it('can make a friend', () => {
            cy.get('#openDropDown').click();
            cy.get('#createPrivateChatButton').click();
            cy.wait(1000);
            cy.get('#createPrivateChatInput').type('cypressTest2');
            cy.wait(1000);
            cy.get('#privateContactContainer').click();
            cy.get('#addFriend').click();
            cy.contains('Contact was successfully created!')
        });

        it('can be accessed', () => {
            cy.contains('cypressTest1 cypressTest1');
            cy.get('#friend').click();
            cy.contains('cypressTest2');
        });

        it('message can be sent', () => {
            cy.get('#friend').click();
            cy.get('#chatInput').type('Hello user!');
            cy.get('#send').click();
            cy.contains('Hello user!');
        });

        it('same message can be viewed from other user', () => {
            cy.get('#logout').click();
            cy.get('#username').type('cypressTest2');
            cy.get('#password').type('secret');
            cy.get('#loginBtn').click();
            cy.get('#friend').click();
            cy.contains('Hello user!');
        });

        it('group chat can be made', () => {
            cy.get('#openDropDown').click();
            cy.get('#createGroupChatButton').click();
            cy.wait(1000);
            cy.get('#createGroupChatInput').type('cypress');
            cy.wait(1000);
            cy.contains('cypressTest2').click();
            cy.contains('cypressTest3').click();
            cy.get('#createGroupChat').click();
            cy.wait(1000);
            cy.contains('Group chat created successfully!');
            cy.get('#backToContactList').click();
            cy.contains('New Group Chat');
        });
    });
});