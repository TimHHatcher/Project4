import { homePage } from '../support/pageObjects/homePage'
import { shopPage } from '../support/pageObjects/shopPage'
import { checkoutPage } from '../support/pageObjects/checkoutPage'

describe('Framework setup', () => {
	beforeEach('Visit website', () => {
		cy.fixture('customerData').as('customers') //Creates an alias that can be access below. Fixture can be accessed by globalThis or the use of normal function
		cy.visit('/')
	})

	it('Form Information', function () {
		//Uses page object pattern model
		homePage.getNameField().type(this.customers.name)
		homePage
			.getNameField()
			.should('have.value', this.customers.name)
			.and('have.attr', 'minlength', 2)
		homePage.getGenderField().select(this.customers.gender)
		homePage.getGenderField().should('have.value', this.customers.gender)
		homePage.getEntreprenuerRadioButton().should('be.disabled')
	})

	it.only('Select product by name and click the add button', function () {
		//Uses page object pattern model
		homePage.getShopTab().click()
		this.customers.products.forEach(function (name) {
			cy.selectProduct(name.productName) //Custom command
		})
		shopPage.getCheckoutLink().click()
		cy.get('h4').each((productName, index) => {
			expect(productName.text()).to.eq(
				this.customers.products[index].productName
			)
		})
		this.customers.products.forEach(function (name) {
			cy.get('tbody')
				.contains('tr', name.productName)
				.then(tableRow => {
					cy.wrap(tableRow).find('td').eq(3).should('contain', name.price)
				})
		})
		let priceTotal = 0
		cy.get('td:nth-child(4) strong')
			.each(itemPriceText => {
				const priceText = itemPriceText.text().split(' ')
				const priceNumber = Number(priceText[1])
				priceTotal = priceTotal + priceNumber
			})
			.then(() => {
				expect(priceTotal).to.eq(150000)
			})
		checkoutPage.getCheckoutLink().click()
		checkoutPage.getCountryField().type('United')
		checkoutPage.getCountryOptions().contains(this.customers.country).click()
		checkoutPage.getTermsAndConditions().check({ force: true })
		checkoutPage.getSubmitButton().submit()
		checkoutPage
			.getSuccessMessage()
			.should(
				'include.text',
				'Success! Thank you! Your order will be delivered in next few weeks :-).'
			)
	})
})
