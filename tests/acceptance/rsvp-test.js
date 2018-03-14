import $ from "jquery";
import { module, test, skip } from "qunit";
import { visit, fillIn, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | rsvp", function(hooks) {
  setupApplicationTest(hooks);

  test("person match: with one match, only invitation is shown", async function(assert) {
    await server.create("person", {fullName: "John Doe"});

    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");

    let $personHeader = $(`h4:contains(John)`);
    assert.ok($personHeader.length !== 0, "nickname is displayed");
    $personHeader = $(`h4:contains(John Doe)`);
    assert.ok($personHeader.length === 0, "fullname is NOT displayed");

    server.db.emptyData();
  });

  test("person match: with two matches, show name picker", async function(assert) {
    let people = await server.createList("person", 2);

    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");

    await assert.equal(
      $(".rsvp__multiple-matches .person-option").length,
      2,
      "two options are shown"
    );

    await $(".rsvp__multiple-matches .person-option")
      .first()
      .click();
    await $(".rsvp__multiple-matches button").click();

    let $personHeader = $(`h4:first:contains("${people[0].nickname}")`);
    assert.ok(
      $personHeader.length !== 0,
      "person's name appears at top of rsvp"
    );

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

  test("show correct fields when guest has no +1", async function(assert) {
    // Assemble - 2-person fuzzy match, but first person has only one person on
    // their invitation
    let invitation = server.create("invitation");
    let person = server.create("person", { invitation });
    server.create("person");

    // Act
    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");

    await $(`:contains("${person.fullName}")`).click();
    await $(`:contains("Submit")`).click();

    // Assert
    assert.equal($("h4").length, 1);

    server.db.emptyData();
  });

  test("show correct fields when guest is known (e.g. jon & dom)", async function(assert) {
    // Assemble
    let invitation = server.create("invitation", "withTwoGuests");
    let people = server.db.people.where({ invitationId: invitation.id });
    // Act
    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");
    // Assert
    assert.ok($(`body:contains(${people[0].fullName})`).length > 0);
    assert.ok($(`body:contains(${people[1].fullName})`).length > 0);

    server.db.emptyData();
  });

  test("show correct fields when guest is unknown", async function(assert) {
    server.create("invitation", "withTwoGuestsOneUnknown");

    await visit("/rsvp");
    await fillIn("#person-search input", "John Doe");
    await click("#person-search button");

    assert.ok($(`body:contains(Are you bringing a guest)`).length > 0);

    await $(`:contains('Yes')`).click();

    assert.ok($(`body:contains(What is your guest's name)`).length > 0);

    server.db.emptyData();
  });

  skip("if not bringing unknown guest, show only original person", async function(assert) {
    // server.create('invitation', 'withTwoGuestsOneUnknown');

    // await visit("/rsvp");
    // await fillIn("#person-search input", "John Doe");
    // await click("#person-search button");

    // assert.ok($(`body:contains(Are you bringing a guest)`).length > 0);

    // await $(`input:contains('Yes')`).click();

    assert.ok();

    // server.db.emptyData();
  });

  skip("make sure known person is listed first", async function(assert) {
    // server.create('invitation', 'withTwoGuestsOneUnknown');

    // await visit("/rsvp");
    // await fillIn("#person-search input", "John Doe");
    // await click("#person-search button");

    // assert.ok($(`body:contains(Are you bringing a guest)`).length > 0);

    // await $(`input:contains('Yes')`).click();

    assert.ok();

    // server.db.emptyData();
  });

  skip("put searched user first in rsvp list", async function(assert) {
    // server.create('invitation', 'withTwoGuestsOneUnknown');

    // await visit("/rsvp");
    // await fillIn("#person-search input", "John Doe");
    // await click("#person-search button");

    // assert.ok($(`body:contains(Are you bringing a guest)`).length > 0);

    // await $(`input:contains('Yes')`).click();

    assert.ok();

    // server.db.emptyData();
  });
});
