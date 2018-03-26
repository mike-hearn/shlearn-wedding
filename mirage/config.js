import config from '../config/environment';

export default function() {
  this.urlPrefix = config.apiURL; // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.timing = 1000; // delay for each request, automatically set to 0 during testing

  /* If the `passthrough` key is found in localStorage, ignore the entire
   * Mirage mock configuration and passthrough everything. The `return` assures
   * that we don't process the rest of the config.*/
  if (window.localStorage.passthrough) {
    this.passthrough('**');
    return;
  }

  /* Mirage mocked endpoints */
  this.get('/people/', function(schema) {
    return schema.people.where({isUnknownGuest: false});
  });
  this.get('/invitations/:id');
}
