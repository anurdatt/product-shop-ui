var productRoutes = require('express').Router(),
    request = require('request'),
    myCos = require('ibm-cos-sdk'),
    async = require('async'),
    fs = require('fs'),
    multer = require('multer'),
    jimp = require('jimp'),
    pm = require('pixelmatch');

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

// var storage = multer.diskStorage( {
//     destination: function(req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// });

var storage = multer.memoryStorage();

var upload = multer({storage: storage}).single("file");


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

            elem['imageUrl'] = endpoint + '/' + bucketPC + '/' + elem.commodityId + '.jpg';

            //multiPartUpload(bucketPC, `${elem.commodityId}.jpg`, '253x182.png');

            // getObjectData(bucketPC, `${elem.commodityId}.jpg`, function(error, data) {
            //     if (error || data == null) {
            //         elem['imageUrl'] = "http://placehold.it/253x182";        
            //     }
            //     else {
            //         elem['imageUrl'] = endpoint + '/' + bucketPC + '/' + elem.commodityId + '.jpg';
            //     }
            //     //console.log(JSON.stringify(elem));
            //     next();
            // });
            next();
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

            elem['imageUrl'] = endpoint + '/' + bucketP + '/' + elem.itemId + '.jpg';
            //multiPartUpload(bucketP, `${elem.itemId}.jpg`, '253x182.png');
            // getObjectData(bucketP, `${elem.itemId}.jpg`, function(error, data) {
            //     if (error || data == null) {
            //         elem['imageUrl'] = "http://placehold.it/253x182";        
            //     }
            //     else {
            //         elem['imageUrl'] = endpoint + '/' + bucketP + '/' + elem.itemId + '.jpg';
            //     }
            //     //console.log(JSON.stringify(elem));
            //     next();
            // });
            next();
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

            elem['imageUrl'] = endpoint + '/' + bucketP + '/' + elem.itemId + '.jpg';
            
            // getObjectData(bucketP, `${elem.itemId}.jpg`, function(error, data) {
            //     if (error || data == null) {
            //         elem['imageUrl'] = "http://placehold.it/253x182";        
            //     }
            //     else {
            //         elem['imageUrl'] = endpoint + '/' + bucketP + '/' + elem.itemId + '.jpg';
            //     }
            //     //console.log(JSON.stringify(elem));
            //     next();
            // });
            next();
        }, function(error) {
            res.status(response.statusCode).send(resultJSON);
        });

        // res.status(response.statusCode).send(resultJSON);
        
    });

});


productRoutes.post('/SearchProductsByText', function(req, res) {
    
    let url = serviceUrl + '/SearchProductsByText';;
    console.log('url = ' + url);

    data = req.body;

    console.log('post data = ' + JSON.stringify(data));
    let queryOption = {
        url: url,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
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

            elem['imageUrl'] = endpoint + '/' + bucketP + '/' + elem.itemId + '.jpg';
            
            // getObjectData(bucketP, `${elem.itemId}.jpg`, function(error, data) {
            //     if (error || data == null) {
            //         elem['imageUrl'] = "http://placehold.it/253x182";        
            //     }
            //     else {
            //         elem['imageUrl'] = endpoint + '/' + bucketP + '/' + elem.itemId + '.jpg';
            //     }
            //     //console.log(JSON.stringify(elem));
            //     next();
            // });
            next();
        }, function(error) {
            res.status(response.statusCode).send(resultJSON);
        });

        // res.status(response.statusCode).send(resultJSON);
        
    });

});



