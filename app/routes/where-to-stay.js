import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.find('page', 'where-to-stay');
  },
});
