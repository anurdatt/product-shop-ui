(function () {

    function ProductListProvider ($http) {

        this.getAllProducts = function () {
            return $http({
                method: "GET",
                url: "/api/product/ProductList"
                //url: "models/ProductList.json"
            });
            
        };

        this.getProductsByCommodityId = function (pcId) {
            return $http({
                method: "GET",
                url: `/api/product/ProductList/${pcId}` 
                //url: "models/ProductList.json"
            });
            
        };

    }

    app.service('ProductListProvider', ProductListProvider);

})();
