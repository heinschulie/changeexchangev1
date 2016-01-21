
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var homeController = function ($scope, $timeout, errorState, contentState, socialState) {

        $scope.contentState = contentState;
        $scope.socialState = socialState;
        $scope.errorState = errorState; 

        $scope.callForPosts = function () {
            return contentState.getPosts();
        }

        //Initialise 
        if (contentState.data.categories.length < 1) {             // - If this is the first time we land on this page. 
            //Call only the change moments and exchange categories 
            $scope.contentState.data.categories = $scope.contentState.standardPostCategories;
        }
        if (contentState.data.posts.length < 1)
            $scope.callForPosts();
       
    }

    app.controller("homeController", ["$scope", "$timeout", "errorState", "contentState", "socialState", homeController]);
}())