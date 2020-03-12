
require('dotenv').config()
const DB = require('./index');

async function rebuildDB() {
  await DB.sequelize.query('DROP DATABASE trip_up;');
  await DB.sequelize.query('CREATE DATABASE trip_up;');
  await DB.sequelize.query('USE trip_up;');
  await DB.sequelize.sync();
}

async function createRoles() {

  const roles = [
    { name: 'admin', create: true, read: true, update: true, delete: true },
    { name: 'user', create: true, read: false, update: true, delete: false }
  ]

  await DB.Role.bulkCreate(roles);
}

async function createUsers() {
  const [admin, user] = await DB.Role.findAll();

  const users = [
    { name: 'Jordan', email: 'jordan@pete.com', password: 'password1', city: 'Jordan', phone: '39837443535', picture: 'http://picture.com', role_id: admin.id },
    { name: 'Tyler', email: 'anopolis59393@pete.com', password: 'pass1234', city: 'Istambul', phone: '2055503939', picture: 'http://picture.com', role_id: admin.id },
    { name: 'Eve', email: 'funkyfoobar@pete.com', password: 'thisisapassword', city: 'Texas', phone: '2055503939', picture: 'http://picture.com', role_id: user.id },
    { name: 'John', email: 'john@pete.com', password: 'idontcheatever', city: 'Africa', phone: '1788298888', picture: 'http://racypix.com', role_id: user.id },
    { name: 'Jerry', email: 'jerry@pete.com', password: 'peterespass', city: 'Seattle', phone: '2055503939', picture: 'http://picture.com', role_id: user.id },
    { name: 'Falicia', email: 'falicia@pete.com', password: 'rosydog11', city: 'Seattle', phone: '2055503939', picture: 'http://picture.com', role_id: user.id },
    { name: 'Horrance', email: 'horrance@pete.com', password: 'infosecismymiddlename', city: 'Seattle', phone: '2055503939', picture: 'http://picture.com', role_id: user.id },
    { name: 'Vance', email: 'vance@pete.com', password: 'sosecure', city: 'Seattle', phone: '2055503939', picture: 'http://fortunemag.com', role_id: user.id },
    { name: 'George', email: 'george@pete.com', password: 'totallysecure', city: 'Seattle', phone: '2055503939', picture: 'http://picture.com', role_id: user.id },
    { name: 'Stacy', email: 'stacy@pete.com', password: 'aslkjASDJFASDLFJ', city: 'Corpus', phone: '2055503939', picture: 'http://gianteggplant.com', role_id: user.id },
    { name: 'Arnold', email: 'arnold@pete.com', password: 'alskdfjaskljf', city: 'SF', phone: '2055503939', picture: 'http://picture.com', role_id: user.id },
    { name: 'Pete', email: 'peter@pete.com', password: '2309232okjsdf', city: 'Austin', phone: '2055503939', picture: 'http://spraybottle.com', role_id: user.id },
  ]

  await DB.User.bulkCreate(users);
}

async function createEvents() {

  const [portugal, olympics, space] = await DB.Trip.findAll();


  const events = [
    // Portugal
    { start_day: '1991-1-10', end_day: '1991-1-15', name: 'Packing 101', trip_id: portugal.id },
    { start_day: '1991-1-16', end_day: '1991-1-20', name: 'Ship to portugal', trip_id: portugal.id },
    { start_day: '1991-1-21', end_day: '1991-1-30', name: 'Hanging with steve', trip_id: portugal.id },
    { start_day: '1991-1-31', end_day: '1991-04-03', name: 'Free time', trip_id: portugal.id },
    { start_day: '1991-04-04', end_day: '1991-04-12', name: 'Walk Home', trip_id: portugal.id },

    // Olympics
    { start_day: '1980-11-20', end_day: '1980-11-31', name: 'Packing 101', trip_id: olympics.id },
    { start_day: '1980-12-20', end_day: '1980-12-31', name: 'How to get lost in the rainforest', trip_id: olympics.id },
    { start_day: '1981-01-02', end_day: '1981-01-10', name: 'how to get out of the rainforest', trip_id: olympics.id },
    { start_day: '1981-03-06', end_day: '1981-04-10', name: 'youre still here? ', trip_id: olympics.id },
    { start_day: '1981-05-02', end_day: '1981-07-08', name: 'Were all really cold and wet. And still here.', trip_id: olympics.id },

    // Space
    { start_day: '1969-2-29', end_day: '1969-03-02', name: 'Getting ready for takeoff!', trip_id: space.id },
    { start_day: '1969-03-03', end_day: '1969-03-05', name: 'Journey into space', trip_id: space.id },
    { start_day: '1969-03-06', end_day: '1969-03-20', name: 'Bathroom break', trip_id: space.id },
    { start_day: '1969-03-21', end_day: '1969-03-30', name: 'Tom hanks nearly kill everyone', trip_id: space.id },
    { start_day: '1969-3-31', end_day: '1991-3-31', name: 'Tom Hanks saves the day', trip_id: space.id },
    { start_day: '1969-4-08', end_day: '1969-4-12', name: 'Tom Hanks still everyones hero', trip_id: space.id },
  ]

  await DB.Event.bulkCreate(events);
}

