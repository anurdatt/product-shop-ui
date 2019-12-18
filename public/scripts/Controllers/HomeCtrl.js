(function() {
function HomeCtrl($scope, Page, ProductCatalogProvider) {
    var pageTitle = 'Product Catalog - Home';
    Page.setTitle(pageTitle);
    ProductCatalogProvider.getProductCatalogs()
    .success(function(data) {
        //console.log("data : " + JSON.stringify(data));
        $scope.prodCats=data;
    } )
    .error( function(error) {
        alert("There was an error fetching data, please try again!");
        console.error("Error: " + JSON.stringify(error));
    });
}

app.controller('HomeCtrl', HomeCtrl);

})();