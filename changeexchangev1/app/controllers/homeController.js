'use strict';
(function () {

    var app = angular.module("cxcApp");

    var homeController = function ($scope) {

        $scope.testFunction = function () {
            alert('Hello!!');
        }

        $scope.message = 'HELLO FROM THE HOME';
    }

    app.controller("homeController", ["$scope", homeController]);
}())