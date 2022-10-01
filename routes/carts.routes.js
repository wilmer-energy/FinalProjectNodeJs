// 01. importamos express y las funciones de users.controllers.js
const express =  require('express')


const { 
    createCart,
 updateCart,
 deleteProductCart,
 purchaseCart
} =
 require('../controllers/carts.controller')

// 02. usamos  express.Router() para usar los verbos de endpoints
const cartsRoutes = express.Router()

// 03. creamos los enpoints acompañados de la funcion

cartsRoutes.post('/add-product', createCart)
cartsRoutes.patch('/update-cart',updateCart)
cartsRoutes.delete('/:productId', deleteProductCart)
cartsRoutes.post('/purchase', purchaseCart)

// 04.  exportamos userroutes
module.exports = {cartsRoutes}