import { moduleFor, test } from 'ember-qunit';

moduleFor('route:where-to-stay', 'Unit | Route | where to stay', {
  // Specify the other units that are required for this test.
  needs: ['service:headData']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
