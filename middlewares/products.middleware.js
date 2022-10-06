// Models
const { Product } = require('../models/products.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const productExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const product = await Product.findOne({
		where: { id }
	});

	// If product doesn't exist, send error message
	if (!Product) {
		return next(new AppError('Product not found', 404));
	}

	// req.anyPropName = 'anyValue'
	req.product = product;
	next();
});

module.exports={productExists}