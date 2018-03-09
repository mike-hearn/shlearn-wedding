export default function(server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  let invitation = server.create('invitation');
  server.create('person', { invitation });
  server.create('person', { isGuest: true, invitation });
}
