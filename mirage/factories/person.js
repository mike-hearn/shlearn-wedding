import {Factory, faker, association} from 'ember-cli-mirage';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default Factory.extend({
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  displayName() {
    return this.fullName || 'Guest';
  },
  id() {
    return uuidv4();
  },
  invitation: association(),
  isUnknownGuest: false,
});
