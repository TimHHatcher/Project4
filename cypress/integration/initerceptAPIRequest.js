describe('API', () => {
	beforeEach('Open Website', () => {
		cy.fixture('books').as('books')
		cy.visit(Cypress.env('books'))
	})

	it('Intercept API request and provide response', function () {
		cy.intercept('GET', '**/GetBook*', { fixture: 'books.json' }).as('bookList')
		cy.get('button').contains('Virtual Library').click()
		cy.wait('@bookList')
		this.books.forEach(function (book) {
			cy.get('tbody')
				.contains('tr', book.book_name)
				.then(tableRow => {
					cy.wrap(tableRow).find('td').eq(0).should('contain', book.isbn)
					cy.wrap(tableRow).find('td').eq(1).should('contain', book.aisle)
					cy.wrap(tableRow).find('td').eq(2).should('contain', book.book_name)
				})
		})
	})
})
