import $ from "jquery";
import {module, test} from 'qunit';
import {setupRenderingTest} from 'ember-qunit';
import {render} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rsvp/guest-picker', function(hooks) {
  setupRenderingTest(hooks);

  test('names are shown, proper name is passed', async function(assert) {
    assert.expect(3);

    let people = await server.createList('person', 2);
    this.set('people', people);
    this.set('externalAction', (person) => {
      assert.equal(people[1].fullName, person.fullName)
    });

    await render(
      hbs`{{rsvp/guest-picker people=people onConfirm=(action externalAction)}}`,
    );

    assert.ok($('body').text().indexOf(people[0].fullName) > 0);
    assert.ok($('body').text().indexOf(people[1].fullName) > 0);

    await $(`:contains('${people[1].fullName}')`).click();
    await $(`:contains('Submit')`).click();

    server.db.emptyData();
  });
});
