'use strict';
(function () {

    var app = angular.module("cxcApp");

    var homeController = function ($scope, contentState) {

        $scope.contentState = contentState;

        $scope.callForPosts = function () {
            return contentState.getPosts();
        }

        //Initialise 
        if (contentState.data.pageNumber <= 1)             // - If this is the first time we land on this page. 
            $scope.callForPosts();
    }

    app.controller("homeController", ["$scope", "contentState", homeController]);
}())