describe('Framework setup', () => {
	before('Visit website', () => {
		cy.fixture('customerData').as('customers') //The only way to get this to work is to not use a normal function, as in below, or to use globalThis
		cy.visit('https://rahulshettyacademy.com/angularpractice/')
	})

	it('Form Information', function () {
		cy.get('label').contains('Name').next().type(this.customers.name)
		cy.get('label')
			.contains('Name')
			.next()
			.should('have.value', this.customers.name)
			.and('have.attr', 'minlength', 2)
		cy.get('#exampleFormControlSelect1').select(this.customers.gender)
		cy.get('#exampleFormControlSelect1').should(
			'have.value',
			this.customers.gender
		)
		cy.get('#inlineRadio3').should('be.disabled')
	})

	it.only('Select product by name and click the add button', () => {
		cy.contains('Shop').click()
		cy.selectProduct('Samsung Note 8') //Custom command
	})
})
