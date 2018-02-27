export default function(server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  let numberOfPeople = [1];
  server.createList(
    "person",
    numberOfPeople[Math.floor(Math.random() * numberOfPeople.length)]
  );
}
