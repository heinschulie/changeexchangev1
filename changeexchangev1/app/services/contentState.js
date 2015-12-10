'use strict'; 
(function () {

    var contentState = function ($timeout, pageService, postService, errorService) {

        var data = {
            changeMoment: '',
            pageNumber: 0,
            postsPerPage : 6,
            post: {},
            posts: []
        };

        var getPage = function (pageId) {
            return pageService.getPage(pageId).then(function(results){
                data.page = results.data; 
            })
        }

        var getPost = function (postId) {
            return postService.getPost(postId).then(function (results) {
                data.post = results.data;
            })
        }

        var getPosts = function () {
            data.pageNumber = data.pageNumber + 1;
            return postService.getPosts(data.postsPerPage, data.pageNumber, data.changeMoment).then(function (results) {
                if (data.pageNumber === 1)
                    data.posts = results.data;
                else
                    data.posts = data.posts.concat(results.data)
            })
        }

        return {
            data: data,
            getPage: getPage,
            getPost: getPost,
            getPosts: getPosts
        };
    };

    var module = angular.module("cxcApp");
    module.factory('contentState', ['$timeout', 'pageService', 'postService', 'errorService', contentState]);

}());
