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
    // 'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    // 'ngTouch',
    'SharedModule'
  ]);

  app.run(['$rootScope', 'Page', function($rootScope, Page) {
    $rootScope.Page = Page;
  }]);

  app.controller('HomeCtrl',[ '$scope', 'Page', function($scope, Page) {
    var pageTitle = 'Product Catalog - Home';
    Page.setTitle(pageTitle);
    $scope.pageCount=100;
  }]);
