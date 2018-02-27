import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  buildURL(...args) {
    let url = this._super(...args);
    return `${url}/`;
  },
});
