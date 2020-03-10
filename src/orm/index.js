const Sequelize = require('sequelize')

const createEventModel = require('./models/event.schema');
const createMessageModel = require('./models/message.schema');
const createRoleModel = require('./models/role.schema');
const createTripHasUser = require('./models/trip_has_user.schema');
const createTrip = require('./models/trip.schema');
const createUserModel = require('./models/user.schema');

const sequelize = new Sequelize('trip_up', 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
})

const Event = createEventModel(sequelize);
const Message = createMessageModel(sequelize);
const Role = createRoleModel(sequelize);
const TripHasUser = createTripHasUser(sequelize);
const Trip = createTrip(sequelize);
const User = createUserModel(sequelize);

User.belongsTo(Role, { foreignKey: 'role_id' });
Event.belongsTo(Trip, { foreignKey: 'trip_id' });
Message.belongsTo(Trip, { foreignKey: 'trip_id' });
Message.belongsTo(User, { foreignKey: 'sender_user_id' });
Message.belongsTo(User, { foreignKey: 'recipient_user_id' });
TripHasUser.belongsTo(User, { foreignKey: 'user_id' })
TripHasUser.belongsTo(Trip, { foreignKey: 'trip_id' })
Trip.belongsTo(User, { foreignKey: 'organizer_user_id' });
// Role.belongsToMany(User);

module.exports = { sequelize, Event, Message, Role, TripHasUser, Trip, User };