
; (function () {
    'use strict';
    var app = angular.module("cxcApp");

    var galleriesController = function ($scope, contentState) {

        $scope.contentState = contentState;

        var callForGalleries = function () {
            return contentState.getGalleries();
        }

        //Initialise 
        callForGalleries();

    }

    app.controller("galleriesController", ["$scope", "contentState", galleriesController]);
}())