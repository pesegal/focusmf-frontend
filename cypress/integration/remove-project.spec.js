describe('Remove project from task', () => {
  const login = () => {
    cy.visit('/login')
    cy.get('#username-input-field')
      .type('test@e.co')
    cy.get('#password-input-field')
      .type('password')
    cy.get('#login-button')
      .click()
  }

  it(`
      GIVEN I am a user
      WHEN I remove a project from a task
      THEN the task no longer references the project.
  `, () => {
    login()

    // Create task
    cy.get('.FmfList__card-actions button').first().click()
    cy.get('.FmfListCreateTaskDialog__name input').type('test task 1')
    cy.get('.FmfListCreateTaskDialog__notes textarea').type('notes notes')
    cy.get('.FmfListCreateTaskDialog__projects input').type('{downarrow}{enter}')
    cy.get('.FmfListCreateTaskDialog__save').click()

    // Remove project from task
    cy.get('.FmfProjectChip__chip').first().click()
    cy.get('.FmfProjectChip__remove').click()

    // Expect that the project is no longer in the projects listing

    // Expect that the project is no longer listed in the edit task dialog
    cy.get('.FmfListTask__action-menu').first().click()
    cy.get('.FmfListTask__edit').click()

    // Cleanup: delete task
    cy.get('.FmfListTask__action-menu').first().click()
    cy.get('.FmfListTask__delete').click()
  })
})
