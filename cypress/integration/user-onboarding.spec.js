describe('User Onboarding App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })
    it('sanity check for making sure everything is working properly', () => {
        expect(1 + 2).to.equal(3);
    })
    it('input testing', () => {
        nameInput().should('exist');
        emailInput().should('exist');
        passwordInput().should('exist');
        tosInput().should('exist');
        submitBtn().should('exist');
    })
    it('writing in the inputs', () => {
        nameInput()
            .type('Fernando Martinez')
            .should('have.value', 'Fernando Martinez');
        emailInput()
            .type('fernando@something.com')
            .should('have.value', 'fernando@something.com');
        passwordInput()
            .type('asdfghjkl')
            .should('have.value', 'asdfghjkl');
        tosInput().click();
        submitBtn().click();
    })
    it('inputs have an initial value of empty', () => {
        nameInput()
            .should('have.value', '')
        emailInput()
            .should('have.value', '')
        passwordInput()
            .should('have.value', '')
    })
    it('disabled submit button', () => {
        submitBtn()
            .should('be.disabled');
    })
    it('enabled submit button', () => {
        nameInput()
            .type('Fernando Martinez')
        emailInput()
            .type('fernando@something.com')
        passwordInput()
            .type('asdfghjkl')
        tosInput().click();
        submitBtn().should('not.be.disabled');
    })
})

const nameInput = () => cy.get('input[name=name]');
const emailInput = () => cy.get('input[name=email]');
const passwordInput = () => cy.get('input[name=password]');
const tosInput = () => cy.get('input[name=tos]');
const submitBtn = () => cy.get('button[id="submitBtn"]');


