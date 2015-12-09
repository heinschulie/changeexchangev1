﻿

//Notes on Angular integration with Wordpress: 
// 1 - Wordpress content is typically fucked... mixture of structure, styling and actual content. Use ng-sanitize along with ng-bind
//     ng-bind-html="something.something" directive to get around this. It hurts though. Check out here: https://1fix.io/blog/2014/11/13/angularjs-wordpress-theme-ngbindhtml/


'use strict';
var app = angular.module('cxcApp', ['ngRoute', 'ngSanitize']); 


app.config(function ($routeProvider) {

    $routeProvider.when("/about", {
        //controller: "aboutController",
        templateUrl: "/app/views/about.html"
    });

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/:postId", {
        controller: "postController",
        templateUrl: "/app/views/post.html"
    });

    //FINALLY

    $routeProvider.otherwise({
        redirectTo: "/home"
    });

});