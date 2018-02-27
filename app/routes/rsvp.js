import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: "RSVP",
  actions: {
    searchPeople(name) {
      this.store
        .query("person", {
          filter: {
            fullName: name
          }
        })
        .then(people => {
          this.controller.set("people", people);
          this.controller.set("peopleMatches", people.get("length"));

          if (people.get("length") === 1) {
            this.send("selectPerson", people.get('firstObject'));
          }
        });
    },
    selectPerson(person) {
      this.controller.set("peopleMatches", 1);
      this.controller.set("person", person);
    }
  }
});
