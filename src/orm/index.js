const Sequelize = require('sequelize')

const createEventModel = require('./models/event.schema');
const createMessageModel = require('./models/message.schema');
const createRoleModel = require('./models/role.schema');
const createTripSignup = require('./models/trip_signup.schema');
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
const TripSignup = createTripSignup(sequelize);
const Trip = createTrip(sequelize);
const User = createUserModel(sequelize);


Event.belongsTo(Trip, { foreignKey: 'trip_id' });
Message.belongsTo(Trip, { foreignKey: 'trip_id' });
Message.belongsTo(User, { foreignKey: 'sender_user_id' });
Message.belongsTo(User, { foreignKey: 'recipient_user_id' });

Trip.belongsToMany(User, { through: TripSignup, as: 'members', foreignKey: 'trip_id', otherKey: 'user_id' })

Trip.belongsTo(User, { foreignKey: 'organizer_user_id', as: 'organizer' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });







module.exports = { sequelize, Event, Message, Role, TripSignup, Trip, User };