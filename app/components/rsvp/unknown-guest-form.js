import Component from '@ember/component';

export default Component.extend({
  actions: {
    updateGuest(guest) {
      guest.set('isGuest', false);
    }
  }
});
