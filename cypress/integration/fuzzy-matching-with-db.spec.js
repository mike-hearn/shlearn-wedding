/* global describe, it, cy, beforeEach, context */
describe('RSVP Form', () => {
  beforeEach(() => {
    cy.request('http://localhost:8000/admin/reset/');
    cy.visitAndWait('/rsvp');
  });
  context('fuzzy name recognition', () => {
    it('matches our guests names', () => {
      cy
        .fixture('guests')
        .then(guests => guests.filter(guest => guest.fields.first_name))
        .each(({fields: {first_name, last_name}}) => {
          cy.visitAndWait('/rsvp');
          cy.get('input').type(`${first_name} ${last_name}{enter}`);
          cy.get('body').should('satisfy', $el => {
            let text = $el.text();
            return (
              text.indexOf(`${first_name} ${last_name}`) > 0 ||
              text.indexOf(`bringing a guest`) > 0
            );
          });
        });
    });
  });
});
