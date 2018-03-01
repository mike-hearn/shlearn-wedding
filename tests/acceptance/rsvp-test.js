import $ from "jquery";
import { module, test } from "qunit";
import { visit, fillIn, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | rsvp", function(hooks) {
  setupApplicationTest(hooks);

  test("person match: with one match, only invitation is shown", async function(assert) {
    let { fullName } = await server.create("person");

    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");

    let personHeader = document.querySelector(".rsvp--person-name").textContent;
    assert.equal(personHeader, fullName);

    server.db.emptyData();
  });

  test("person match: with two matches, show name picker", async function(assert) {
    let people = await server.createList("person", 2);

    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");

    await assert.equal($(".rsvp__multiple-matches .person-option").length, 2);

    await $(".rsvp__multiple-matches .person-option")
      .first()
      .click();
    await $(".rsvp__multiple-matches button").click();

    let personHeader = document.querySelector(".rsvp--person-name").textContent;
    assert.equal(personHeader, people[0].fullName);

    server.db.emptyData();
  });
});
