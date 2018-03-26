import Component from '@ember/component';

export default Component.extend({
  actions: {
    updateGuest(guest, isBringingGuest) {
      if (guest.get('nameInput')) {
        let firstName = guest
          .get('nameInput')
          .replace(/ +/, ' ')
          .split(' ')[0];
        let lastName = guest
          .get('nameInput')
          .replace(/ +/, ' ')
          .split(' ')
          .slice(1)
          .join(' ');
        guest.set('firstName', firstName);
        guest.set('lastName', lastName);
      }
      guest.set('isUnknownGuest', false);

      // If they're not bringing the guest, remove the guest from the
      // invitation
      if (!isBringingGuest) {
        guest.set('invitation', null);
      }
    },
  },
});
