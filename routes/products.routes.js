const express = require('express');
const {upload} =require('../utils/multer.util')

// Controllers
const {
    createPoduct,
    productsAll,
    productFind,
    createCategory,
    categoriesProductAll,
    updateCategory,
    productUpdate,
    productDelete,
} = require('../controllers/products.controller');

// Middlewares
// const { userExists } = require('../middlewares/users.middlewares');
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middlewares');
const {
	createUserValidators,
} = require('../middlewares/validators.middlewares');

const productRouter = express.Router();

productRouter.use(upload.array('productImgs',4))



module.exports = { usersRouter };

