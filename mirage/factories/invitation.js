import { Factory, trait } from "ember-cli-mirage";

export default Factory.extend({
  musicSuggestions() {
    return "";
  },
  withOneGuest: trait({
    afterCreate(invitation, server) {
      let guest = server.create("person", { invitation });
      invitation.guests = [ guest ];
    }
  }),
  withTwoGuests: trait({
    afterCreate(invitation, server) {
      let guests = server.createList("person", 2, { invitation });
      invitation.guests = guests;
    }
  }),
  withTwoGuestsOneUnknown: trait({
    afterCreate(invitation, server) {
      let knownGuest = server.create("person", { invitation, isUnknownGuest: false });
      let unknownGuest = server.create("person", {
        invitation,
        isUnknownGuest: true,
        firstName: "",
        lastName: "",
      });
      invitation.guests = [knownGuest, unknownGuest];
    }
  }),
});
