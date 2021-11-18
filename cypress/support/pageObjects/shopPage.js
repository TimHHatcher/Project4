class ShopPage {
	getCheckoutLink() {
		return cy.contains('Checkout')
	}
}

export const shopPage = new ShopPage()
