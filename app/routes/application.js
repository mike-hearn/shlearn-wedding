import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);
  },
  title: function(tokens) {
    let title = "Ashley Mas & Michael Hearn's Wedding Website";
    if (tokens.length > 0) {
      title = `${tokens.join(" - ")} - ${title}`;
    }
    return title;
  }
});
