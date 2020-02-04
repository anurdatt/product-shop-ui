(function() {
function ProductViewCtrl($scope, $routeParams, Page, ObjectArray) {
    var pageTitle = '- Product View';
    
    Page.setTitle(pageTitle);
    $scope.loading=true;

    $scope.itemName = $routeParams.itemName;
    
    var prodArr = ObjectArray.get();
    if (prodArr.length > 0) {
        $scope.prod0 = prodArr[0];
        var pc = $scope.prod0.productCatalog;
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
    
}

app.controller('ProductViewCtrl', ProductViewCtrl);

})();