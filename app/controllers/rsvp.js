import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  singleMatch: computed.equal('peopleMatches', 1),
  person: true,
});
