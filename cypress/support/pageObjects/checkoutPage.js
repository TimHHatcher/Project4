class CheckoutPage {
	getCheckoutLink() {
		return cy.contains('Checkout')
	}

	getCountryField() {
		return cy.get('#country')
	}

	getTermsAndConditions() {
		return cy.get('#checkbox2')
	}

	getSubmitButton() {
		return cy.get('form')
	}

	getSuccessMessage() {
		return cy.get('.alert-success')
	}

	getCountryOptions() {
		return cy.get('.suggestions > ul > li')
	}
}

export const checkoutPage = new CheckoutPage()
