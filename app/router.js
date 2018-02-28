import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: service(),

  setTitle(title) {
    this.get('headData').set('title', title);
  }
});

Router.map(function() {
  this.route('wedding-weekend');
  this.route('where-to-stay');
  this.route('where-to-play');
  this.route('people');
  this.route('photos');
  this.route('rsvp');
  this.route('registry');
});

export default Router;
