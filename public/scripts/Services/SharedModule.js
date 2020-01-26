
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
    var title='Product Shop';
    return {
        title: function() { return title;},
        setTitle: function(newTitle) { title=newTitle;}
    }
})
.factory('Navigation', function() {
    var active='home';
    return {
        active: function() { return active;},
        setActive: function(newNav) { active=newNav;}
    }

});