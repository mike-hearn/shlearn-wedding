import DS from "ember-data";

export default DS.Model.extend({
  fullName: DS.attr("string"),     // note: this is initially blank for guests; provided during RSVP
  nickname: DS.attr("string"),     // usually first name, e.g. for Hopper we'd use "Jon"
  internalName: DS.attr("string"), // either their name, or description of who they are ("Annie's +1")
  isGuest: DS.attr("boolean"),          // indicates whether they can initiate RSVP
  attendance: DS.attr("string"),   // fri, frisat, none
  foodChoice: DS.attr("string"),   // beef, chicken, pasta
  invitation: DS.belongsTo("invitation")
});
