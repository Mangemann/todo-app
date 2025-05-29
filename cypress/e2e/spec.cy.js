describe('ToDo List tests', () => {

  it('Create list item as incomplete and add to list', () => {
    cy.get('button[type=button]').contains("Add Task").click()

    cy.get('[class^=modal_container]').within(() => {
    cy.get('input[id=title]').type("Incomplete")
    cy.get('input[id=title]').should('have.value', 'Incomplete')
    cy.get('label').contains('Status').find('option:selected').should('have.text', 'Incomplete')
    cy.get('button[type=submit]').contains("Add Task").click()
    })
    cy.get('[class^=modal_container]').should('not.exist')

    cy.get('[class^=todoItem]').contains('Incomplete').should('have.text', 'Incomplete')
    cy.get('[class^=todoItem_todoDetails]').first().within(() => {
      cy.get('[class^=todoItem_svgBox]').should('have.css', 'background-color', 'rgb(222, 223, 225)')
      cy.contains('Incomplete').should('not.have.css', 'text-decoration-line', 'line-through')
    })
  })

  it('Create list item as completed and add to list', () => {
    cy.get('button[type=button]').contains("Add Task").click()

    cy.get('[class^=modal_container]').within(() => {
    cy.get('input[id=title]').type("Completed")
    cy.get('input[id=title]').should('have.value', 'Completed')
    cy.get('select[id=type]').select('Completed')
    cy.get('label').contains('Status').find('option:selected').should('have.text', 'Completed')
    cy.get('button[type=submit]').contains("Add Task").click()
    })
    cy.get('[class^=modal_container]').should('not.exist')

    cy.get('[class^=todoItem]').contains('Completed').should('have.text', 'Completed')
    cy.get('[class^=todoItem_todoDetails]').first().within(() => {
      cy.get('[class^=todoItem_svgBox]').should('have.css', 'background-color', 'rgb(100, 111, 240)')
      cy.contains('Completed').should('have.css', 'text-decoration-line', 'line-through')
    })
    
  })

  it('Delete a list item', () => {
     cy.get('button[type=button]').contains("Add Task").click()

    cy.get('[class^=modal_container]').within(() => {
    cy.get('input[id=title]').type("Completed")
    cy.get('button[type=submit]').contains("Add Task").click()
    })
    cy.get('[class^=modal_container]').should('not.exist')

    cy.get('[class^=todoItem]').contains('Completed')
    cy.get('[class^=todoItem_todoActions]').first().within(() => {
      cy.get('[role=button]').first().click()
    })
     cy.get('[class^=todoItem]').should('not.exist')
  })

  it('Edit a list item', () => {
    cy.get('button[type=button]').contains("Add Task").click()

    cy.get('[class^=modal_container]').within(() => {
    cy.get('input[id=title]').type("Completed")
    cy.get('select[id=type]').select('Completed')
    cy.get('button[type=submit]').contains("Add Task").click()
    })
    cy.get('[class^=modal_container]').should('not.exist')

    cy.get('[class^=todoItem]').contains('Completed').should('have.text', 'Completed')
    cy.get('[class^=todoItem_todoDetails]').first().within(() => {
      cy.get('[class^=todoItem_svgBox]').should('have.css', 'background-color', 'rgb(100, 111, 240)')
      cy.contains('Completed').should('have.css', 'text-decoration-line', 'line-through')
    })
    cy.get('[class^=todoItem]').contains('Completed')
    cy.get('[class^=todoItem_todoActions]').first().within(() => {
      cy.get('[role=button]').eq(1).click()
    })
    
    cy.get('[class^=modal_container]').within(() => {
    cy.get('input[id=title]').clear().type("Incomplete")
    cy.get('label').contains('Status').find('option:selected').should('have.text', 'Completed')
     cy.get('select[id=type]').select('Incomplete')
    cy.get('label').contains('Status').find('option:selected').should('have.text', 'Incomplete')
      cy.get('button[type=submit]').contains("Update Task").click()
  })
cy.get('[class^=modal_container]').should('not.exist')
  cy.get('[class^=todoItem]').contains('Incomplete').should('have.text', 'Incomplete')
    cy.get('[class^=todoItem_todoDetails]').first().within(() => {
      cy.get('[class^=todoItem_svgBox]').should('have.css', 'background-color', 'rgb(222, 223, 225)')
      cy.contains('Incomplete').should('not.have.css', 'text-decoration-line', 'line-through')
    })
  })

  it.only('Sort list items', () => {

    cy.get('button[type=button]').contains("Add Task").click()

    cy.get('[class^=modal_container]').within(() => {
    cy.get('input[id=title]').type("Incomplete")
    cy.get('input[id=title]').should('have.value', 'Incomplete')
    cy.get('label').contains('Status').find('option:selected').should('have.text', 'Incomplete')
    cy.get('button[type=submit]').contains("Add Task").click()
    })
    cy.get('[class^=modal_container]').should('not.exist')

    cy.get('button[type=button]').contains("Add Task").click()
    cy.get('[class^=modal_container]').within(() => {
    cy.get('input[id=title]').type("Completed")
    cy.get('input[id=title]').should('have.value', 'Completed')
    cy.get('select[id=type]').select('Completed')
    cy.get('label').contains('Status').find('option:selected').should('have.text', 'Completed')
    cy.get('button[type=submit]').contains("Add Task").click()
    })
    cy.get('[class^=modal_container]').should('not.exist')
    cy.get('[class^=todoItem]').contains('Completed').should('have.text', 'Completed')
    cy.get('[class^=todoItem_todoDetails]').eq(1).within(() => {
      cy.get('[class^=todoItem_svgBox]').should('have.css', 'background-color', 'rgb(100, 111, 240)')
      cy.contains('Completed').should('have.css', 'text-decoration-line', 'line-through')
    })

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
  })
})