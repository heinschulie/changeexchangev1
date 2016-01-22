
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var pageController = function ($scope, $routeParams, contentState) {

        $scope.contentState = contentState;
        $scope.contentState.data.galleryViewing = false; //unless we're in a gallery 

        var callForPage = function () {
            return contentState.getPage($routeParams.pagename);
        }

        //Initialise 
        callForPage();
    }

    app.controller("pageController", ["$scope", "$routeParams", "contentState", pageController]);
}())