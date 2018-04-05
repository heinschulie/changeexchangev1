
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var homeController = function ($scope, $timeout, $routeParams, errorState, contentState, socialState) {

        $scope.contentState = contentState;
        $scope.contentState.data.menuActive = false; ///if I'm lucky
        $scope.contentState.data.deactivateMore = false; //we hope for the best
        $scope.contentState.data.galleryViewing = false; //unless we're in a gallery 
        $scope.contentState.data.mobileBannerVideoPlay = false; //close the door behind you
        $scope.socialState = socialState;
        $scope.errorState = errorState; 

        var mainCategory = { name: $routeParams.category };
        var mainSubcategory = { name: $routeParams.subcategory };

        $scope.callForPosts = function () {
            return contentState.getPosts();
        }

        //Initialise 
        if (contentState.data.categories.length < 1) {             // - If this is the first time we land on this page. 
            console.log("HELLO: ", mainCategory, " + ", mainSubcategory); 
            //new check
            if(mainCategory && mainCategory.name && mainSubcategory && mainSubcategory.name){
                console.log("WE GOT THIS FAR");
                const isExchange = mainCategory.name.toLowerCase() === 'exchange';
                const fetchBanners = mainSubcategory.name.toLowerCase() !== 'tell-me-your-story' && isExchange;
                
                $scope.contentState.selectedMoment(mainSubcategory, fetchBanners, isExchange, true); 
                // $scope.contentState.data.categories.push(mainSubcategory);
            }
            else{
                console.log("HERE NOW")
                //Call only the change moments and exchange categories 
                $scope.contentState.data.categories = $scope.contentState.standardPostCategories;
            }     
        }
        if (contentState.data.posts.length < 1)
            $scope.callForPosts();
        if (!contentState.data.banners || contentState.data.banners.length < 3)
            contentState.getBanners(null, true);
        if (!contentState.data.videobanners || !contentState.data.videobanners.length)
            contentState.getVideoBanners(null, true);
       
    }

    app.controller("homeController", ["$scope", "$timeout", "$routeParams", "errorState", "contentState", "socialState", homeController]);
}())