const express = require('express');

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


productRouter.post('/',protectSession, createPoduct)
productRouter.get('/', productsAll)
productRouter.get('/:id', productFind)
productRouter.patch('/:id', productUpdate)
productRouter.delete('/:id', productDelete)
productRouter.get('/categories', categoriesProductAll)
productRouter.post('/categories', createCategory)
productRouter.patch('/categories/:id', updateCategory)


module.exports = { productRouter  };

