describe('Sign up process', () => {
  const signup = ({ username, password, confirmPassword, firstName, lastName, dateOfBirth }) => {
    fillUsernameForm(username)
    goNext()
    fillPasswordForm(password, confirmPassword)
    goNext()
    fillDemographicForm({ firstName, lastName, dateOfBirth })
    clickRegister()
  }

  const fillUsernameForm = (username) => {
    cy.get('#email-input')
      .clear()
      .type(username)
  }

  const goNext = () => {
    cy.get('#next-step-button')
      .click()
  }

  const clickRegister = () => {
    cy.get('#register-button')
      .click()
  }

  const fillPasswordForm = (password, confirmPassword) => {
    cy.get('#account-password')
      .clear()
      .type(password)
      .get('#account-password-confirm')
      .clear()
      .type(confirmPassword)
  }

  const fillDemographicForm = ({ firstName, lastName, dateOfBirth }) => {
    cy.get('#account-first-name-text-field')
      .clear()
      .type(firstName)
      .get('#account-last-name-text-field')
      .clear()
      .type(lastName)
      .get('#account-date-of-birth-text-field')
      .clear()
      .type(dateOfBirth)
  }

  const getTimestampedUsername = () => {
    return `test-at-${new Date().getTime()}@e.co`
  }

  const startSignUp = () => {
    cy.visit('/')
    cy.get('#welcome-view-sign-up').click()
  }

  beforeEach(() => {
    startSignUp()
  })

  describe('Email form', () => {

    it('Given I am a user, when I enter an invalid email, then I cannot continue and I am notified', () => {
      fillUsernameForm('not.an-email@z')
      cy.contains('Hey dude, bad e-mail.').should('be.visible')
      cy.get('#next-step-button')
        .should('be.disabled')
    })

    it('Given I am a user, when I enter a valid email, then I can continue', () => {
      fillUsernameForm('test@e.co')
      cy.contains('Hey dude, bad e-mail.').should('not.be.visible')
      cy.get('#next-step-button')
        .should('not.be.disabled')
    })
  })


  describe('Password form', () => {

    beforeEach(() => {
      fillUsernameForm('test@e.co')
      goNext()
    })

    it('Given I am a user, when I enter an invalid password, then I cannot continue and I am notified', () => {
      cy.get('#account-password')
        .clear()
        .type('123')
      cy.contains('Minimum password length is 8.').should('be.visible')
    })

    it('Given I am a user, when I enter a valid password, then I see no error message', () => {
      cy.get('#account-password')
        .clear()
        .type('password')
      cy.contains('Minimum password length is 8.').should('not.be.visible')
    })

    it('Given I am a user, when I type a password that does not match, I am given an error', () => {
      cy.get('#account-password')
        .clear()
        .type('password')
      cy.get('#account-password-confirm')
        .type('123')
      cy.contains('Passwords don\'t match').should('be.visible')
      cy.get('#next-step-button').should('be.disabled')
    })

    it('Given I am a user, when I confirm the password I can go to the next screen', () => {
      cy.get('#account-password')
        .clear()
        .type('password')
      cy.get('#account-password-confirm')
        .clear()
        .type('password')
      cy.get('#next-step-button').should('not.be.disabled')
    })
  })

  describe('Demographic form', () => {

    beforeEach(() => {
      fillUsernameForm('test@e.co')
      goNext()
      fillPasswordForm('password', 'password')
      goNext()
    })

    it('Given I am a user, when I enter first name, last name and birthday, I can register', () => {
      cy.get('#account-first-name-text-field').clear().type('John')
      cy.get('#account-last-name-text-field').clear().type('McTester')
      cy.get('#account-date-of-birth-text-field').clear().type('01/23/1959')
      cy.get('#next-step-button').should('not.be.visible')
      cy.get('#register-button')
        .should('be.visible')
        .should('not.be.disabled')
    })
  })


  it('Given I sign up successfully, I am prompted to continue to the dashboard ', () => {
    cy.visit('/')
      .get('#welcome-view-sign-up')
      .click()

    signup({
      username: getTimestampedUsername(),
      password: 'password',
      confirmPassword: 'password',
      firstName: 'Test',
      lastName: 'McTester',
      dateOfBirth: '04/23/1959'
    })

    cy.contains('div', 'Welcome to FocusMF!')
      .should('be.visible')
  })

  it('Given I use an email that already exists in the database, I cannot create an account', () => {
    cy.visit('/')
      .get('#welcome-view-sign-up')
      .click()
    const username = getTimestampedUsername()
    signup({
      username: username,
      password: 'password',
      confirmPassword: 'password',
      firstName: 'Test',
      lastName: 'McTester',
      dateOfBirth: '04/23/1959'
    })
    cy.visit('/')
    cy.get('#welcome-view-sign-up').click()
    signup({
      username: username,
      password: 'password',
      confirmPassword: 'password',
      firstName: 'Test',
      lastName: 'McTester',
      dateOfBirth: '04/23/1959'
    })
  })
})
