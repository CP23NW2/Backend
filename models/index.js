const { Sequelize } = require("sequelize");
const index = {};
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const sequelize = new Sequelize({
  database: "eyewear",
  username: "postgres",
  //host: '127.0.0.1',
  host: 'cp23nw2.sit.kmutt.ac.th',
  password: "postgres",
  // username: "postgres",
  // password: "1234",
  // host: "20.255.57.31",
  port: 5432,
  // dialect: "postgres"
  // database: process.env.DB_DATABASE || "eyewear",
  // username: process.env.DB_USER || "postgres",
  // password: process.env.DB_PASSWORD || "", // Use the environment variable or an empty string if not set
  // host: process.env.DB_HOST || "localhost", // Use the environment variable or default to 'localhost'
  // port: process.env.DB_PORT || 5432,
  dialect: "postgres"
});

sequelize.authenticate().catch((error) => {
  console.debug(error.message);
});

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    console.log(file);
    const modelFactory = require(path.join(__dirname, file));
    console.log('path', path.join(__dirname, file));
    console.log('Model', Sequelize.Model);
    console.log('typeof Model', typeof Sequelize.Model);
    const Model = modelFactory(Sequelize);
    console.log('modelFactory', modelFactory);
    console.log(modelFactory);
    console.log(Model);  
    Model.initialize(sequelize);
    index[Model.name] = Model;
  });
//หาตัว .js เพื่อเอาลงใน sequelize model
Object.keys(index).forEach((modelName) => {
  if (index[modelName].associate) {
    index[modelName].associate(index);
  }
});

index.sequelize = sequelize;
index.Sequelize = Sequelize;

module.exports = index;