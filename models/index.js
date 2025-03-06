const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";

const config = require("../config/config.js")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./userModel.js")(sequelize, DataTypes);
db.Category = require("./categoryModel.js")(sequelize, DataTypes);
db.Like = require("./likeModel.js")(sequelize, DataTypes);
db.Post = require("./postModel.js")(sequelize, DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = db;
