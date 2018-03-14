import $ from 'jquery';
import {module, test, skip} from 'qunit';
import {setupRenderingTest} from 'ember-qunit';
import {render, fillIn} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Object from '@ember/object';

module('Integration | Component | rsvp/full-rsvp-form', function(hooks) {
  setupRenderingTest(hooks);

  test('shows two RSVPs for two known persons', async function(assert) {
    let people = server
      .createList('person', 2)
      .map(p => Object.create(p.attrs));
    people.forEach(p => {
      p.displayName = p.nickname || p.fullName;
    });
    let invitation = Object.create({
      guests: people,
    });

    this.set('invitation', invitation);
    this.set('person', people[0]);

    await render(
      hbs`{{rsvp/full-rsvp-form personInitiatedRSVP=person invitation=invitation}}`,
    );

    assert.ok(
      $(`.rsvp__individual-rsvp:contains(${people[0].nickname})`).length > 0,
      "first person's full name appears",
    );
    assert.ok(
      $(`.rsvp__individual-rsvp:contains(${people[1].nickname})`).length > 0,
      "second person's full name appears",
    );
    assert.ok($(`.rsvp__individual-rsvp`).length === 2, 'there are two rsvps');

    server.db.emptyData();
  });

  test('shows guest name form if unknown +1', async function(assert) {
    let invitation = await Object.create(
      server.create('invitation', 'withTwoGuestsOneUnknown').attrs,
    );
    let people = await server.db.people.where({invitationId: invitation.id});

    invitation.set('guests', people);
    this.set('invitation', invitation);

    await render(hbs`{{rsvp/full-rsvp-form invitation=invitation}}`);

    assert.ok($(`body:contains(Unknown guest)`).length > 0);

    server.db.emptyData();
  });

  test('with unknown guest, known guest listed first', async function(assert) {
    let invitation = await Object.create(
      server.create('invitation', 'withTwoGuestsOneUnknown').attrs,
    );
    let people = await server.db.people
      .where({invitationId: invitation.id})
      .map(p => Object.create(p));
    people.forEach(p => {
      p.displayName = p.nickname || p.fullName;
    });

    invitation.set('guests', people);
    this.set('invitation', invitation);

    await render(hbs`{{rsvp/full-rsvp-form invitation=invitation}}`);
    await $(':contains(Yes)').click();
    await fillIn('input[type=text]', 'Fake User');
    await $(':contains(Submit)').click();


    assert.ok(
      $(`.rsvp__individual-rsvp > h4:first:contains(${people[0].nickname})`)
        .length > 0,
      'the known person is listed first',
    );
    server.db.emptyData();
  });

  skip('if unknown guest not provided name, say `Your guest`', async function(assert) {
    let invitation = await Object.create(
      server.create('invitation', 'withTwoGuestsOneUnknown').attrs,
    );
    let people = await server.db.people
      .where({invitationId: invitation.id})
      .map(p => Object.create(p));

    invitation.set('guests', people);
    this.set('invitation', invitation);

    await render(hbs`{{rsvp/full-rsvp-form invitation=invitation}}`);
    await $(':contains(Yes)').click();
    await $(':contains(Submit)').click();

    assert.ok(
      $(`.rsvp__individual-rsvp > h4:first:contains(${people[0].fullName})`)
        .length > 0,
    );
    assert.ok($(`.rsvp__individual-rsvp > h4:last:contains(Guest)`).length > 0);

    server.db.emptyData();
  });
});
