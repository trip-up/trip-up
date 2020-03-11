/**
 * @module orm/index
 * @description ORM of trip up database, DB connection made here
 */
const Sequelize = require('sequelize')

const createEventModel = require('./models/event.schema');
const createMessageModel = require('./models/message.schema');
const createRoleModel = require('./models/role.schema');
const createTripHasUser = require('./models/trip_has_user.schema');
const createTrip = require('./models/trip.schema');
const createUserModel = require('./models/user.schema');


/**
 * Instantiate our sequelize object
 */
const sequelize = new Sequelize('trip_up', 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})

const Event = createEventModel(sequelize);
const Message = createMessageModel(sequelize);
const Role = createRoleModel(sequelize);
const TripHasUser = createTripHasUser(sequelize);
const Trip = createTrip(sequelize);
const User = createUserModel(sequelize);


Event.belongsTo(Trip, { foreignKey: 'trip_id' });
Message.belongsTo(Trip, { foreignKey: 'trip_id' });
Message.belongsTo(User, { foreignKey: 'sender_user_id' });
Message.belongsTo(User, { foreignKey: 'recipient_user_id' });
// TripHasUser.belongsTo(User, { foreignKey: 'user_id' })
// TripHasUser.belongsTo(Trip, { foreignKey: 'trip_id' })
Trip.belongsToMany(User, { through: TripHasUser, as: 'members', foreignKey: 'trip_id', otherKey: 'user_id' })
Trip.belongsTo(User, { foreignKey: 'organizer_user_id', as: 'organizer' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

module.exports = { sequelize, Event, Message, Role, TripHasUser, Trip, User };