
require('dotenv').config()
const { PORT } = process.env

const { sequelize, Trip, User } = require('./src/orm/index');

sequelize.authenticate()
  .then(() => {
    console.log('connection up!');

    return sequelize.sync();
  })
  .then(() => {
    // Start Express Server
    const server = require('./src/app')
    server.start(PORT);
  })
  .catch(err => {
    console.error(err);
  })


// const test = async () => {


//   return await Trip.findByPk(1, {
//     include: {
//       association: 'members',
//       through: {
//         attributes: []
//       },
//       attributes: {
//         exclude: ['password']
//       },
//       include: {
//         association: 'role',
//         where: { name: 'admin' },
//         attributes: []
//       }
//     }
//   })
// }

// test()
//   .then(result => {
//     console.log('result', JSON.parse(JSON.stringify(result.dataValues)))
//   })