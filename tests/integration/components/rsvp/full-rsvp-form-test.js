import $ from "jquery";
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rsvp/full-rsvp-form', function(hooks) {
  setupRenderingTest(hooks);

  test('shows two RSVPs for two known persons', async function(assert) {
    let invitation = await server.create('invitation', 'withTwoGuests');

    await this.set('invitation', invitation);

    await render(hbs`{{rsvp/full-rsvp-form invitation=invitation}}`);

    assert.equal(this.element.textContent, 'fail');

    server.db.emptyData();

  });
});
