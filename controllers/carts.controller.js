// 01. importamos modelo User
const { Cart } = require("../models/carts.model");
const { Products } = require("../models/product.models");
const { ProductInCar } = require("../models/productsInCar.model");
const { catchAsync } = require("../utils/catchAsync.util");

const addProductCart = catchAsync(async (req, res, next) => {
  const product = await getProduct(req.body.productId);

  if (!product) {
    return res.status(404).json({
      status: "Product not Found",
    });
  }

  if (product.quantity < req.body.quantity) {
    return res.status(400).json({
      status: "Product overflow stock",
    });
  }

  const cart = await getCart(req.sessionUser.id);
  const productInCart = await getProductCart(product, cart);

  if (productInCart.status == "active") {
    return res.status(400).json({
      status: "Product in cart",
    });
  }

  productInCart.update({
    quantity: req.body.quantity,
    status: "active",
  });

  res.status(200).json({
    status: "success",
    productInCart,
  });
});

const getCart = async (userId) => {
  let cart = await Cart.findOne({
    where: { status: "active", userId },
  });

  if (!cart) {
    cart = await Cart.create({
      userId,
      status: "active",
    });
  }

  return cart;
};

const getProduct = async (productId) => {
  return await Products.findOne({
    where: { status: "active", id: productId },
  });
};

const getProductCart = async (product, cart) => {
  let productInCart = await ProductInCar.findOne({
    where: { carId: cart.id, productId: product.id },
  });

  if (!productInCart) {
    productInCart = await ProductInCar.create({
      carId: cart.id,
      productId: product.id,
      quantity: "0",
      status: "create",
    });
  }
  return productInCart;
};

const updateCart = catchAsync(async (req, res, next) => {
  const product = await getProduct(req.body.productId);

  if (!product) {
    return res.status(404).json({
      status: "Product not Found",
    });
  }

  if (product.quantity < req.body.newQty) {
    return res.status(400).json({
      status: "Product overflow stock",
    });
  }

  const cart = await Cart.findOne({
    where: { status: "active", userId: req.sessionUser.id },
  });

  if (!cart) {
    return res.status(404).json({
      status: "Cart not Found",
    });
  }

  const productInCart = await ProductInCar.findOne({
    where: { carId: cart.id, productId: product.id, status: "active" },
  });

  if (!productInCart) {
    return res.status(404).json({
      status: "Product in cart not Found",
    });
  }

  if (req.body.newQty == 0) {
    productInCart.update({
      status: "removed",
    });
  } else {
    productInCart.update({
      quantity: req.body.newQty,
    });
  }

  res.status(200).json({
    status: "success",
    productInCart,
  });
});

const deleteProductCart = catchAsync(async (req, res, next) => {});

const purchaseCart = catchAsync(async (req, res, next) => {});

// 03. exportamos las funciones creadas
module.exports = {
  addProductCart,
  updateCart,
  deleteProductCart,
  purchaseCart,
};
