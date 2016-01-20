
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var homeController = function ($scope, errorState, contentState) {

        $scope.contentState = contentState;
        $scope.errorState = errorState; 

        $scope.callForPosts = function () {
            return contentState.getPosts();
        }

        //Social Feed Functionality 
        $scope.currentSm = "fb";
        $scope.changeSm = function (sm) {
            $scope.currentSm = sm;
        }

        //Initialise 
        if (contentState.data.categories.length < 1) {             // - If this is the first time we land on this page. 
            //Call only the change moments and exchange categories 
            $scope.contentState.data.categories = $scope.contentState.standardPostCategories;
        }
        if (contentState.data.posts.length < 1)
            $scope.callForPosts();

        if (!contentState.data.banners || !contentState.data.banners.length) 
            contentState.getBanners(null, true);
    }

    app.controller("homeController", ["$scope", "errorState", "contentState", homeController]);
}())