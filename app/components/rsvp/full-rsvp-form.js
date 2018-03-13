import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  unknownGuests: computed.filterBy('invitation.guests', 'isGuest', true),
  firstUnknownGuest: computed('unknownGuests', function() {
    return this.get('unknownGuests.firstObject')
  })
});
