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

  app.run(['$rootScope', 'Page', function($rootScope, Page) {
    $rootScope.Page = Page;
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', { controller: "HomeCtrl", templateUrl: "HomePage.html" })
        .when('/', { redirectTo: "/home" })
        .when('/404_page', { controller: "Ctrl404", templateUrl: "404Page.html" })
        .otherwise({redirectTo: "/404_page" });
  }]);

  

  app.controller('Ctrl404',[ 'Page', function(Page) {
    var pageTitle = 'Product Catalog - Error';
    Page.setTitle(pageTitle);
  }]);
