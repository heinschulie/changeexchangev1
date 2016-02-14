
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var postController = function ($rootScope, $scope, $location, $routeParams, $sce, $timeout, socialState, contentState) {

        $scope.changeAgentPost = false;
        $scope.sameAuthorPosts = [];
        $scope.posturl = $location.absUrl();
        $scope.sameCategoryPosts = [];
        $scope.recommendedMessageCat = "";
        $scope.recommendedMessageAuthor = "";

        $scope.contentState = contentState;
        $scope.contentState.data.menuActive = false; ///if I'm lucky
        $scope.contentState.data.galleryViewing = false; //unless we're in a gallery 
        $scope.socialState = socialState;
        //var postId = $routeParams.postId;
        //var postId = 0;
        //var postName = $routeParams.postName.replace("%20", " ");
        var postSlug = $routeParams.slug;
        $scope.postCategory = $routeParams.subcategory.replace('-', ' ');

        $scope.callForPost = function () {
            //return contentState.getPost(postId).then(function (results) {
            //    $scope.recommendedMessageCat = "Enjoyed that article? Then we suggest you try one of these below...";
            //    $scope.recommendedMessageAuthor = "More articles from " + contentState.data.post.author.name;
            //});

            return contentState.getPostByTitle(postSlug).then(function (results) {
                $scope.recommendedMessageCat = "Enjoyed that article? Then we suggest you try one of these below...";
                $scope.recommendedMessageAuthor = "More articles from " + contentState.data.post.author.name;          
            });
        }


        var callForRecommendedPosts = function () {
            contentState.getPostsByAuthor().then(function(results){
                $scope.sameAuthorPosts = results.filter(function (post) {
                    return post.ID !== contentState.data.post.ID;
                });
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
                            && thisPostCategories[i] !== "Authors"
                            && thisPostCategories[i] !== "Exchange")
                            return true;
                    }                   
                }
            });
        }


        //Initialise 
        if (postSlug === contentState.data.post.ID) {
            if (contentState.data.categories[0] === 'Authors')
                $scope.changeAgentPost = true;
            if (contentState.data.posts.length < 1)
                contentState.getPosts();
            getRecommendedPosts();
        }
        else
            $scope.callForPost()
                .then(function (results) {
                    $scope.myModel = {
                        Url: '' + $location.absUrl(),
                        Name: contentState.data.post.title,
                        ImageUrl: contentState.data.post.featured_image.source
                    };

                    if (contentState.data.categories[0] === 'Authors')
                        $scope.changeAgentPost = true;
                    if (contentState.data.posts.length < 1)
                        contentState.getPosts().then(getRecommendedPosts);
                    else
                        getRecommendedPosts();
                });
    }

    app.controller("postController", ["$rootScope", "$scope", "$location", "$routeParams", "$sce", "$timeout", "socialState", "contentState", postController]);
}())