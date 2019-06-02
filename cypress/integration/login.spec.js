describe('Sign up process', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080/login')
  })

  describe('Login form', () => {
    it('Given I am a user, when I enter invalid credentials, then I cannot continue and I am notified', () => {
      cy.get('#username-input-field')
        .type('test@e.co')
      cy.get('#password-input-field')
        .type('password')
      cy.url().should('be.equal', 'http://localhost:8080/login')
    })

    it('Given I am a user, when I enter valid credentials, the I am directed to the dashboard page', () => {
      cy.get('#username-input-field')
        .type('test@e.co')
      cy.get('#password-input-field')
        .type('password')
      cy.get('#login-button')
        .click()
      cy.url().should('be.equal', 'http://localhost:8080/dashboard')
    })
  })

  describe('Protected routes', () => {
    it('Given I visit dashboard pages without authenticating, I am redirected to login page', () => {
      cy.visit('http://localhost:8080/dashboard')
      cy.url().should('be.equal', 'http://localhost:8080/login')

      cy.visit('http://localhost:8080/dashboard/tasks')
      cy.url().should('be.equal', 'http://localhost:8080/login')
    })

    it('Given I am redirected to login page, after logging in successfully I am redirected to the original page', () => {
      cy.visit('http://localhost:8080/dashboard')
      cy.get('#username-input-field')
        .type('test@e.co')
      cy.get('#password-input-field')
        .type('password')
      cy.get('#login-button')
        .click()
      cy.url().should('be.equal', 'http://localhost:8080/dashboard')
    })
  })
})
