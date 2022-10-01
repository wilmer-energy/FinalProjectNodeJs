// Models
const { Cart } = require("./carts.model");
const { Categories } = require("./category.models");
const { Order } = require("./orders.model");
const { ProductImg } = require("./productImgs.model");
const { Products } = require("./product.models");
const { ProductInCar } = require("./productsInCar.model");
const { User } = require("./user.model");

const initModels = () => {
  // 1 User <----> M Products
  User.hasMany(Products, { foreignKey: "userId" });
  Products.belongsTo(User);

  // 1 Category <----> M Products
  Categories.hasMany(Products, { foreignKey: "categoryId" });
  Products.belongsTo(Categories);

  // 1 Products <----> M ProductsImg
  Products.hasMany(ProductImg, { foreignKey: "productId" });
  ProductImg.belongsTo(Products);

  // 1 carts <----> M ProductsInCarts
  Cart.hasMany(ProductInCar, { foreignKey: "cartId" });
  ProductInCar.belongsTo(Cart);

  // 1 carts <----> M ProductsInCarts
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  // 1 products <----> 1 ProductsInCarts
  Products.hasOne(ProductInCar, { foreignKey: "productId" });
  ProductInCar.belongsTo(Products);

  // 1 user <----> 1 Carts
  User.hasOne(Cart, { foreignKey: "userId" });
  Cart.belongsTo(User);

  // 1 order <----> 1 Cart
  Order.hasOne(Cart, { foreignKey: "userId" });
  Cart.belongsTo(Order);
};

module.exports = { initModels };
