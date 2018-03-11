import $ from "jquery";
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Object from '@ember/object';

module('Integration | Component | rsvp/full-rsvp-form', function(hooks) {
  setupRenderingTest(hooks);

  test('shows two RSVPs for two known persons', async function(assert) {
    let people = server.createList('person', 2).map(p => Object.create(p.attrs));
    let invitation = Object.create({
      guests: people
    })

    this.set('invitation', invitation);

    await render(hbs`{{rsvp/full-rsvp-form invitation=invitation}}`);

    assert.ok($(`.rsvp__individual-rsvp:contains(${people[0].fullName})`).length > 0);
    assert.ok($(`.rsvp__individual-rsvp:contains(${people[1].fullName})`).length > 0);
    assert.ok($(`.rsvp__individual-rsvp`).length === 2);

    server.db.emptyData();

  });

});
