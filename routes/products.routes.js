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
const {productExists}=require('../middlewares/products.middleware')

const {categoriesExists} =  require('../middlewares/categories.middlewares')
const {
	createCategoryValidator,
} = require('../middlewares/validators.middlewares');



const productRouter = express.Router();


productRouter.get('/categories', categoriesProductAll)
productRouter.get('/', productsAll)
productRouter.get('/:id',productExists, productFind)

productRouter.use(protectSession)
productRouter.post('/',upload.array('productImgs',5),createPoduct)
productRouter.patch('/:id',productExists, productUpdate)
productRouter.delete('/:id',productExists, productDelete)



productRouter.post('/categories',createCategoryValidator, createCategory)
productRouter.patch('/categories/:id',categoriesExists, updateCategory)





module.exports = { productRouter  };

