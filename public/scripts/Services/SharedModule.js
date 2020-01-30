
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
    var baseTile = 'Product Shop';
    var title = baseTile;
    return {
        title: function() { return title;},
        setTitle: function(pageTitle) { title = baseTile + pageTitle;}
    }
})
.factory('Navigation', function() {
    var active='home';
    return {
        active: function() { return active;},
        setActive: function(newNav) { active=newNav;}
    }

})
.factory('FileArray', function() {
    var arr = [];
    return {
        get: function() { return arr;},
        put: function(newFile) { arr.push(newFile); },
        clear: function() { arr = []; }
    }
});