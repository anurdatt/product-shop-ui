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
                url: `/api/product/ProductList/commodity/${pcId}` 
                //url: "models/ProductList.json"
            });
            
        };

        this.getProductsByClassId = function (pcId) {
            return $http({
                method: "GET",
                url: `/api/product/ProductList/class/${pcId}` 
                //url: "models/ProductList.json"
            });
            
        };

        this.getProductsByFamilyId = function (pcId) {
            return $http({
                method: "GET",
                url: `/api/product/ProductList/family/${pcId}` 
                //url: "models/ProductList.json"
            });
            
        };

        this.getProductsBySegmentId = function (pcId) {
            return $http({
                method: "GET",
                url: `/api/product/ProductList/segment/${pcId}` 
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

        this.searchProductsByImage = function (file, successCB, errorCB) {
            var fd = new FormData();
            fd.append('file', file);
            var uploadUrl = "/api/product/SearchProductsByImage";
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(data) {
                console.log('File uploaded and search completed successfully');
                successCB(data);
            })
            .error(function(error) {
                console.error('Error in uploading file or search - ' + error);
                errorCB(error);
            });
        };

    }

    app.service('ProductListProvider', ProductListProvider);

})();
