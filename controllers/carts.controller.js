// 01. importamos modelo User
const { Cart } = require("../models/carts.model");
const { catchAsync } = require("../utils/catchAsync.util");


const createCart = catchAsync(async (req, res, next) => {

});

const updateCart = catchAsync(async (req, res, next) => {
 
});

const deleteProductCart = catchAsync(async (req, res, next) => {

});

const purchaseCart = catchAsync(async (req, res, next) => {
 
  });

// 03. exportamos las funciones creadas
module.exports = {
 createCart,
 updateCart,
 deleteProductCart,
 purchaseCart
};