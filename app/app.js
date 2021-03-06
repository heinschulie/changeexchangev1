﻿

//Notes on Angular integration with Wordpress: 
// 1 - Wordpress content is typically messed... mixture of structure, styling and actual content. Use ng-sanitize along with ng-bind
//     ng-bind-html="something.something" directive to get around this. It hurts though. Check out here: https://1fix.io/blog/2014/11/13/angularjs-wordpress-theme-ngbindhtml/


'use strict';
var app = angular.module('cxcApp', ['ngRoute', 'ngSanitize', 'angular-carousel', 'angulike']);


app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

    $routeProvider.when("/more/:pagename", {
        controller: "pageController",
        templateUrl: "/app/views/page.html"
    });

    $routeProvider.when("/galleries", {
        controller: "galleriesController",
        templateUrl: "/app/views/galleries.html"
    });

    $routeProvider.when("/gallery/:galleryName", {
        controller: "galleryController",
        templateUrl: "/app/views/gallery.html"
    });

    $routeProvider.when("/Content-staging", {
        controller: "stagingController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/Content-staging/:slug", {
        controller: "postController",
        templateUrl: "/app/views/post.html"
    });

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    //$routeProvider.when("/:postId/:postTitle", {
    //    controller: "postController",
    //    templateUrl: "/app/views/post.html"
    //});
    
    $routeProvider.when("/:category/:subcategory/:slug", {
        controller: "postController",
        templateUrl: "/app/views/post.html"
    });

    $routeProvider.when("/:category/:subcategory", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });
    //$routeProvider.when("/:postName", {
    //    controller: "postController",
    //    templateUrl: "/app/views/post.html"
    //});

    $routeProvider.when("/oops", {
        //controller: "postController",
        templateUrl: "/app/views/oops.html"
    });

    //FINALLY

    $routeProvider.otherwise({
        redirectTo: "/home"
    });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

}]);

app.config(["$httpProvider", function ($httpProvider) {

    $httpProvider.interceptors.push('ajaxInterceptorService');

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = '481757868679120'; // set your facebook app id here
      }
]);


//app.filter(['html',function($sce){
//    return function(input){
//        return $sce.trustAsHtml(input);
//    }
//}])
