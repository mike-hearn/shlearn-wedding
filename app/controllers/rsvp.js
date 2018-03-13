import Controller from "@ember/controller";
import { computed } from "@ember/object";

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
          include: "invitation, invitation.guests"
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
      this.set("person", person);
      this.set("invitation", person.get("invitation"));
    }
  }
});
