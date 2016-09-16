
; (function () {
    'use strict';
    var app = angular.module("cxcApp");

    var galleryController = function ($scope, contentState) {

        $scope.contentState = contentState;
        $scope.contentState.data.galleryViewing = true; 

        var callForArtworks = function () {
            return contentState.getArtworks();
        }

        $scope.expand = function (art) {
            angular.forEach($scope.contentState.data.artworks, function (artwork) {
                if (artwork != art)
                    artwork.active = false;
            });
            art.active = !art.active;
        };

        //Initialise 
        callForArtworks();
         
    }

    app.controller("galleryController", ["$scope", "contentState", galleryController]);
}())