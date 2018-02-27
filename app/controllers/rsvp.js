import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Controller.extend({
  singleMatch: computed.equal('peopleMatches', 1),
  person: true
});
