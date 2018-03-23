/* global describe, it, cy */
describe('RSVP Form', () => {
  it('it can choose between similarly named people', () => {
    cy.visit('/rsvp');
    cy.get('.ember-text-field').type('Mike Hear{enter}');
    cy.get('label').should('have.length', 2);
    cy
      .get('label')
      .first()
      .click();
    cy.contains('Submit').click();
  });

  it.only('prompts a guest with a +1 to give their name', () => {
    Cypress.SelectorPlayground.defaults({
      selectorPriority: ['class', 'tag', 'attributes']
    })

    cy.visit('/rsvp');
    cy
      .get('.enter-full-name')
      .invoke('show')
      .type('Mallika{enter}', {force: true});
    cy.contains('Yes').click()
  });
});
