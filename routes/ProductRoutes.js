var productRoutes = require('express').Router(),
    request = require('request');

var serviceUrl = process.env.PRODUCT_API_BE_SERVICE_URL || process.env.OPENSHIFT_PRODUCT_API_BE_SERVICE_URL 
                        || "http://product-api-sb-cloudstar.inmbzp8022.in.dst.ibm.com/api/v1/product";

var endpoint = process.env.COS_ENDPOINT_URL || process.env.OPENSHIFT_COS_ENDPOINT_URL 
                    || "http://s3.us-south.cloud-object-storage.appdomain.cloud";

var bucketPC = process.env.COS_BUCKET_PRODUCT_CATALOG || process.env.OPENSHIFT_COS_BUCKET_PRODUCT_CATALOG 
                    || "cc-product-catalog";

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
        
        //console.log(result);
        var resultJSON = JSON.parse(result);
        resultJSON.forEach(function(elem) {
            elem['imageUrl'] = endpoint + '/' + bucketPC + '/' + elem.commodityId + '.jpg';
        });

        res.status(response.statusCode).send(resultJSON);
        
    });

});


module.exports = productRoutes;
