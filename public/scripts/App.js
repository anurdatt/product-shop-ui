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

  app.run(['$rootScope', 'Page', 'Navigation', function($rootScope, Page, Navigation) {
    $rootScope.Page = Page;
    $rootScope.Navigation = Navigation;
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', { controller: "HomeCtrl", templateUrl: "HomePage.html" })
        .when('/products/list/:type', { controller: "ProductListCtrl", templateUrl: "ProductList.html" })
        //.when('/products/list/:type/:st', { controller: "ProductListCtrl", templateUrl: "ProductList.html" })
        .when('/', { redirectTo: "/home" })
        .when('/404_page', { controller: "Ctrl404", templateUrl: "404Page.html" })
        .otherwise({redirectTo: "/404_page" });
  }]);

  
  app.controller('navCtrl',[ '$scope', '$location', function($scope, $location) {
    // $scope.search = function(searchTerm) {
    //   $location.path('/products/search/' + searchTerm);
    // }
    $scope.search = function(searchTerm) {
      $location.path('/products/list/search').search('st', searchTerm);
    }


    // Open the full screen image search box 
    $scope.openImageSearch = function() {
      document.getElementById("myOverlay").style.display = "block";
    }

    // Close the full screen image search box 
    $scope.closeImageSearch = function() {
      document.getElementById("myOverlay").style.display = "none";
    } 

  }]);

  app.controller('Ctrl404',[ 'Page', function(Page) {
    var pageTitle = 'Product Shop - Error';
    Page.setTitle(pageTitle);
  }]);
