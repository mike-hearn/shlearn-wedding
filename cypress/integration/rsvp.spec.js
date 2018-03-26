/* global describe, it, cy, context, beforeEach */
describe('RSVP Form', () => {
  context('when 2 or more guests match name search', () => {
    it('prompts a guest with a +1 to give their name', () => {
      cy.scenario('withTwoGuests');
      cy.visitAndWait('/rsvp');
      cy.server();
      cy.route('GET', '/people/**', {a: 1});

      cy.get('.enter-full-name').type('Mallika{enter}', {force: true});
      cy.get('.person-option').should('have.length', 2);
    });
    it.only('shows guest screen after fuzzy name match of 2+ guests', () => {
      cy.scenario('fuzzyMatchWithUnknownGuest');
      cy.visitAndWait('/rsvp');

      cy.get('.enter-full-name').type('Mallika{enter}', {force: true});
      cy
        .get('.person-option')
        .first()
        .click();
      cy.contains('Submit').click();
      cy.contains('Yes').click();
      cy.get('.input-guest-name').type('Guest name{enter}');
      cy
        .get('.rsvp__individual-rsvp')
        .should('have.length', 2)
        .each($el => {
          cy
            .wrap($el)
            .contains('Friday')
            .click();
          cy
            .wrap($el)
            .contains('Beef')
            .click();
        });
      cy
        .get('button')
        .contains('Submit')
        .click();
    });
  });
  context('single guest with unknown +1', () => {
    beforeEach(() => {
      cy.scenario('withTwoGuestsOneUnknown');
      cy.visitAndWait('/rsvp');
      cy.get('.enter-full-name').type('John Doe{enter}', {force: true});
    });

    it('prompts a guest with a +1 to give their name', () => {
      cy
        .get('.guest-name-form')
        .contains('Yes')
        .click();
      cy.get('.input-guest-name').should('exist');
    });
    it('selecting "no guest" shows only a single rsvp form', () => {
      cy
        .get('.guest-name-form')
        .contains('No')
        .click();
      cy
        .get('.guest-name-form')
        .contains('Submit')
        .click();
      cy.get('.rsvp__individual-rsvp').should('have.length', 1);
    });
    it('selecting "yes" on guest form shows two rsvp forms', () => {
      cy
        .get('.guest-name-form')
        .contains('Yes')
        .click();
      cy
        .get('.guest-name-form')
        .contains('Submit')
        .click();
      cy.get('.rsvp__individual-rsvp').should('have.length', 2);
    });
    it('not selecting yes/no does not let person proceed', () => {
      cy
        .get('.guest-name-form')
        .contains('Submit')
        .should('be.disabled');

      cy
        .get('.guest-name-form')
        .contains('No')
        .click();
      cy
        .get('.guest-name-form')
        .contains('Submit')
        .should('be.enabled');
    });
    it('guest form can be submitted even if name is unfilled', () => {
      cy
        .get('.guest-name-form')
        .contains('Yes')
        .click();
      cy
        .get('.guest-name-form')
        .contains('Submit')
        .click();
      cy.get('.rsvp-for-guest-0').should('have.length.above', 0);
    });
  });
});
