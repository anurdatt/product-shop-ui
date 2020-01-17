(function() {
function HomeCtrl($scope, Page, Navigation, ProductCatalogProvider) {
    var pageTitle = 'Product Catalog - Home';
    $scope.pc_dd_all="All";
    $scope.pc_selected_segment=$scope.pc_dd_all;
    $scope.pc_selected_family=$scope.pc_dd_all;
    $scope.pc_selected_class=$scope.pc_dd_all;
    $scope.pc_type_segment="segment";
    $scope.pc_type_family="family";
    $scope.pc_type_class="class";

    Navigation.setActive('home');
    Page.setTitle(pageTitle);
    $scope.loading=true;
    ProductCatalogProvider.getProductCatalogs()
    .success(function(data) {
        //console.log("data : " + JSON.stringify(data));
        $scope.prodCats=$scope.allProdCats=data;
        $scope.loading=false;
    } )
    .error( function(error) {
        alert("There was an error fetching data, please try again!");
        console.error("Error: " + JSON.stringify(error));
    });

    // $(document).ready(function(){
    //     $('.dropdown-item').on("click", function(evt) {
    //         console.log(evt);  
    //         var siblings= evt.currentTarget.parentElement.children;
    //         for (var i=0; i<siblings.length; i++) {
    //             $(siblings[i]).removeClass('active');
    //         }
    //         $(this).addClass('active');

    //         var $ddbutton= $(evt.currentTarget.parentElement.previousElementSibling) ;
    //         $ddbutton.text($(this).text());
    //         evt.preventDefault();
    //     });
    // });

    $('.list-group').on('click', '.dropdown-item', function(evt) {
        //console.log(evt);  
            var siblings= evt.target.parentElement.children;
            for (var i=0; i<siblings.length; i++) {
                $(siblings[i]).removeClass('active');
            }
            $(this).addClass('active');

            //var $ddbutton= $(evt.target.parentElement.previousElementSibling) ;
            var selected = $(this).text().trim();
            //$ddbutton.text(selected);
            console.log("<"+selected+">");

            if (selected == $scope.pc_dd_all) {
                if (evt.target.attributes['data-pc-type'].value == $scope.pc_type_segment) {
                    $scope.prodCats = $scope.allProdCats;
                    $scope.segmentSelprodCats = null;
                    $scope.familySelprodCats = null;
                    $scope.classSelprodCats = null;
                    $scope.pc_selected_segment = selected;
                    $scope.pc_selected_family = selected;
                    $scope.pc_selected_class = selected;
                }
                if (evt.target.attributes['data-pc-type'].value == $scope.pc_type_family) {
                    $scope.prodCats = $scope.segmentSelprodCats || $scope.allProdCats;
                    $scope.familySelprodCats = null;
                    $scope.classSelprodCats = null;
                    $scope.pc_selected_family = selected;
                    $scope.pc_selected_class = selected;
                }
                if (evt.target.attributes['data-pc-type'].value == $scope.pc_type_class) {
                    $scope.prodCats = $scope.familySelprodCats || $scope.segmentSelprodCats || $scope.allProdCats;
                    $scope.classSelprodCats = null;
                    $scope.pc_selected_class = selected;
                }
            }
            else {
                console.log("<"+ evt.target.attributes['data-pc-type'].value +">");
                if (evt.target.attributes['data-pc-type'].value == $scope.pc_type_segment) {
                    $scope.pc_selected_segment = selected;
                    $scope.segmentSelprodCats = $scope.segmentSelprodCats || JSON.parse(evt.target.attributes['data-value'].value);
                }
                if (evt.target.attributes['data-pc-type'].value == $scope.pc_type_family) {
                    $scope.pc_selected_family = selected;
                    $scope.familySelprodCats = $scope.familySelprodCats || JSON.parse(evt.target.attributes['data-value'].value);
                }
                if (evt.target.attributes['data-pc-type'].value == $scope.pc_type_class) {
                    $scope.pc_selected_class = selected;
                    $scope.classSelprodCats = $scope.classSelprodCats || JSON.parse(evt.target.attributes['data-value'].value);
                }

                $scope.prodCats=JSON.parse(evt.target.attributes['data-value'].value);
            } 
            
            $scope.$apply();
            //console.log($scope.prodCats);
            evt.preventDefault();
    });

    //$(document).ready(function() {
       /*  $scope.$on('$viewContentLoaded', function() {
            
            $('.dropdown-item').on("click", function(evt) {
                console.log(evt);  
                var siblings= evt.currentTarget.parentElement.children;
                for (var i=0; i<siblings.length; i++) {
                    $(siblings[i]).removeClass('active');
                }
                $(this).addClass('active');

                var $ddbutton= $(evt.currentTarget.parentElement.previousElementSibling) ;
                $ddbutton.text($(this).text());
                evt.preventDefault();
            });
        }); */
    //});
    
}

app.controller('HomeCtrl', HomeCtrl);

})();