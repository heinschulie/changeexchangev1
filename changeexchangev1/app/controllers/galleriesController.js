
; (function () {
    'use strict';
    var app = angular.module("cxcApp");

    var galleriesController = function ($scope, contentState, socialState) {

        contentState.data.bannerIndex = 0;
        $scope.contentState = contentState;
        $scope.contentState.data.menuActive = false; ///if I'm lucky
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