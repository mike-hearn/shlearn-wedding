/* global describe, it, cy, beforeEach, context, expect */
describe('RSVP Form', () => {
  beforeEach(() => {
    cy.request('http://localhost:8000/admin/reset/');
    cy.visitAndWait('/rsvp');
  });
  it('it can choose between similarly named people', () => {
    cy.get('.ember-text-field').type('Mike Hear{enter}');
    cy.get('label').should('have.length', 2);
    cy
      .get('label')
      .first()
      .click();
    cy.contains('Submit').click();
  });
  it.only("won't retrieve notes when resubmitting an invite", () => {
    cy.server();
    cy.route({
      method: 'PATCH',
      url: '/people/*/',
      onResponse: (xhr) => {
        expect(xhr.request.body.data.attributes.attendance).to.equal('Unable to attend')
        expect(xhr.response.body.data.attributes.attendance).to.equal('Unable to attend')
      }
    })
    cy.enterGuestName('Ece Manisali');
    cy.enterPlusOne();
    cy.enterMealAndAttendance({days: 'Unable to attend'});
  });
  it('quick end to end', () => {
    cy.get('.ember-text-field').type('Mike Hear{enter}');
    cy.contains('Michael Hearn').click();
    cy.contains('Submit').click();
    cy.get('.rsvp__individual-rsvp').each($el => {
      cy.wrap(['Friday and Saturday', 'Beef']).each(option => {
        cy
          .wrap($el)
          .contains(option)
          .click();
      });
    });
    cy.get('.form-song-requests').type('Play something awesome.{enter}{enter}New line.');
    cy.get('.form-anything-else').type("You're cool.");
    cy.contains('Submit').click();
  });
});