async function addEventsToTrips() {
  const trips = await DB.Trip.findAll();
  const events = await DB.Event.findAll();


  const tripsWithEvents = trips.map(trip => {
    return events.filter(event => event.trip_id === trip.id)
  })

  const eventsToInsert = []

  tripsWithEvents.forEach((trip, idx) => {
    tripsWithEvents[idx].forEach(event => {
      eventsToInsert.push({ trip_id: event.trip_id, event_id: event.id })
    })
  })
  console.log(eventsToInsert)
  await DB.TripHasEvent.bulkCreate(eventsToInsert)
}

async function addUsersToTrips() {
  const users = await DB.User.findAll();
  const trips = await DB.Trip.findAll();

  const tripUsers = [
    [1, 4, 5, 6, 9, 11],
    [2, 3, 4, 6, 7],
    [2, 3, 5, 8, 10]
  ]

  const tripUsersInsert = [];

  trips.forEach((trip, idx) => {
    tripUsers[idx].forEach((user_id) => {
      tripUsersInsert.push({ trip_id: trip.id, user_id, approval: false })
    })
  })

  await DB.TripSignup.bulkCreate(tripUsersInsert);

}

async function createTrips() {
  const trips = [
    { destination: 'portugal', name: 'potugeseesss!', start_day: '1990-12-29', end_day: '1991-04-12', cost: 2.99, type: 'vacation', organizer_user_id: 1 },
    { destination: 'olympics', name: 'pot!', start_day: '1980-11-29', end_day: '1981-08-12', cost: 1999.99, type: 'vacation', organizer_user_id: 2 },
    { destination: 'space', name: 'the final frontier? !', start_day: '1969-02-29', end_day: '1969-04-12', cost: 9999999.99, type: 'vacation', organizer_user_id: 8 },
  ]
  await DB.Trip.bulkCreate(trips);
}

async function createMessages() {
  const [portugal, olympics, space] = await DB.Trip.findAll();

  const messages = [
    { content: 'hey its your best friend', trip_id: portugal.id, sender_user_id: 8, recipient_user_id: 1 },
    { content: 'hey its your best friend too', trip_id: olympics.id, sender_user_id: 6, recipient_user_id: 1 },
    { content: 'hey its your best friends mom', trip_id: portugal.id, sender_user_id: 9, recipient_user_id: 4 },
    { content: 'hey its your best friend giiiirrrrllfriend', trip_id: portugal.id, sender_user_id: 2, recipient_user_id: 4 },
    { content: 'but she used to be mine!', trip_id: space.id, sender_user_id: 9, recipient_user_id: 10 },
    { content: '.....my best bfriends girl... friend!', trip_id: olympics.id, sender_user_id: 1, recipient_user_id: 3 },
    { content: 'every cool girl that you meet.', trip_id: portugal.id, sender_user_id: 1, recipient_user_id: 8 },
    { content: 'youre in for a big surprise.', trip_id: space.id, sender_user_id: 11, recipient_user_id: 4 },
    { content: 'I kinda like the way she steps.', trip_id: space.id, sender_user_id: 2, recipient_user_id: 1 }
  ]

  await DB.Message.bulkCreate(messages);
}

(async () => {
  try {
    await rebuildDB();
    await createRoles();
    await createUsers();
    await createTrips();
    await addUsersToTrips();
    await createEvents();
    await addEventsToTrips();
    await createMessages();
  } catch (err) {
    console.log(err);
  }
})();