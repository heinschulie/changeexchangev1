var app = angular.module('cxcApp', ['ngRoute']);


app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });


    //FINALLY

    $routeProvider.otherwise({
        redirectTo: "/home"
    });

});