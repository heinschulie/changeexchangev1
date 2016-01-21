﻿
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var postController = function ($scope, $location, $routeParams, $sce, socialState, contentState) {


        $scope.sameAuthorPosts = [];
        $scope.sameCategoryPosts = [];
        $scope.recommendedMessageCat = "";
        $scope.recommendedMessageAuthor = "";

        $scope.contentState = contentState;
        $scope.socialState = socialState;
        var postId = $routeParams.postId;

        $scope.callForPost = function () {
            return contentState.getPost(postId).then(function (results) {
                $scope.recommendedMessageCat = "Enjoyed that article? Then we suggest you try one of these below...";
                $scope.recommendedMessageAuthor = "More articles from " + contentState.data.post.author.name;
                $scope.facebooklikebutton = $sce.trustAsHtml('<div class="fb-like" ng-if="facebooklikeurl" data-ng-href="' + $location.absUrl() + '" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>');
            });
        }

        var callForRecommendedPosts = function () {
            contentState.getPostsByAuthor().then(function(results){
                $scope.sameAuthorPosts = results; 
            });
        }

        var getRecommendedPosts = function () {

            $scope.sameAuthorPosts = contentState.data.posts.filter(function(post) {
                return post.author.username === contentState.data.post.author.username && post.ID !== contentState.data.post.ID;
            });
            if ($scope.sameAuthorPosts.length < 3)
                callForRecommendedPosts();
            $scope.sameCategoryPosts = contentState.data.posts.filter(function (post) {
                if (post.ID === contentState.data.post.ID)
                    return false; 
                var thisPostCategories = post.terms.category.map(function (category) {
                    return category.name;
                });
                for (var i = 0; i < thisPostCategories.length; i++) {
                    for (var j = 0; j < contentState.data.categories.length; j++){
                        if (thisPostCategories[i] === contentState.data.categories[j]
                            && thisPostCategories[i] !== "Change Moments"
                            && thisPostCategories[i] !== "Exchange")
                            return true;
                    }                   
                }
            });
        }

        //Initialise 
        $scope.callForPost()
            .then(function(results){
                if (contentState.data.posts.length < 1)
                    return contentState.getPosts();
            })
            .then(getRecommendedPosts);
    }

    app.controller("postController", ["$scope", "$location", "$routeParams", "$sce", "socialState", "contentState", postController]);
}())