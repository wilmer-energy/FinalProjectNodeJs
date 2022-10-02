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
    productDelete
  
} = require('../controllers/products.controller');

// Middlewares
// const { userExists } = require('../middlewares/users.middlewares');
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middlewares');

const {categoriesExists} =  require('../middlewares/categories.middlewares')
const {
	createUserValidators,
} = require('../middlewares/validators.middlewares');



const productRouter = express.Router();


productRouter.get('/categories', categoriesProductAll)
productRouter.get('/', productsAll)
productRouter.get('/:id', productFind)
productRouter.patch('/:id',protectSession, productUpdate)
productRouter.delete('/:id', protectSession, productDelete)



productRouter.post('/categories', protectSession, protectUsersAccount, createCategory)
productRouter.patch('/categories/:id',categoriesExists, protectSession, updateCategory)

productRouter.use(upload.array('productImgs',5))



module.exports = { productRouter  };

