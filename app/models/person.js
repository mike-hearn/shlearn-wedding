import DS from 'ember-data';

export default DS.Model.extend({
  fullName: DS.attr('string'),
  slug: DS.attr('string'),
});
