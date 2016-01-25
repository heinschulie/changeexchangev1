
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var pageController = function ($scope, $routeParams, contentState, socialState) {

        $scope.contentState = contentState;
        $scope.contentState.data.galleryViewing = false; //unless we're in a gallery 
        socialState.data.videoPlayer = false; //If user clicked on a page, he/she's not interestd in youtube. 

        var callForPage = function () {
            return contentState.getPage($routeParams.pagename);
        }

        //Initialise 
        callForPage();
    }

    app.controller("pageController", ["$scope", "$routeParams", "contentState", "socialState", pageController]);
}())