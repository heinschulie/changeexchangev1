
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var indexController = function ($scope, $window, $location, errorState, contentState, socialState, categoryService) {

        $scope.contentState = contentState;
        $scope.socialState = socialState;
        $scope.exchangeCategories = [];
        $scope.flashbackCategories = [];
        $scope.errorState = errorState;
        //$scope.active = false;

        $scope.toggleMenu = function () {
            if ($scope.contentState.data.menuActive)
                $scope.contentState.data.menuActive = false;
            else
                $scope.contentState.data.menuActive = true;
        }

        $scope.scroll = 0; 

        $scope.$watch($window.scrollY, function (newVal, oldVal) {
            if (newVal > 0)
                $scope.minimalHeader = true;
            else $scope.minimalHeader = false; 
        })
    

        $scope.callForPosts = function () {           
            if ($location.path() !== "/home")
                $location.path('/home');
            else 
                return contentState.getPosts()
        } 

        var getExchangeCategories = function (parentFilter) {
            return categoryService.getCategories(parentFilter).then(function (results) {
                if (parentFilter === "Exchange")
                    $scope.exchangeCategories = results.data;
                if (parentFilter === "Flashback")
                    $scope.flashbackCategories = results.data;
            })
        }

        //Initialise
        getExchangeCategories('Exchange');
        getExchangeCategories('Flashback');
        if (!contentState.data.banners || !contentState.data.banners.length)
            contentState.getBanners(null, true);
    }

    app.controller("indexController", ["$scope", "$window", "$location", "errorState", "contentState", "socialState", "categoryService", indexController]);
}())