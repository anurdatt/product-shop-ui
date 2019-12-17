
function HomeCtrl($scope, Page) {
    var pageTitle = 'Product Catalog - Home';
    Page.setTitle(pageTitle);
    $scope.products= [  { name: "product1", description: "Description for product1", price: "$500.00" },
                        { name: "product2", description: "Description for product2", price: "$200.00" }, 
                        { name: "product3", description: "Description for product3", price: "$450.00" },
                        { name: "product4", description: "Description for product4", price: "$170.00" } ];
}

app.controller('HomeCtrl', HomeCtrl);