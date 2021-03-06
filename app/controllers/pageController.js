﻿
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var pageController = function ($scope, $routeParams, contentState, socialState) {

        $scope.contentState = contentState;
        $scope.contentState.data.menuActive = false; ///if I'm lucky
        $scope.contentState.data.galleryViewing = false; //unless we're in a gallery 
        socialState.data.videoPlayer = false; //If user clicked on a page, he/she's not interested in youtube. 

        //Reset select
        contentState.changeMoments[0].active = true;
        contentState.chosenMoment = contentState.changeMoments[0];

        var callForPage = function () {
            return contentState.getPage($routeParams.pagename);
        }

        //Initialise 
        callForPage();
    }

    app.controller("pageController", ["$scope", "$routeParams", "contentState", "socialState", pageController]);
}())