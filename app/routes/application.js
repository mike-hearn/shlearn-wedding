import Ember from "ember";

export default Ember.Route.extend({
  init() {
    return this._super();
  },
  title: function(tokens) {
    let title = "Ashley Mas & Michael Hearn's Wedding Website";
    if (tokens.length > 0) {
      title = `${tokens.join(" - ")} - ${title}`;
    }
    return title;
  }
});
