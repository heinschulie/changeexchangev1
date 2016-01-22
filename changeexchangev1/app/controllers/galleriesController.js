
; (function () {
    'use strict';
    var app = angular.module("cxcApp");

    var galleriesController = function ($scope, contentState, socialState) {

        $scope.contentState = contentState;
        $scope.contentState.data.galleryViewing = false; //unless we're in a gallery 
        $scope.socialState = socialState;

        var callForGalleries = function () {
            return contentState.getGalleries();
        }

        //Initialise 
        callForGalleries();

    }

    app.controller("galleriesController", ["$scope", "contentState", "socialState", galleriesController]);
}())