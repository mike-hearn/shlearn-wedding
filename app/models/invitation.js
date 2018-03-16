import DS from 'ember-data';

export default DS.Model.extend({
  musicSuggestions: DS.attr('string'),
  additionalNotes: DS.attr('string'),
  guests: DS.hasMany('person')
});
