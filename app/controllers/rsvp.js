import Controller from "@ember/controller";
import { computed } from "@ember/object";
import RSVP from 'rsvp';

export default Controller.extend({
  singleMatch: computed.equal("peopleMatches", 1),
  person: true,
  actions: {
    searchPeople(name) {
      this.store
        .query("person", {
          filter: {
            fullName: name
          },
          include: "invitation.guests"
        })
        .then(people => {
          this.set("people", people);
          this.set("peopleMatches", people.get("length"));

          if (people.get("length") === 1) {
            this.send("selectPerson", people.get("firstObject"));
          }
        });
    },
    selectPerson(person) {
      this.set("invitationLoaded", true);
      this.set("peopleMatches", 1);
      RSVP.hash({
        person,
        invitation: person.get("invitation")
      }).then(model => {
        this.set("person", model.person);
        this.set("invitation", model.invitation);
      })
    },
    hasBeenSubmitted(guests) {
      this.set("hasSubmittedRsvp", true);
      this.set("confirmedGuests", guests);
    }
  }
});
