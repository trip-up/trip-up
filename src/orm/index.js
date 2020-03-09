const Sequelize = require('sequelize')
const fs = require('fs');
const path = require('path')
const config = require('config')

const dbConfig = config.get('database')

/**
 * Instantiate our sequelize object
 */
const sequelize = new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
})

/**
 * Load and initialize the models
 * By requiring the model, we pull in a function. So we make a call to that function , passing in sequelize. 
 * 
 */


sequelize.models = {};
sequelize.model = sequelize.models;

const modelsPath = path.join(__dirname, 'models');
const files = fs.readdirSync(modelsPath);

/**
 * Pull in all model schemas within the ./models directory that end in `.schema.js`.
 * Envoke them and attach to sequelize.models object.
 * 
 */
for (const file of files.filter((file) => file.endsWith('.schema.js'))) {
  const fileName = path.join(modelsPath, file)
  const model = require(fileName)(sequelize);
  sequelize.models[model.name] = model;
}

/**
 * Once the models are all loaded, we can associate them
 */
Object.values(sequelize.models).forEach(model => {
  if (model.associate) { model.associate(); }
})

sequelize.authenticate()
  .then(() => console.log('connection up!'))
  .catch(err => console.error(err))

sequelize.sync();

module.exports = sequelize;