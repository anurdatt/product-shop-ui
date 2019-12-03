
'use strict';

/**
 * @ngdoc overview
 * @name SharedModule
 * @description
 * # ProdCatAngularApp
 *
 * Main module of the application.
 */
var SharedModule=angular
  .module('SharedModule', []);

SharedModule.factory('Page', function() {
    var title='Product Catalog';
    return {
        title: function() { return title;},
        setTitle: function(newTitle) { title=newTitle;}
    }
});