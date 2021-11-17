describe('Element interactions', () => {
	it('Checkboxes', () => {
		cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
		cy.get('#checkBoxOption1')
			.check()
			.should('be.checked')
			.and('have.value', 'option1')

		cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
		cy.get('[type="checkbox"]').check() //will check all boxes of type checkbox
		cy.get('[type="checkbox"]').uncheck() //will uncheck all boxes of type checkbox
		cy.get('[type="checkbox"]').check(['option2', 'option3']) //will check boxes of value
	})

	it('Dropdowns', () => {
		cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
		cy.get('#dropdown-class-example')
			.select('Option2')
			.should('have.value', 'option2') //static dropdown
		cy.get('#autocomplete').type('US') //dynamic dropdown
		cy.get('.ui-autocomplete')
			.find('li')
			.each(countryList => {
				if (countryList.text() == 'United States (USA)') {
					cy.wrap(countryList).click()
				}
			})
		cy.get('#autocomplete').should('have.value', 'United States (USA)')
	})

	it('Element hidden or not', () => {
		cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
		cy.get('#displayed-text').should('be.visible')
		cy.get('#hide-textbox').click()
		cy.get('#displayed-text').should('not.be.visible')
		cy.get('#show-textbox').click()
		cy.get('#displayed-text').should('be.visible')
	})

	it('Radio buttons', () => {
		cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
		cy.get('[value="radio2"]').check().should('be.checked')
	})

	it('Alert popups', () => {
		cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
		cy.get('#alertbtn').click() //Cypress auto accepts alerts and popups from browser events
		cy.get('#confirmbtn').click()
		cy.on('window:alert', message => {
			//Fires browser event for window:alert and validates text of the event
			expect(message).to.equal(
				'Hello , share this practice page and share your knowledge'
			)
		})
		cy.on('window:confirm', message => {
			//Fires browser event for window:confirm and validates text of the event
			expect(message).to.equal('Hello , Are you sure you want to confirm?')
		})
		cy.on('window:confirm', message => {
			//Clicks cancel on event popup
			cy.on('window:confirm', () => false) //Supposedly simulates click of the cancel button
		})
	})

	it('Child tabs', () => {
		cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
		cy.get('#opentab').invoke('removeAttr', 'target').click() //Remove target attribute to test opening a tab which opens in the same tab
		cy.url().should('contain', 'rahulshettyacademy.com')
		cy.go('back')
		cy.url().should('contain', 'AutomationPractice')
	})

	it('Tables', () => {
		cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
		cy.get('[name="courses"] tbody')
			.contains('tr', 'Master Selenium Automation in simple Python Language')
			.then(tableRow => {
				cy.wrap(tableRow).find('td').eq(2).should('contain', '25')
			})
	})

	it.only('Mousehover', () => {
		cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
		//cy.get('.mouse-hover-content').invoke('show') This will cause the hidden elements to be visible using invoke, which uses jquery
		cy.contains('Top').click({ force: true }) //force click an invisible element using cypress
		cy.url().should('contain', 'top')
	})
})
