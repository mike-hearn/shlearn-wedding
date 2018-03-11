import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  singleMatch: computed.equal('peopleMatches', 1),
  person: true,
  actions: {
    searchPeople(name) {
      this.store
        .query("person", {
          filter: {
            fullName: name
          },
          include: 'invitation'
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
      this.set("peopleMatches", 1);
      this.set("person", person);

      person.get("invitation").then(invitation => {
        this.set("invitation", invitation);
      });
    },
  }
});
