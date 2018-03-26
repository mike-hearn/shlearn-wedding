import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.apiURL,
  buildURL(...args) {
    let url = this._super(...args);
    return `${url}/`;
  },
});
