describe('Exercise 2', () => {
  it('Search "automatizacion" in Google, go to wikipedia page, find the first process and take a screenshot', () => {
    
    //Visit Google page
    cy.visit('https://www.google.es/')
    
    //Skip the cookies screen
    if(cy.contains('Antes de ir a Google')){
          cy.get('#L2AGLb').click()
    }
    
    //Type the word and press enter 
    cy.get('.gLFyf').type('automatización{enter}')
    
    //Search and access to wikipedia link 
    cy.contains('https://es.wikipedia.org').click()
    
    //Check the year of the first automatic process
    cy.contains('en 1785, convirtiéndose en el primer proceso industrial completamente automatizado')
    
    //Take a screenshot
    cy.screenshot()
  })
})







