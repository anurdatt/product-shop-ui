var productRoutes = require('express').Router(),
    request = require('request'),
    myCos = require('ibm-cos-sdk'),
    async = require('async');

var serviceUrl = process.env.PRODUCT_API_BE_SERVICE_URL || process.env.OPENSHIFT_PRODUCT_API_BE_SERVICE_URL 
                        || "http://product-api-sb-cloudstar.inmbzp8022.in.dst.ibm.com/api/v1/product";

var endpoint = process.env.COS_ENDPOINT_URL || process.env.OPENSHIFT_COS_ENDPOINT_URL 
                    || "http://s3.us-south.cloud-object-storage.appdomain.cloud";

var bucketPC = process.env.COS_BUCKET_PRODUCT_CATALOG || process.env.OPENSHIFT_COS_BUCKET_PRODUCT_CATALOG 
                    || "cc-product-catalog";

var bucketP = process.env.COS_BUCKET_PRODUCT || process.env.OPENSHIFT_COS_BUCKET_PRODUCT 
                    || "cc-product";

var cosCreds = process.env.COS_CREDENTIALS || process.env.OPENSHIFT_COS_CREDENTIALS || {
    "apikey": "UCzNCU02ObcUXQDwr39322aCSv4GrETPdJHerjJoXwv0",
    "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
    "iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:cloud-object-storage:global:a/f5480cff938cd0333aad8872f82cd5b3:2d9530e2-6204-41de-a66d-e02845b9c7c3::",
    "iam_apikey_name": "auto-generated-apikey-5ef7fdd3-51a7-4166-900f-0d3d2fa4f416",
    "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
    "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/f5480cff938cd0333aad8872f82cd5b3::serviceid:ServiceId-a03c9b9b-d1d3-467a-873d-21f66794afa0",
    "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/f5480cff938cd0333aad8872f82cd5b3:2d9530e2-6204-41de-a66d-e02845b9c7c3::"
  };

var config = {
    endpoint: "s3.us-south.cloud-object-storage.appdomain.cloud",
    apiKeyId: cosCreds.apikey,
    ibmAuthEndpoint: 'https://iam.cloud.ibm.com/identity/token',
    serviceInstanceId: cosCreds.resource_instance_id,
}

var cosClient=new myCos.S3(config);

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
            console.error(error);
            res.status(500).send(error);
            return;
        }
        
        //console.log(result);
        
        var resultJSON = {};
        try {
            resultJSON = JSON.parse(result);
        } catch(error) {
            console.error(`ERROR: ${error.code} - ${error.message}\n`);
            return;
        } 

        if (resultJSON.error) {
            res.status(resultJSON.status).send(resultJSON.error);
            return;
        }

        // resultJSON.forEach(function(elem) {
        //     getObjectData(bucketPC, `${elem.commodityId}.jpg`, function(error, data) {
        //         if (error || data == null) {
        //             elem['imageUrl'] = "http://placehold.it/253x182";
                    
        //         }
        //         else {
        //             elem['imageUrl'] = endpoint + '/' + bucketPC + '/' + elem.commodityId + '.jpg';
        //         }
        //         //console.log(JSON.stringify(elem));

        //     });
            
        // });

        // for (let i=0; i<resultJSON.length; i++) {
        //     var elem = resultJSON[i];
        //     try {
        //         var data = await asyncGetObjectData(bucketPC, `${elem.commodityId}.jpg`);
        //         if (!data) {
        //             elem['imageUrl'] = "http://placehold.it/253x182";
        //         }
        //         else {
        //             console.log('File Contents: ' + Buffer.from(data.Body).toString());
        //             elem['imageUrl'] = endpoint + '/' + bucketPC + '/' + elem.commodityId + '.jpg';
        //         }
        //     }
        //     catch(error) {
        //         console.error(`ERROR: ${error.code} - ${error.message}\n`);
        //         elem['imageUrl'] = "http://placehold.it/253x182";
        //     }
        // }

        async.forEachOf(resultJSON, function(elem, key, next) {

            getObjectData(bucketPC, `${elem.commodityId}.jpg`, function(error, data) {
                if (error || data == null) {
                    elem['imageUrl'] = "http://placehold.it/253x182";        
                }
                else {
                    elem['imageUrl'] = endpoint + '/' + bucketPC + '/' + elem.commodityId + '.jpg';
                }
                //console.log(JSON.stringify(elem));
                next();
            });
        }, function(error) {
            res.status(response.statusCode).send(resultJSON);
        });

        // res.status(response.statusCode).send(resultJSON);
        
    });

});


