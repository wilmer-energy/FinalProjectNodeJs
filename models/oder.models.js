const { db, DataTypes } = require("../utils/database.utils");
const { Meals } = require("./meals.models");

const Orders = db.define("Orders", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
});

Orders.belongsTo(Meals, { foreignKey: "mealId" });

module.exports = { Orders };