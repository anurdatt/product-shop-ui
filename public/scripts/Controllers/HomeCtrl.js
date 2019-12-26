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

    $(document).ready(function(){
        $('.dropdown-item').on("click", function(evt) {
            //console.log(evt);  
            var siblings= evt.currentTarget.parentElement.children;
            for (var i=0; i<siblings.length; i++) {
                $(siblings[i]).removeClass('active');
            }
            $(this).addClass('active');

            var $ddbutton= $(evt.currentTarget.parentElement.previousElementSibling) ;
            $ddbutton.text($(this).text());
            evt.preventDefault();
        });
    });
    
}

app.controller('HomeCtrl', HomeCtrl);

})();