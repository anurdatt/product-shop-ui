const productRoutes = require('./ProductRoutes');

function appRoutes(app) {
    app.use('/api/product', productRoutes);
}

module.exports = appRoutes;