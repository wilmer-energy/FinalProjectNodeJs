const { db, DataTypes } = require('../utils/database.util');


const Categories = db.define("Categories", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Categories",
  },
});

module.exports = { Categories };