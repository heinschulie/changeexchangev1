'use strict'; 
;(function () {

    var contentState = function ($timeout, $sce, pageService, postService, errorService) {

        var data = {
            categories: [],
            pageNumber: 0,
            postsPerPage : 6,
            post: {},
            posts: [],
            banners: []
        };

        var getPage = function (pageId) {
            return pageService.getPage(pageId).then(function(results){
                data.page = results.data; 
            })
        }

        var getPost = function (postId) {
            return postService.getPost(postId).then(function (results) {
                data.categories = results.data.terms.category
                  .map(function (category) {
                      return category.name;
                  });

                data.post = results.data;
                data.post.content = $sce.trustAsHtml(data.post.content);
            })
        }

        var getPosts = function () {
            data.pageNumber = data.pageNumber + 1;
            return postService.getPosts(data.postsPerPage, data.pageNumber, data.categories).then(function (results) {
                if (data.pageNumber === 1)
                    data.posts = results.data;
                else
                    data.posts = data.posts.concat(results.data)
            })
        }

        var getBanners = function () {
            var bannerCategory = ['banner']; 
            return postService.getBanners(data.postsPerPage, bannerCategory).then(function (results) {
                data.banners = data.banners.concat(results.data);
            })
        }

        return {
            data: data,
            getPage: getPage,
            getPost: getPost,
            getPosts: getPosts,
            getBanners: getBanners
        };
    };

    var module = angular.module("cxcApp");
    module.factory('contentState', ['$timeout', '$sce', 'pageService', 'postService', 'errorService', contentState]);

}());