productRoutes.post('/SearchProductsByImage', function(req, res) {
    console.log('SearchProductsByImage request received..');
    
    upload(req, res, function(error) {
        if(error) {
            return res.status(500).end('Error uploading file - ' + error);
        }
        //console.log('req.file = ' + JSON.stringify(req.file));
        console.log(req.file.buffer);
        var searchImg = req.file.buffer;
        
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

            var finalResultJSON = [];
            async.forEachOf(resultJSON, function(elem, key, next) {

                // elem['imageUrl'] = endpoint + '/' + bucketP + '/' + elem.itemId + '.jpg';
                
                getObjectData(bucketP, `${elem.itemId}.jpg`, function(error, data) {
                    if (error || data == null) {
                        //throw error if reqd.
                        console.error('Error getting Object with Id ' + elem.itemId + ' from COS');
                    }
                    else {
                        console.log('Got Object with Id ' + elem.itemId + ' from COS');
                        elem['imageUrl'] = endpoint + '/' + bucketP + '/' + elem.itemId + '.jpg';
                        
                        const match = matchImageData(searchImg, Buffer.from(data.Body)); //returns true/false
                        if (match) {
                            finalResultJSON.push(elem);
                        }
                    }
                    //console.log(JSON.stringify(elem));
                    next();
                });
                //next();
            }, function(error) {
                res.status(response.statusCode).send(finalResultJSON);
            });

            // res.status(response.statusCode).send(resultJSON);
            
        });
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

function matchImageData(searchBuffer, itemBuffer) {
    //TODO
    console.log(searchBuffer);
    console.log('searchBuffer.length = ' + searchBuffer.length);
    console.log(itemBuffer);
    console.log('itemBuffer.length = ' + itemBuffer.length);
    return true;
    /* async.waterfall([
        function(next) {
            jimp.read(searchBuffer)
            .then( simage => {
                simage.resize(253, 182);
                //console.log('resized search image Object fields = ' + JSON.stringify(Object.keys(simage)));
                console.log('resized search image data length = ' + simage.getBuffer().length);
                next(null, simage);
            })
        },
        function(res1, next) {
            jimp.read(itemImage)
            .then( iimage => {
                iimage.resize(253, 182);
                console.log('resized item image data length = ' + iimage.getBuffer().length);
                next(null, res1, iimage);
            })
        },
        function(res1, res2, next) {
            pm.pixel
        }

    ], function(err, result) {

    }); */

    

    
}

function multiPartUpload(bucketName, itemName, filePath) {
    var uploadID = null;

    if (!fs.existsSync(filePath)) {
        log.error(new Error(`The file \'${filePath}\' does not exist or is not accessible.`));
        return;
    }

    console.log(`Starting multi-part upload for ${itemName} to bucket: ${bucketName}`);
    return cosClient.createMultipartUpload({
        Bucket: bucketName,
        Key: itemName
    }).promise()
    .then((data) => {
        uploadID = data.UploadId;

        //begin the file upload        
        fs.readFile(filePath, (e, fileData) => {
            //min 5MB part
            var partSize = 1024 * 1024 * 5;
            var partCount = Math.ceil(fileData.length / partSize);

            async.timesSeries(partCount, (partNum, next) => {
                var start = partNum * partSize;
                var end = Math.min(start + partSize, fileData.length);

                partNum++;

                console.log(`Uploading to ${itemName} (part ${partNum} of ${partCount})`);  

                cosClient.uploadPart({
                    Body: fileData.slice(start, end),
                    Bucket: bucketName,
                    Key: itemName,
                    PartNumber: partNum,
                    UploadId: uploadID
                }).promise()
                .then((data) => {
                    next(e, {ETag: data.ETag, PartNumber: partNum});
                })
                .catch((e) => {
                    cancelMultiPartUpload(bucketName, itemName, uploadID);
                    console.error(`ERROR: ${e.code} - ${e.message}\n`);
                });
            }, (e, dataPacks) => {
                cosClient.completeMultipartUpload({
                    Bucket: bucketName,
                    Key: itemName,
                    MultipartUpload: {
                        Parts: dataPacks
                    },
                    UploadId: uploadID
                }).promise()
                .then(console.log(`Upload of all ${partCount} parts of ${itemName} successful.`))
                .catch((e) => {
                    cancelMultiPartUpload(bucketName, itemName, uploadID);
                    console.error(`ERROR: ${e.code} - ${e.message}\n`);
                });
            });
        });
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

function cancelMultiPartUpload(bucketName, itemName, uploadID) {
    return cosClient.abortMultipartUpload({
        Bucket: bucketName,
        Key: itemName,
        UploadId: uploadID
    }).promise()
    .then(() => {
        console.log(`Multi-part upload aborted for ${itemName}`);
    })
    .catch((e)=>{
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

module.exports = productRoutes;
