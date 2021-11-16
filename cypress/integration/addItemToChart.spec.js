describe('Cart', () => {
	it('Add item to cart', () => {
		cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
		cy.get('.search-keyword').type('ca')
		cy.wait(2000)
		cy.get('.products .product').each(productList => {
			const productName = productList.find('.product-name').text()
			if (productName.includes('Capsicum')) {
				cy.wrap(productList).find('button').click()
			}
		})
		cy.get('.cart-icon').click()
		cy.contains('PROCEED TO CHECKOUT').click()
		cy.contains('Place Order').click()
	})
})
