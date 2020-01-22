(function() {
function ProductListCtrl($scope, $routeParams, Page, Navigation, ProductListProvider) {
    var pageTitle = 'Product List';
    
    Page.setTitle(pageTitle);
    $scope.loading=true;

    $scope.productCommodityId = $routeParams.pc;
    if ($scope.productCommodityId == "all") {
        
        Navigation.setActive('all-products');

        ProductListProvider.getAllProducts()
        .success(function(data) {
            //console.log("data : " + JSON.stringify(data));
            $scope.products=$scope.allProducts=data;
            $scope.loading=false;
        } )
        .error( function(error) {
            alert("There was an error fetching data, please try again!");
            console.error("Error: " + JSON.stringify(error));
        });
    }
    else {
        ProductListProvider.getProductsByCommodityId($scope.productCommodityId)
        .success(function(data) {
            //console.log("data : " + JSON.stringify(data));
            $scope.products=$scope.allProducts=data;
            $scope.loading=false;
        } )
        .error( function(error) {
            alert("There was an error fetching data, please try again!");
            console.error("Error: " + JSON.stringify(error));
        });
    }
    

    
    
    
}

app.controller('ProductListCtrl', ProductListCtrl);

})();