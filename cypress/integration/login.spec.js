describe('Sign up process', () => {
  const baseUrl = Cypress.config().baseUrl

  beforeEach(() => {
    cy.visit('/login')
  })

  describe('Login form', () => {
    it('Given I am a user, when I enter invalid credentials, then I cannot continue and I am notified', () => {
      cy.get('#username-input-field')
        .type('test@e.co')
      cy.get('#password-input-field')
        .type('password')
      cy.url().should('be.equal', `${baseUrl}/login`)
    })

    it('Given I am a user, when I enter valid credentials, the I am directed to the dashboard page', () => {
      cy.get('#username-input-field')
        .type('test@e.co')
      cy.get('#password-input-field')
        .type('password')
      cy.get('#login-button')
        .click()
      cy.url().should('be.equal', `${baseUrl}/dashboard/tasks`)
    })
  })

  describe('Protected routes', () => {
    it('Given I visit dashboard pages without authenticating, I am redirected to login page', () => {
      cy.visit('/dashboard')
      cy.url().should('be.equal', `${baseUrl}/login`)

      cy.visit('/dashboard/tasks')
      cy.url().should('be.equal', `${baseUrl}/login`)
    })

    it('Given I am redirected to login page, after logging in successfully I am redirected to the original page', () => {
      cy.visit('/dashboard')
      cy.get('#username-input-field')
        .type('test@e.co')
      cy.get('#password-input-field')
        .type('password')
      cy.get('#login-button')
        .click()
      cy.url().should('be.equal', `${baseUrl}/dashboard/tasks`)
    })
  })
})
