
; (function () {
    'use strict';
    var app = angular.module("cxcApp");

    var galleriesController = function ($scope, contentState, socialState) {

        $scope.contentState = contentState;
        $scope.socialState = socialState;

        var callForGalleries = function () {
            return contentState.getGalleries();
        }

        //Initialise 
        callForGalleries();

    }

    app.controller("galleriesController", ["$scope", "contentState", "socialState", galleriesController]);
}())