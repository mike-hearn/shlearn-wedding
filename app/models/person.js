import DS from "ember-data";
import { computed } from '@ember/object';

export default DS.Model.extend({
  firstName: DS.attr("string"),
  lastName: DS.attr("string"),
  fullName: computed("firstName", "lastName", function() {
    if (this.get("firstName") && this.get("lastName")) {
      return `${this.get("firstName")} ${this.get("lastName")}`;
    }
    return "Guest";
  }),
  displayName: computed("fullName", function() {
    return this.get("fullName") || "Guest";
  }),
  internalName: DS.attr("string"), // either their name, or description of who they are ("Annie's +1")
  isUnknownGuest: DS.attr("boolean"),     // indicates whether they can initiate RSVP
  attendance: DS.attr("string"),   // fri, frisat, none
  foodChoice: DS.attr("string"),   // beef, chicken, pasta
  invitation: DS.belongsTo("invitation")
});
