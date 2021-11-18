class HomePage {
	getNameField() {
		return cy.get('label').contains('Name').next()
	}

	getGenderField() {
		return cy.get('#exampleFormControlSelect1')
	}

	getEntreprenuerRadioButton() {
		return cy.get('#inlineRadio3')
	}

	getShopTab() {
		return cy.contains('Shop')
	}
}

export const homePage = new HomePage()
