
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var homeController = function ($scope, $timeout, errorState, contentState, socialState) {

        $scope.contentState = contentState;
        $scope.contentState.data.menuActive = false; ///if I'm lucky
        $scope.contentState.data.deactivateMore = false; //we hope for the best
        $scope.contentState.data.galleryViewing = false; //unless we're in a gallery 
        $scope.contentState.data.mobileBannerVideoPlay = false; //close the door behind you
        $scope.socialState = socialState;
        $scope.errorState = errorState; 

        $scope.callForPosts = function () {
            return contentState.getPosts();
        }

        //Initialise 
        if (contentState.data.categories.length < 1) {             // - If this is the first time we land on this page. 
            //Call only the change moments and exchange categories 
            $scope.contentState.data.categories = $scope.contentState.standardPostCategories;
        }
        if (contentState.data.posts.length < 1)
            $scope.callForPosts();
        if (!contentState.data.banners || contentState.data.banners.length < 3)
            contentState.getBanners(null, true);
       
    }

    app.controller("homeController", ["$scope", "$timeout", "errorState", "contentState", "socialState", homeController]);
}())