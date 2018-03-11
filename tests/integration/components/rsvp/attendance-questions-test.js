import $ from "jquery";
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rsvp/attendance-questions', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    let people = await server.createList('person', 2);
    this.set('guest', people[0]);

    await render(hbs`{{rsvp/attendance-questions guest=guest}}`);

    assert.ok($(`body:contains('Which days can')`).length);

    server.db.emptyData();
  });
});
