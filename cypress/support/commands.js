// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/* global Cypress, cy */

/* Ember Fastboot's hydration tends to quickly delete elements if we get() them
 * too quickly; this short wait should be sufficient to prevent it, I hope. */
Cypress.Commands.add('visitAndWait', url => {
  cy.visit(url).wait(50);
});

Cypress.Commands.add('scenario', (scenario, options = {}) => {
  cy.window().then(window => {
    window.localStorage.testScenario = scenario;

    if (options.passthrough) {
      window.localStorage.passthrough = true;
    }
  });
});

Cypress.Commands.add('enterGuestName', (name = 'Michael Hearn') => {
  cy.log('---- Entering guest name...');
  cy.get('.ember-text-field').type(`${name}{enter}`);
});

Cypress.Commands.add('enterPlusOne', (bringingGuest = 'Yes') => {
  cy.log('---- Select plus one');
  cy
    .get('.bringing-guest-radio-button')
    .contains(bringingGuest)
    .click();
  cy
    .get('button')
    .contains('Submit')
    .click();
});

Cypress.Commands.add('enterMealAndAttendance', (options = {}) => {
  cy.log('---- Entering meal and attendance...');
  let days = options.days || 'Friday and Saturday';
  let meal = options.meal || 'Beef';
  let music = options.music || 'Anything will do.{enter}{enter}New line test.';
  let notes = options.notes || 'So happy for you guys.';
  cy.get('.rsvp__individual-rsvp').each($el => {
    cy.wrap([days, meal]).each(option => {
      cy
        .wrap($el)
        .contains(option)
        .click();
    });
  });
  cy
    .get('.form-song-requests')
    .type(music);
  cy.get('.form-anything-else').type(notes);
  cy.get('button').contains('Submit').click();
});

Cypress.Commands.add('endToEnd', (options = {}) => {
  let name = options.name || 'Mike Hearn';
  cy.visitAndWait('/rsvp');
  cy.get('.ember-text-field').type(`${name}{enter}`);
  cy
    .get('.form-song-requests')
    .type('Play something awesome.{enter}{enter}New line.');
  cy.get('.form-anything-else').type("You're cool.");
  cy.contains('Submit').click();
});
