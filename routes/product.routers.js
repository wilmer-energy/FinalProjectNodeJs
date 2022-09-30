const express = require("express");
const {
  createCategory,
  categoriesProductAll,
  updateCategory,
  createPoduct,
  productsAll,
  productFind,
  productUpdate,
  productDelete,
} = require("../controllers/products.controller");
const { protectSession } = require("../middlewares/auth.middlewares");

const productRouter = express.Router();
productRouter.use(protectSession);
productRouter.post("/", createPoduct);
productRouter.get("/", productsAll);
productRouter.get("/:id", productFind);
productRouter.patch("/:id", productUpdate);
productRouter.delete('/:id', productDelete);

productRouter.get("/categories", categoriesProductAll);
productRouter.post("/categories", createCategory);
productRouter.patch("/categories/:id", updateCategory);

//usersRouter.post('/login', login);

//usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser);



module.exports = { productRouter };
