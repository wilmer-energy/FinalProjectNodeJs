const { body } = require("express-validator");
const { Categories } = require("../models/categories.model");
const { Product } = require("../models/products.model");
const { catchAsync } = require("../utils/catchAsync.util");

const createPoduct = catchAsync(async (req, res) => {
  const { title, description, price, categoryId, quantity } = req.body;
  const { sessionUser } = req;

console.log(req.sessionUser.id);
console.log(title);

  const newProduct = await Product.create({
    title,
    description,
    price,
    categoryId,
    quantity,
    userId: sessionUser.id,
  });
  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: "success",
    data: { newProduct },
  });
});

const productsAll = async (req, res) => {
  try {
    const product = await Products.findAll({
      where: { status: "active" },
    });

    return res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const productFind = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({
        status: "not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const productUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({
        status: "Not found",
      });
    }

    if (product.userId != req.sessionUser.id) {
      return res.status(401).json({
        status: "Not Authorized Update",
      });
    }

    product.update({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const productDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findOne({ where: { id } });

    if (product.userId != req.sessionUser.id) {
      return res.status(401).json({
        status: "Not Authorized Delete",
      });
    }
    product.update({ status: "delete" });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const createCategory = catchAsync(async (req, res) => {
  const { name } = req.body;

  const Catergory = await Categories.create({
    name,
    status: "active",
  });
  return res.status(200).json({
    status: "success",
    data: { Catergory },
  });
});

const categoriesProductAll = async (req, res) => {
  try {
    const categoriesProduct = await Categories.findAll();

    res.status(200).json({
      status: "success",
      data: {
        categoriesProduct,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findOne({ where: { id } });
    if (!category) {
      return res.status(404).json({
        status: "not Found",
      });
    }
    category.update({ name: req.body.name });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPoduct,
  productsAll,
  productFind,
  createCategory,
  categoriesProductAll,
  updateCategory,
  productUpdate,
  productDelete,
};