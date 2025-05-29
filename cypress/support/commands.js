// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createCompleted', (title) => {
    cy.get('button[type=button]').contains("Add Task").click()

    cy.get('[class^=modal_container]').within(() => {
    cy.get('input[id=title]').type(title)
    cy.get('input[id=title]').should('have.value', title)
    cy.get('select[id=type]').select('Completed')
    cy.get('label').contains('Status').find('option:selected').should('have.text', 'Completed')
    cy.get('button[type=submit]').contains("Add Task").click()
    })
    cy.get('[class^=modal_container]').should('not.exist')
})

Cypress.Commands.add('createIncomplete', (title) => {
    cy.get('button[type=button]').contains("Add Task").click()

    cy.get('[class^=modal_container]').within(() => {
    cy.get('input[id=title]').type(title)
    cy.get('input[id=title]').should('have.value', title)
    cy.get('select[id=type]').select('Incomplete')
    cy.get('label').contains('Status').find('option:selected').should('have.text', 'Incomplete')
    cy.get('button[type=submit]').contains("Add Task").click()
    })
    cy.get('[class^=modal_container]').should('not.exist')
})