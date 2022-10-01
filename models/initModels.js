// Models
const { Cart } = require("./carts.model");
const { Categories } = require("./categories.model");
const { Order } = require("./orders.model");
const { ProductImg } = require("./productImgs.model");
const { Product } = require("./products.model");
const { ProductInCar } = require("./productsInCar.model");
const { User } = require("./user.model");

const initModels = () => {
  // 1 User <----> M Products
  User.hasMany(Product, { foreignKey: "userId" });
  Product.belongsTo(User);

  // 1 Category <----> M Products
  Categories.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Categories);

  // 1 Products <----> M ProductsImg
  Product.hasMany(ProductImg, { foreignKey: "productId" });
  ProductImg.belongsTo(Product);

  // 1 carts <----> M ProductsInCarts
  Cart.hasMany(ProductInCar, { foreignKey: "cartId" });
  ProductInCar.belongsTo(Cart);

  // 1 products <----> 1 ProductsInCarts
  Product.hasOne(ProductInCar, { foreignKey: "productId" });
  ProductInCar.belongsTo(Product);

  // 1 user <----> 1 Carts
  User.hasOne(Cart, { foreignKey: "userId" });
  Cart.belongsTo(User);

  // 1 order <----> 1 Cart
  Order.hasOne(Cart, { foreignKey: "userId" });
  Cart.belongsTo(Order);
};

module.exports = { initModels };
