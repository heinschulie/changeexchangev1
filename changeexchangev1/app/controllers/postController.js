'use strict';
(function () {

    var app = angular.module("cxcApp");

    var postController = function ($scope, $routeParams, contentState) {

        $scope.contentState = contentState;
        var postId = $routeParams.postId;

        $scope.callForPost = function () {
            return contentState.getPost(postId);
        }

        //Initialise 
        $scope.callForPost();
    }

    app.controller("postController", ["$scope", "$routeParams", "contentState", postController]);
}())