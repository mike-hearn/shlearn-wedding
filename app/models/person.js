import DS from "ember-data";

export default DS.Model.extend({
  fullName: DS.attr("string"),     // initially blank for guests; provided during RSVP
  internalName: DS.attr("string"), // either their name, or description of who they are ("Annie's +1")
  guest: DS.attr("bool"),          // indicates whether they can initiate RSVP
  isAttendingFriday: DS.attr("bool"),
  isAttendingSaturday: DS.attr("bool"),
  foodChoice: DS.attr("string"),   // beef, chicken, pasta
  invitation: DS.belongsTo("invitation")
});
