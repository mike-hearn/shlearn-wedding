import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: Ember.inject.service(),

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
