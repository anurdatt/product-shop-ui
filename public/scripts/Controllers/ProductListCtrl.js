(function() {
function ProductListCtrl($scope, $routeParams, $location, _, Page, Navigation, ObjectArray, ProductListProvider) {
    var pageTitle = '- Product List';

    Page.setTitle(pageTitle);
    $scope.loading=true;

    $scope.listType = $routeParams.type
    var sterm = $routeParams.st;
    
    $scope.products = {};
    if ($scope.listType == "all") {
        
        Navigation.setActive('all-products');
        $scope.activeName = "All Products" 

        ProductListProvider.getAllProducts()
        .success(function(data) {
            //console.log("data : " + JSON.stringify(data));
            //$scope.products=$scope.allProducts=data;
            $scope.allProducts=data;
            $scope.products = _.groupBy($scope.allProducts, 'itemName');
            //console.log('Grouped Products - ',JSON.stringify($scope.products));
            $scope.loading=false;
        } )
        .error( function(error) {
            alert("There was an error fetching data, please try again!");
            console.error("Error: " + JSON.stringify(error));
        });
    }
    else if ($scope.listType == "search") {
        $scope.activeName = "Search" 
        $scope.sterm = $routeParams.st;
        console.log("Search term = " + $scope.sterm);
        ProductListProvider.searchProductsByText($scope.sterm)
        .success(function(data) {
            console.log("data : " + JSON.stringify(data));
             //$scope.products=$scope.allProducts=data;
             $scope.allProducts=data;
             $scope.products = _.groupBy($scope.allProducts, 'itemName');
             //console.log('Grouped Products - ',JSON.stringify($scope.products));
            $scope.loading=false;
        } )
        .error( function(error) {
            alert("There was an error fetching data, please try again!");
            console.error("Error: " + JSON.stringify(error));
        });
        
    }
    else if ($scope.listType == "category") {
        $scope.commodityId = $routeParams.commodityId;
        $scope.commodityName = $routeParams.commodityName;
        $scope.classId = $routeParams.classId;
        $scope.className = $routeParams.className;
        $scope.familyId = $routeParams.familyId;
        $scope.familyName = $routeParams.familyName;
        $scope.segmentId = $routeParams.segmentId;
        $scope.segmentName = $routeParams.segmentName;
        if ($scope.commodityId) {
            ProductListProvider.getProductsByCommodityId($scope.commodityId)
            .success(function(data) {
                //console.log("data : " + JSON.stringify(data));
                //$scope.products=$scope.allProducts=data;
                $scope.allProducts=data;
                $scope.products = _.groupBy($scope.allProducts, 'itemName');
                //console.log('Grouped Products - ',JSON.stringify($scope.products));
                if ($scope.allProducts.length > 0) {
                    if (!$scope.classId) {
                        let pc = $scope.allProducts[0].productCatalog;
                        $scope.classId = pc.classId;
                        $scope.className = pc.className;
                        $scope.familyId = pc.familyId;
                        $scope.familyName = pc.familyName;
                        $scope.segmentId = pc.segmentId;
                        $scope.segmentName = pc.segmentName;
                    }
                    $scope.activeName = $scope.commodityName;
                }
                else {
                    $scope.activeName = $scope.commodityName;
                    $scope.commodityName = null;  //hack to set section header correct
                }
                
                
                $scope.loading=false;
            } )
            .error( function(error) {
                alert("There was an error fetching data, please try again!");
                console.error("Error: " + JSON.stringify(error));
            });
        }
        else if ($scope.classId) {
            ProductListProvider.getProductsByClassId($scope.classId)
            .success(function(data) {
                //console.log("data : " + JSON.stringify(data));
                //$scope.products=$scope.allProducts=data;
                $scope.allProducts=data;
                $scope.products = _.groupBy($scope.allProducts, 'itemName');
                //console.log('Grouped Products - ',JSON.stringify($scope.products));
                if ($scope.allProducts.length > 0) {
                    if (!$scope.familyId) {
                        let pc = $scope.allProducts[0].productCatalog;
                        $scope.familyId = pc.familyId;
                        $scope.familyName = pc.familyName;
                        $scope.segmentId = pc.segmentId;
                        $scope.segmentName = pc.segmentName;
                    }
                    $scope.activeName = $scope.className; 
                }
                else {
                    $scope.activeName = $scope.className;
                    $scope.className = null; //hack to set section header correct
                }
                $scope.loading=false;
            } )
            .error( function(error) {
                alert("There was an error fetching data, please try again!");
                console.error("Error: " + JSON.stringify(error));
            });
        }
        else if ($scope.familyId) {
            ProductListProvider.getProductsByFamilyId($scope.familyId)
            .success(function(data) {
                //console.log("data : " + JSON.stringify(data));
                //$scope.products=$scope.allProducts=data;
                $scope.allProducts=data;
                $scope.products = _.groupBy($scope.allProducts, 'itemName');
                //console.log('Grouped Products - ',JSON.stringify($scope.products));
                if ($scope.allProducts.length > 0) {
                    if (!$scope.segmentId) {
                        let pc = $scope.allProducts[0].productCatalog;
                        $scope.segmentId = pc.segmentId;
                        $scope.segmentName = pc.segmentName;
                    }
                    $scope.activeName = $scope.familyName;
                }
                else {
                    $scope.activeName = $scope.familyName;
                    $scope.familyName = null; //hack to set section header correct
                }
                $scope.loading=false;
            } )
            .error( function(error) {
                alert("There was an error fetching data, please try again!");
                console.error("Error: " + JSON.stringify(error));
            });
        }
        else if ($scope.segmentId) {
            ProductListProvider.getProductsBySegmentId($scope.segmentId)
            .success(function(data) {
                //console.log("data : " + JSON.stringify(data));
                //$scope.products=$scope.allProducts=data;
                $scope.allProducts=data;
                $scope.products = _.groupBy($scope.allProducts, 'itemName');
                //console.log('Grouped Products - ',JSON.stringify($scope.products));
                $scope.activeName = $scope.segmentName;
                $scope.loading=false;
            } )
            .error( function(error) {
                alert("There was an error fetching data, please try again!");
                console.error("Error: " + JSON.stringify(error));
            });
        }
    }
    else if ($scope.listType == "searchByImage") {
        Navigation.setActive('search-by-image');
        $scope.activeName = "Search By Image"  
        var farr = ObjectArray.get();
        if (farr.length > 0) {
            var searchImageFile = farr[0];
            ProductListProvider.searchProductsByImage(searchImageFile, function(data) {
                console.log("data : " + JSON.stringify(data));
                //$scope.products=$scope.allProducts=data;
                $scope.allProducts=data;
                $scope.products = _.groupBy($scope.allProducts, 'itemName');
                //console.log('Grouped Products - ',JSON.stringify($scope.products));
                $scope.loading=false;
            }, function(error) {
                alert("There was an error fetching data, please try again!");
                console.error("Error: " + JSON.stringify(error));
            });
        }
        else {
            alert("Search by image called without an image file in the array");
        }
        
    }


    $scope.viewProduct = function(itemName, products) {
        if (!products || !itemName) return;
        ObjectArray.clear();
        for (let i=0; i<products.length; i++) {
            ObjectArray.put(products[i]);
        }
        $location.path('/product/view/'+itemName);
    }
    
}

app.controller('ProductListCtrl', ProductListCtrl);

})();