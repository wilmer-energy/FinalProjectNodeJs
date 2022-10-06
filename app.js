const express = require('express');
const path = require('path');
// Routers
const { usersRouter } = require('./routes/users.routes');
const { productRouter } = require('./routes/products.routes');
const { cartsRoutes } = require('./routes/carts.routes');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');
const { default: helmet } = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

//Secure app with Heroku
app.use(helmet())
app.use(compression())
if(process.env.NODE_ENV==='development') app.use(morgan('dev'));
else app.use(morgan('combined'))
// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartsRoutes);

// Global error handler
app.use(globalErrorHandler);


// Set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
