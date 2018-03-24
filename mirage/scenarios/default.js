export default function(server) {
  /* We can change the scenario that Mirage generates by applying different
   * values to window.localStorage.testScenario. In automation tests outside of
   * the Ember/Mirage context, this lets us mock various scenarios without
   * having direct access to the server.create method.
   *
   * If you (i.e. me) get stuck on a scenario for any reason, clear the
   * localStorage key from the JS console with:
   * window.localStorage.removeItem('testScenario')
   */
  switch (window.localStorage.testScenario) {
    case 'withTwoGuestsOneUnknown':
      server.create('invitation', 'withTwoGuestsOneUnknown');
      break;
    case 'withOneGuest':
      server.create('invitation', 'withOneGuest');
      break;
    case 'withTwoGuests':
      server.create('invitation', 'withTwoGuests');
      break;
    // Returns two (or three?) names, then after choosing a name it asks for +1
    // name
    case 'fuzzyMatchWithUnknownGuest':
      server.create('invitation', 'withTwoGuestsOneUnknown');
      server.create('person', {firstName: 'Dontchoose'})
      break;
    default:
      server.create('invitation', 'withTwoGuestsOneUnknown');
  }
}
