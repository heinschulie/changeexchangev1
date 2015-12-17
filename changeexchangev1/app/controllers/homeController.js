'use strict';
;(function () {

    var app = angular.module("cxcApp");

    var homeController = function ($scope, contentState) {

        $scope.contentState = contentState;

        $scope.callForPosts = function () {
            return contentState.getPosts();
        }

        //Social Feed Functionality 
        $scope.currentSm = "fb";
        $scope.changeSm = function (sm) {
            $scope.currentSm = sm;
        }

        //Initialise 
        if (contentState.data.pageNumber <= 1) {             // - If this is the first time we land on this page. 
            //Call only the change moments and exchange categories 
            $scope.contentState.data.categories = [
                'Landing that Job',
                'Making a Home',
                'Starting a Family',
                'Tying the Knot',
                'Ruda talks change',
                'The Dan Nicoll Show'
            ];
            $scope.callForPosts();
        }

        if (!contentState.data.banners || !contentState.data.banners.length) 
            contentState.getBanners();
    }

    app.controller("homeController", ["$scope", "contentState", homeController]);
}())