productRoutes.get('/ProductList', function(req, res) {
    
    let url = serviceUrl + '/Products';

    console.log('url = ' + url);
    let queryOption = {
        url: url,
        //headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }

    request(queryOption, function(error, response, result) {
        if (error) {
            console.error(error);
            res.status(500).send(error);
            return;
        }
        
        //console.log(response);
        
        var resultJSON = {};
        try {
            resultJSON = JSON.parse(result);
        } catch(error) {
            console.error(`ERROR: ${error.code} - ${error.message}\n`);
            return;
        }
        
        if (resultJSON.error) {
            res.status(resultJSON.status).send(resultJSON.error);
            return;
        }

        async.forEachOf(resultJSON, function(elem, key, next) {

            getObjectData(bucketP, `${elem.productId}.jpg`, function(error, data) {
                if (error || data == null) {
                    elem['imageUrl'] = "http://placehold.it/253x182";        
                }
                else {
                    elem['imageUrl'] = endpoint + '/' + bucketP + '/' + elem.productId + '.jpg';
                }
                //console.log(JSON.stringify(elem));
                next();
            });
        }, function(error) {
            res.status(response.statusCode).send(resultJSON);
        });

        // res.status(response.statusCode).send(resultJSON);
        
    });

});


productRoutes.get('/ProductList/:pcid', function(req, res) {
    
    let url = "";
    if (req.params.pcid) {
        url = serviceUrl + '/Products/' + req.params.pcid;
    }
    else {
        url = serviceUrl + '/Products';
    }

    console.log('url = ' + url);
    let queryOption = {
        url: url,
        //headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }

    request(queryOption, function(error, response, result) {
        if (error) {
            console.error(error);
            res.status(500).send(error);
            return;
        }
        
        //console.log(response);
        
        var resultJSON = {};
        try {
            resultJSON = JSON.parse(result);
        } catch(error) {
            console.error(`ERROR: ${error.code} - ${error.message}\n`);
            return;
        }
        if (resultJSON.error) {
            res.status(resultJSON.status).send(resultJSON.error);
            return;
        }

        async.forEachOf(resultJSON, function(elem, key, next) {

            getObjectData(bucketP, `${elem.productId}.jpg`, function(error, data) {
                if (error || data == null) {
                    elem['imageUrl'] = "http://placehold.it/253x182";        
                }
                else {
                    elem['imageUrl'] = endpoint + '/' + bucketP + '/' + elem.productId + '.jpg';
                }
                //console.log(JSON.stringify(elem));
                next();
            });
        }, function(error) {
            res.status(response.statusCode).send(resultJSON);
        });

        // res.status(response.statusCode).send(resultJSON);
        
    });

});

function getObjectData(bucket, itemKey, cb) {
    console.log(`Retrieving item from bucket: ${bucket}, key: ${itemKey}`);
    return cosClient.getObject({
        Bucket: bucket, 
        Key: itemKey
    }).promise()
    .then((data) => {
        if (data != null) {
            //console.log('File Contents: ' + Buffer.from(data.Body).toString());
        }
        cb(null, data); 
    })
    .catch((e) => {
        //console.error(`ERROR: ${e.code} - ${e.message}\n`);
        cb(e);
    });
}

async function asyncGetObjectData(bucket, itemKey) {
    console.log(`Retrieving item from bucket: ${bucket}, key: ${itemKey}`);
    return cosClient.getObject({
        Bucket: bucket, 
        Key: itemKey
    }).promise();
}

module.exports = productRoutes;
