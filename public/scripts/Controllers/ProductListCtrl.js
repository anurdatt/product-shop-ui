(function() {
function ProductListCtrl($scope, $routeParams, Page, Navigation, ProductListProvider) {
    var pageTitle = 'Product List';
    
    Page.setTitle(pageTitle);
    $scope.loading=true;

    $scope.listType = $routeParams.type
    var sterm = $routeParams.st;
    
    if ($scope.listType == "all") {
        
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
    else if ($scope.listType == "search") {
        $scope.commodityName = "Search"  //hack to set the section header proper
        $scope.sterm = $routeParams.st;
        console.log("Search term = " + $scope.sterm);
        ProductListProvider.searchProductsByText($scope.sterm)
        .success(function(data) {
            console.log("data : " + JSON.stringify(data));
            $scope.products=$scope.allProducts=data;
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
        ProductListProvider.getProductsByCommodityId($scope.commodityId)
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