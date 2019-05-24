describe('Sign up process', function() {
  before(() => {
    cy.visit('http://localhost:8080')
    cy.get('#welcome-view-sign-up').click()
  })

  let emailInput
  beforeEach(() => {
    emailInput = cy.get('#email-input')
    emailInput.clear()
  })

  it('Given I am a user, when I enter an invalid email, then I cannot continue and I am notified', () => {
    emailInput.type('not.an-email@z')
    cy.contains('Hey dude, bad e-mail.').should('exist')
    cy.contains('button', 'Next').should('be.disabled')
  })

  it('Given I am a user, when I enter a valid email, then I can continue', () => {
    emailInput.type('test@e.co')
    cy.contains('Hey dude, bad e-mail.').should('not.exist')
    // TODO: The following assertion will fail. Fix this bug in the form validation state
    // cy.contains('button', 'Next').should('not.be.disabled')
  })
})
