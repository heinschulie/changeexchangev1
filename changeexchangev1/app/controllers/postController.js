
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var postController = function ($scope, $routeParams, contentState) {

        $scope.sameAuthorPosts = [];
        $scope.sameCategoryPosts = [];

        $scope.contentState = contentState;
        var postId = $routeParams.postId;

        $scope.callForPost = function () {
            return contentState.getPost(postId)
            //    .then(function (results) {
            //    $scope.post = $sce.trustAsHtml(contentState.data.post.content);
            //});
        }

        var callForRecommendedPosts = function () {
            //TODO 
        }

        var getRecommendedPosts = function () {
            if (!contentState.data.posts.length)
                callForRecommendedPosts();

            $scope.sameAuthorPosts = contentState.data.posts.filter(function(post) {
                return post.author.username === contentState.data.post.author.username;
            });
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

    app.controller("postController", ["$scope", "$routeParams", "contentState", postController]);
}())