'use strict';
(function () {

    var app = angular.module("cxcApp");

    var aboutController = function ($scope, contentState) {

        $scope.contentState = contentState;

        var callForPage = function () {
            return contentState.getAbout();
        }

        //Initialise 
        callForPosts();
    }

    app.controller("aboutController", ["$scope", "contentState", aboutController]);
}())