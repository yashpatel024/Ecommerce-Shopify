describe('Home to Product', () => {
  it('should navigate to the product page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000')

    cy.get('.hamburger-menu').first().click()

    // Find products Link in header
    cy.get('a[href*="products"]').first().click()

    // The new url should include "/product"
    cy.url().should('include', '/products')

    // The new page should contain an h1 with "Products"
    cy.get('h1').contains('Products')
  })
})

// Prevent TypeScript from reading file as legacy script
export {}
