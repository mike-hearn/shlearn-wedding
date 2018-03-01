import { module, test } from "qunit";
import { visit, fillIn, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | rsvp", function(hooks) {
  setupApplicationTest(hooks);

  test("one match, only invitation is shown", async function(assert) {
    let { fullName } = await server.create("person");

    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");

    let personHeader = document.querySelector('.rsvp--person-name').textContent;
    assert.equal(personHeader, fullName);

    server.db.emptyData();
  });

  test("two matches, show name picker", async function(assert) {
    await server.createList("person", 2);

    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");

    assert.equal(document.querySelectorAll('.rsvp--person-option').length, 2);

    server.db.emptyData();
  });
});
