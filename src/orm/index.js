/**
 * @module orm/index
 * @description ORM of trip up database, DB connection made here
 */
const Sequelize = require('sequelize')

const createEventModel = require('./models/event.schema');
const createMessageModel = require('./models/message.schema');
const createRoleModel = require('./models/role.schema');
const createTripSignup = require('./models/trip_signup.schema');
const createTrip = require('./models/trip.schema');
const createUserModel = require('./models/user.schema');
const createTripHasEvent = require('./models/trip-has-event')
const createTripHasUser = require('./models/trip_has_user.schema')

/**
 * Instantiate our sequelize object
 */
const findHost = process.env.DB_HOST || 'localhost';
const findDatabase = process.env.DB_DATABASE || 'trip_up';
const findUsername = process.env.DB_USERNAME || 'root';
const findPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(findDatabase, findUsername, findPassword, {
  host: findHost,
  dialect: 'mysql',
  logging: false,
})

const Event = createEventModel(sequelize);
const Message = createMessageModel(sequelize);
const Role = createRoleModel(sequelize);
const TripSignup = createTripSignup(sequelize);
const Trip = createTrip(sequelize);
const User = createUserModel(sequelize);
const TripHasEvent = createTripHasEvent(sequelize);
// const TripHasUser = createTripHasUser(sequelize);


Trip.belongsToMany(Event, { through: TripHasEvent, as: 'events', foreignKey: 'trip_id', otherKey: 'event_id' });
Message.belongsTo(Trip, { foreignKey: 'trip_id' });
Message.belongsTo(User, { foreignKey: 'sender_user_id' });
Message.belongsTo(User, { foreignKey: 'recipient_user_id' });


Trip.belongsTo(User, { foreignKey: 'organizer_user_id', as: 'organizer' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Trip.belongsToMany(User, { through: TripSignup, as: 'members', foreignKey: 'trip_id', otherKey: 'user_id' })

module.exports = { sequelize, Event, Message, Role, TripSignup, Trip, User, TripHasEvent };

