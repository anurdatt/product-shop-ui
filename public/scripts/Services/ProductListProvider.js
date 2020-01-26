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

        this.searchProductsByText = function (st) {
            var data = { searchText: st };
            return $http({
                method: "POST",
                url: "/api/product/SearchProductsByText",
                //url: "models/ProductList.json"
                data: data
            });
        }

    }

    app.service('ProductListProvider', ProductListProvider);

})();
