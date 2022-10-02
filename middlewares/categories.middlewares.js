// 01. importamos el modelo
const { Categories } = require("../models/categories.model");

// 02. funcion que busque el ID y verifica si hay o no hay
const categoriesExists = async (req, res, next) => {
try {    
    const { id } = req.params;
    const categoriesId = await Categories.findOne({ where: { id } });
    
    if (!categoriesId) {
        return res.status(404).json({
            status: 'error',
            message: 'category not found',
        });
    }
// 03. el resultado de la busqueda  userId la pasamos por req
    req.categoriesId = categoriesId;
    next();

} catch (error) {
    console.log(error);
}
}

// 04. exportamos la funcion
module.exports = {categoriesExists}