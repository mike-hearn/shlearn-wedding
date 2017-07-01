import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  shortText: DS.attr('string'),
  slug: DS.attr('string'),
});
