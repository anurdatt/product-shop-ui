(function() {
function ProductViewCtrl($scope, $routeParams, Page, ObjectArray, ProductListProvider) {
    var pageTitle = '- Product View';
    
    Page.setTitle(pageTitle);
    $scope.loading=true;

    $scope.itemName = $routeParams.itemName;
    
    var prodArr = ObjectArray.get();

    ProductListProvider.getProductsByItemName($scope.itemName)
            .success(function(data) {
                //console.log("data : " + JSON.stringify(data));
                $scope.allProducts=data;
                //$scope.products = _.groupBy($scope.allProducts, 'itemName');
                //console.log('Grouped Products - ',JSON.stringify($scope.products));
                if ($scope.allProducts.length > 0) {
                    
                    $scope.prod0 = $scope.allProducts[0];
                    let pc = $scope.prod0.productCatalog;
                    $scope.commodityId = pc.commodityId;
                    $scope.commodityName = pc.commodityName;
                    $scope.classId = pc.classId;
                    $scope.className = pc.className;
                    $scope.familyId = pc.familyId;
                    $scope.familyName = pc.familyName;
                    $scope.segmentId = pc.segmentId;
                    $scope.segmentName = pc.segmentName;
                    
                }                
                $scope.loading=false;
            } )
            .error( function(error) {
                alert("There was an error fetching data, please try again!");
                console.error("Error: " + JSON.stringify(error));
            });
            
    
    
}

app.controller('ProductViewCtrl', ProductViewCtrl);

})();