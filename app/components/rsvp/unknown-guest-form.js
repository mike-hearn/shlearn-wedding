import Component from '@ember/component';

export default Component.extend({
  actions: {
    updateGuest(guest, isBringingGuest) {
      guest.set('isUnknownGuest', false);

      // If they're not bringing the guest, remove the guest from the
      // invitation
      if (!isBringingGuest) {
        guest.set('invitation', null);
      }
    }
  }
});
