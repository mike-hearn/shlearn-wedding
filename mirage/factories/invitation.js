import { Factory, trait } from "ember-cli-mirage";

export default Factory.extend({
  musicSuggestions() {
    return "";
  },
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
        fullName: "",
        nickname: ""
      });
      invitation.guests = [knownGuest, unknownGuest];
    }
  }),
});
