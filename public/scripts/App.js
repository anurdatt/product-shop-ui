'use strict';

/**
 * @ngdoc overview
 * @name ProdCatApp
 * @description
 * # ProdCatApp
 *
 * Main module of the application.
 */
var app=angular
  .module('ProdCatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    // 'ngTouch',
    'angular.filter',
    'SharedModule'
  ]);

  app.constant('_', window._);

  app.run(['$rootScope', 'Page', 'Navigation', function($rootScope, Page, Navigation) {
    $rootScope.Page = Page;
    $rootScope.Navigation = Navigation;
    $rootScope._ = window._;
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', { controller: "HomeCtrl", templateUrl: "HomePage.html" })
        .when('/products/list/:type', { controller: "ProductListCtrl", templateUrl: "ProductList.html" })
        //.when('/products/list/:type/:st', { controller: "ProductListCtrl", templateUrl: "ProductList.html" })
        .when('/product/view/:itemName', { controller: "ProductViewCtrl", templateUrl: "ProductView.html" })
        .when('/', { redirectTo: "/home" })
        .when('/404_page', { controller: "Ctrl404", templateUrl: "404Page.html" })
        .otherwise({redirectTo: "/404_page" });
  }]);

  
  app.controller('navCtrl',[ '$scope', '$location', 'ObjectArray', function($scope, $location, ObjectArray, FileUpload) {
    // $scope.search = function(searchTerm) {
    //   $location.path('/products/search/' + searchTerm);
    // }
    $scope.search = function(searchTerm) {
      $location.path('/products/list/search').search('st', searchTerm);
    }


    // Open the full screen image search box 
    $scope.openImageSearch = function() {
      document.getElementById("myOverlay").style.display = "block";
      $location.path('/home');
    }

    // Close the full screen image search box 
    $scope.closeImageSearch = function() {
      document.getElementById("myOverlay").style.display = "none";
    } 

    $scope.uploadFile = function() {
      var file = $scope.myFile;
      console.log('file is ')
      console.dir(file);
      console.log('file object is ' + JSON.stringify(file));
      
      // var uploadUrl = "/fileUpload";
      // FileUpload.uploadFileToUrl(file, uploadUrl, function() {
        $scope.closeImageSearch();    
      // }, function(error) {
      //   alert(error);
      // });

      ObjectArray.clear(); 
      ObjectArray.put(file);
      $location.path('/products/list/searchByImage');
    
    }

  }]);

  app.controller('Ctrl404',[ 'Page', function(Page) {
    var pageTitle = 'Product Shop - Error';
    Page.setTitle(pageTitle);
  }]);
