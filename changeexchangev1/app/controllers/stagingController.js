
; (function () {
    'use strict';
    var app = angular.module("cxcApp");

    var stagingController = function ($scope, contentState, socialState) {

        contentState.data.bannerIndex = 0;
        $scope.contentState = contentState;
        $scope.contentState.data.menuActive = false; ///if I'm lucky
        $scope.contentState.data.galleryViewing = false; //unless we're in a gallery 
        $scope.socialState = socialState;

        var callForStagedContent = function () {
            return contentState.getStagedContent();
        }

        //Initialise 
        callForStagedContent();

    }

    app.controller("stagingController", ["$scope", "contentState", "socialState", stagingController]);
}())