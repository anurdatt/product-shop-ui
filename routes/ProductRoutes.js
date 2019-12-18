var productRoutes = require('express').Router(),
    request = require('request');

var serviceUrl = process.env.PRODUCT_API_BE_SERVICE_URL || process.env.OPENSHIFT_PRODUCT_API_BE_SERVICE_URL || "product-api-sb/api/v1/product";

productRoutes.get('/ProductCatalog', function(req, res) {
    
    let url = serviceUrl + '/ProductCatalog';

    console.log('url = ' + url);
    let queryOption = {
        url: url,
        //headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }

    request(queryOption, function(error, response, result) {
        if (error) {
            res.status(500).send(error);
        }
        res.status(response.statusCode).send(result);
    });

});
module.exports = productRoutes;
