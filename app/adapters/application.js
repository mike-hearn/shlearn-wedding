import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:8000',
  buildURL(...args) {
    let url = this._super(...args);
    return `${url}/`;
  },
});
