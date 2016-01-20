
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var indexController = function ($scope, $location, errorState, contentState, categoryService) {

        $scope.contentState = contentState;
        $scope.errorState = errorState;
        $scope.active = false;
        $scope.toggleMenu = function () {
            if ($scope.active)
                $scope.active = false;
            else
                $scope.active = true;
        }

        $scope.callForPosts = function () {           
            if ($location.path() !== "/home")
                $location.path('/home');
            else 
                return contentState.getPosts()
        } 

        var getExchangeCategories = function (parentFilter) {
            return categoryService.getCategories(parentFilter).then(function (results) {
                $scope.exchangeCategories = results.data; 
            })
        }

        //Initialise
        getExchangeCategories('Exchange'); 
    }

    app.controller("indexController", ["$scope", "$location", "errorState", "contentState", "categoryService", indexController]);
}())