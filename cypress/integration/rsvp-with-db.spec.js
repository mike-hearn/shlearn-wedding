/* global describe, it, cy, beforeEach, context, expect */
describe('RSVP Form', () => {
  beforeEach(() => {
    cy.server({matchBase: false});
    cy.route({
      method: 'PATCH',
      url: '/api/people/*/',
      onResponse: (xhr) => {
        expect(xhr.response.body.data.attributes.attendance).to.equal(xhr.request.body.data.attributes.attendance)
      }
    })
    cy.request('http://localhost:8000/admin/reset/');
    cy.visitAndWait('/rsvp');
  });
  it("won't retrieve notes when resubmitting an invite", () => {
    cy.server({matchBase: false});
    cy.route({
      method: 'PATCH',
      url: '/api/people/*/',
      onResponse: (xhr) => {
        expect(xhr.response.body.data.attributes.attendance).to.equal(xhr.request.body.data.attributes.attendance)
      }
    })
    cy.enterGuestName('Ece Manisali');
    cy.enterPlusOne();
    cy.enterMealAndAttendance({days: '(Wedding Day)'});
    cy.get('h4').should('have.length', 3);
  });
  it("Doesn't invite a guest, it marks them as X's", () => {
    // let attendance = 'Friday and Saturday';
    cy.server({matchBase: false});
    cy.route({
      method: 'PATCH',
      url: '/api/people/76/',
      onResponse: (xhr) => {
        expect(xhr.response.body.data.attributes.attendance).to.equal("Friday and Saturday")
      }
    })
    cy.route({
      method: 'PATCH',
      url: '/api/people/77/',
      onResponse: (xhr) => {
        expect(xhr.response.body.data.attributes.attendance).to.equal("Unable to attend")
      }
    })
    cy.enterGuestName('Ece Manisali');
    cy.contains('No').click();
    cy.contains('Submit').click();
    cy.enterMealAndAttendance({days: 'Friday and Saturday'});
    cy.get('h4').should('have.length', 2);
  });

  it("known couple (two known guests)", () => {
    cy.enterGuestName('Mike Hearn');
    cy.get('body').should('contain', 'Ashley Mas').and('contain', 'Michael Hearn');
    cy.enterMealAndAttendance({days: 'Friday and Saturday'});
    cy.get('body').should('contain', 'Ashley Mas').and('contain', 'Michael Hearn');
  });
  it("known person, unknown +1 - not bringing a guest", () => {
    // Name?
    cy.enterGuestName('Courtney Mas');

    // Bringing a guest?
    cy.contains('No').click();
    cy.contains('Submit').click();

    // Attending/food/comments?
    cy.get('.rsvp__individual-rsvp').should('have.length', 1)
    cy.get('body').should('contain', 'Courtney Mas').and('not.contain', 'Guest');
    cy.enterMealAndAttendance({days: 'Friday and Saturday'});
    cy.get('body').should('contain', 'Courtney Mas').and('not.contain', 'Guest');

    // Verify backend
    cy.request(`${Cypress.env('API_URL')}/people/7/?format=vnd.api%2Bjson`).then(response => {
      if (typeof response.body === "string") {
        let body = JSON.parse(response.body);
        expect(body.data.attributes.attendance).to.eq('Friday and Saturday');
      }
    })
    cy.request(`${Cypress.env('API_URL')}/people/8/?format=vnd.api%2Bjson`).then(response => {
      if (typeof response.body === "string") {
        let body = JSON.parse(response.body);
        expect(body.data.attributes.attendance).to.eq('Unable to attend');
      }
    })
  });
  it("known person, unknown +1 - bringing a guest, but no name", () => {
    // Name?
    cy.enterGuestName('Courtney Mas');

    // Bringing a guest?
    cy.contains('Yes').click();
    cy.contains('Submit').click();

    // Attending/food/comments?
    cy.get('.rsvp__individual-rsvp').should('have.length', 2)
    cy.get('body').should('contain', 'Courtney Mas').and('contain', 'Guest');
    cy.enterMealAndAttendance({days: 'Friday and Saturday'});
    cy.get('body').should('contain', 'Courtney Mas').and('contain', 'Guest');

    cy.request(`${Cypress.env('API_URL')}/people/7/?format=vnd.api%2Bjson`).then(response => {
      if (typeof response.body === "string") {
        let body = JSON.parse(response.body);
        expect(body.data.attributes.attendance).to.eq('Friday and Saturday');
      }
    })
  });
  it("known person, unknown +1 - bringing a guest, name is John Doe", () => {
    // Name?
    cy.enterGuestName('Courtney Mas');

    // Bringing a guest?
    cy.contains('Yes').click();
    cy.get('input[type=text]').type('John Doe')
    cy.contains('Submit').click();

    // Attending/food/comments?
    cy.get('.rsvp__individual-rsvp').should('have.length', 2)
    cy.get('body').should('contain', 'Courtney Mas').and('contain', 'John Doe');
    cy.enterMealAndAttendance({days: 'Friday and Saturday'});

    cy.get('body').should('contain', 'Courtney Mas').and('contain', 'John Doe');
    cy.request(`${Cypress.env('API_URL')}/people/7/?format=vnd.api%2Bjson`).then(response => {
      if (typeof response.body === "string") {
        let body = JSON.parse(response.body);
        expect(body.data.attributes.attendance).to.eq('Friday and Saturday');
      }
    })
    cy.request(`${Cypress.env('API_URL')}/people/8/?format=vnd.api%2Bjson`).then(response => {
      if (typeof response.body === "string") {
        let body = JSON.parse(response.body);
        expect(body.data.attributes.attendance).to.eq('Friday and Saturday');
        expect(body.data.attributes["first-name"]).to.eq('John');
        expect(body.data.attributes["last-name"]).to.eq('Doe');
      }
    })
  });
  it("single person", () => {
    cy.enterGuestName('Kaitlyn Mas');

    // Attending/food/comments?
    cy.get('.rsvp__individual-rsvp').should('have.length', 1)
    cy.get('body').should('contain', 'Kaitlyn Mas').and('not.contain', 'Guest');
    cy.enterMealAndAttendance({days: 'Friday and Saturday'});
    cy.get('body').should('contain', 'Kaitlyn Mas').and('not.contain', 'Guest');

    cy.request(`${Cypress.env('API_URL')}/people/24/?format=vnd.api%2Bjson`).then(response => {
      if (typeof response.body === "string") {
        let body = JSON.parse(response.body);
        expect(body.data.attributes.attendance).to.eq('Friday and Saturday');
      }
    })
  });
  it("single person, saturday only", () => {
    cy.enterGuestName('Kaitlyn Mas');

    // Attending/food/comments?
    cy.get('.rsvp__individual-rsvp').should('have.length', 1)
    cy.get('body').should('contain', 'Kaitlyn Mas').and('not.contain', 'Guest');
    cy.enterMealAndAttendance({days: 'Saturday (Wedding Day)'});
    cy.get('body').should('contain', 'Kaitlyn Mas').and('not.contain', 'Guest');

    cy.request(`${Cypress.env('API_URL')}/people/24/?format=vnd.api%2Bjson`).then(response => {
      if (typeof response.body === "string") {
        let body = JSON.parse(response.body);
        expect(body.data.attributes.attendance).to.not.contain('Friday');
      }
    })
  });
});
