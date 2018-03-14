import { Factory, faker, association } from "ember-cli-mirage";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default Factory.extend({
  fullName() {
    return faker.fake("{{name.firstName}} {{name.lastName}}");
  },
  id() {
    return uuidv4();
  },
  nickname() {
    return this.fullName.split(' ')[0];
  },
  invitation: association(),
  isUnknownGuest: false
});
