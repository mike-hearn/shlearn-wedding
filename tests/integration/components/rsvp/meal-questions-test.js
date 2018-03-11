import $ from "jquery";
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rsvp/meal-questions', function(hooks) {
  setupRenderingTest(hooks);

  test('Mentions beef, chicken, vegetarian', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    let people = await server.createList('person', 2);
    this.set('guest', people[0]);

    await render(hbs`{{rsvp/meal-questions guest=guest}}`);

    assert.ok($(`body:contains('Beef')`).length);
    assert.ok($(`body:contains('Chicken')`).length);
    assert.ok($(`body:contains('Vegetarian')`).length);

    server.db.emptyData();
  });
});
