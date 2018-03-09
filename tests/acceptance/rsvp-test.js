import $ from "jquery";
import { module, test, skip } from "qunit";
import { visit, fillIn, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | rsvp", function(hooks) {
  setupApplicationTest(hooks);

  test("person match: with one match, only invitation is shown", async function(assert) {
    let { fullName } = await server.create("person");

    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");

    let $personHeader = $(`h4:contains("${fullName}")`)
    assert.ok(($personHeader.length !== 0));

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

    let $personHeader = $(`h4:first:contains("${people[0].fullName}")`)
    assert.ok(($personHeader.length !== 0));

    server.db.emptyData();
  });

  test("cannot hit submit if name not entered", async function(assert) {
    await server.createList("person", 2);

    await visit("/rsvp");
    await $("button:contains('submit')").click();

    assert.ok(
      $("body")
        .text()
        .indexOf("Please enter your full name") > -1
    );

    server.db.emptyData();
  });

  test("cannot submit name selection if no radio buttons chosen", async function(assert) {
    await server.createList("person", 2);

    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");

    await $("button:contains('submit')").click();

    assert.ok(
      $("body")
        .text()
        .indexOf("Which guest are you?") > -1
    );

    server.db.emptyData();
  });

  skip("show correct fields when guest has no +1", async function(assert) {
    // Assemble
    // Act
    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");
    // Assert
    assert.ok();
  });

  skip("show correct fields when guest is known (e.g. jon & dom)", async function(assert) {
    // Assemble
    // Act
    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");
    // Assert
    assert.ok();
  });

  skip("show correct fields when guest is unknown", async function(assert) {
    // Assemble
    // Act
    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");
    // Assert
    assert.ok();
  });
});
