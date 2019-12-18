(function () {

    function ProductCatalogProvider ($http) {

        this.getProductCatalogs = function () {
            return $http({
                method: "GET",
                url: "/api/product/ProductCatalog"
                //url: "models/ProductCatalog.json"
            });
            
        };
    }

    app.service('ProductCatalogProvider', ProductCatalogProvider);

})();
