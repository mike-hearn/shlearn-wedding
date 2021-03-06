import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
  unknownGuests: computed.filterBy('invitation.guests', 'isUnknownGuest', true),
  firstUnknownGuest: computed('unknownGuests', function() {
    return this.get('unknownGuests.firstObject');
  }),
  guestsWithKnownPersonFirst: computed.sort('invitation.guests', function(
    a,
    b,
  ) {
    if (a.get('fullName') === this.get('personInitiatedRSVP.fullName')) {
      return -1;
    } else if (b.get('fullName') === this.get('personInitiatedRSVP.fullName')) {
      return 1;
    }
    return 0;
  }),
  allValidGuests: computed.filterBy(
    'guestsWithKnownPersonFirst',
    'isUnknownGuest',
    false,
  ),
  actions: {
    submitForm(guests, knownGuests, invitation) {
      invitation.save().then(() => {
        guests.forEach(g => {
          if (!g.get('attendance')) {
            g.set('attendance', 'Unable to attend');
          }
          g.save()
        });
      });
      this.get('hasBeenSubmitted')(knownGuests);
    },
  },
});
