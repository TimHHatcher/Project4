describe('First Test', () => {
	it('Open website', () => {
		cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
		cy.get('.search-keyword').type('ca')
		cy.wait(2000)
		cy.get('.product:visible').should('have.length', 4) //Get products from entire page
		cy.get('.products').as('products') //Aliasing the element
		cy.get('@products').find('.product').should('have.length', 4) //Get the products block only with find (parent/child chain)
		cy.get('@products').find('.product').eq(1).contains('ADD TO CART').click()
		cy.get('@products')
			.find('.product')
			.each(productList => {
				const productName = productList.find('.product-name').text()
				console.log(productName) //prints to the browser console in dev tools
				cy.log(productName) //prints to the test runner
				if (productName.includes('Capsicum')) {
					cy.wrap(productList).find('button').click()
				}
			})
	})
})
