describe('ToDo List tests', () => {

  const incompleteTitle = 'Incomplete'
  const completedTitle = 'Completed'

  it('Create list item as incomplete and add to list', () => {
    cy.createIncomplete(incompleteTitle)

    cy.get('[class^=todoItem]').should('contain.text', incompleteTitle)
    cy.get('[class^=todoItem_todoDetails]').first().within(() => {
      cy.get('[class^=todoItem_svgBox]').should('have.css', 'background-color', 'rgb(222, 223, 225)')
      cy.contains(incompleteTitle).should('not.have.css', 'text-decoration-line', 'line-through')
    })
  })

  it('Create list item as completed and add to list', () => {
    cy.createCompleted(completedTitle)

    cy.get('[class^=todoItem]').should('contain.text', completedTitle)
    cy.get('[class^=todoItem_todoDetails]').first().within(() => {
      cy.get('[class^=todoItem_svgBox]').should('have.css', 'background-color', 'rgb(100, 111, 240)')
      cy.contains(completedTitle).should('have.css', 'text-decoration-line', 'line-through')
    })
    
  })

  it('Delete a list item', () => {
    cy.createIncomplete(incompleteTitle)

    cy.get('[class^=todoItem]').contains(incompleteTitle)
    cy.get('[class^=todoItem_todoActions]').first().within(() => {
      cy.get('[role=button]').first().click()
    })
    cy.get('[class^=todoItem]').should('not.exist')
  })

  it('Edit a list item', () => {
    cy.createCompleted(completedTitle)

    cy.get('[class^=todoItem]').should('contain.text', completedTitle)
    cy.get('[class^=todoItem_todoDetails]').first().within(() => {
      cy.get('[class^=todoItem_svgBox]').should('have.css', 'background-color', 'rgb(100, 111, 240)')
      cy.contains('Completed').should('have.css', 'text-decoration-line', 'line-through')
    })
    cy.get('[class^=todoItem]').contains(completedTitle)
    cy.get('[class^=todoItem_todoActions]').first().within(() => {
      cy.get('[role=button]').eq(1).click()
    })
    
    cy.get('[class^=modal_container]').within(() => {
    cy.get('input[id=title]').clear().type(incompleteTitle)
    cy.get('label').contains('Status').find('option:selected').should('have.text', 'Completed')
    cy.get('select[id=type]').select('Incomplete')
    cy.get('label').contains('Status').find('option:selected').should('have.text', 'Incomplete')
    cy.get('button[type=submit]').contains("Update Task").click()
  })
    cy.get('[class^=modal_container]').should('not.exist')
    cy.get('[class^=todoItem]').contains(incompleteTitle).should('contain.text', 'Incomplete')
    cy.get('[class^=todoItem_todoDetails]').first().within(() => {
      cy.get('[class^=todoItem_svgBox]').should('have.css', 'background-color', 'rgb(222, 223, 225)')
      cy.contains('Incomplete').should('not.have.css', 'text-decoration-line', 'line-through')
    })
  })

  it('Sort list items', () => {

    cy.createIncomplete(incompleteTitle)
    cy.createCompleted(completedTitle)

    cy.get('[class^=app_appHeader]').within(() => {
      cy.get('select[id=status]').select('Incomplete')
    })
    cy.get('[class^=todoItem]').should('contain', 'Incomplete')
    cy.get('[class^=todoItem]').should('not.contain', 'Completed')

    cy.get('[class^=app_appHeader]').within(() => {
      cy.get('select[id=status]').select('Completed')
    })
    cy.get('[class^=todoItem]').should('contain', 'Completed')
    cy.get('[class^=todoItem]').should('not.contain', 'Incomplete')

     cy.get('[class^=app_appHeader]').within(() => {
      cy.get('select[id=status]').select('All')
    })
    cy.get('[class^=app_content]').children().should('have.length', 2)
  })
})