
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var indexController = function ($scope, $location, errorState, contentState, socialState, categoryService) {

        $scope.contentState = contentState;
        $scope.socialState = socialState;
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
        if (!contentState.data.banners || !contentState.data.banners.length)
            contentState.getBanners(null, true);
    }

    app.controller("indexController", ["$scope", "$location", "errorState", "contentState", "socialState", "categoryService", indexController]);
}())