
;(function () {
    'use strict';
    var postService = function ($http, cxcService, errorState) {
         
        var serviceBase = cxcService.serviceBase;
          
        var getPost = function (postId, name) {
            if (name)
                return $http.get(serviceBase + 'posts?filter[name]=' + name)
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorState.catchError(error);
                });
            else
                return $http.get(serviceBase + 'posts/' + postId) 
                    .then(function (results) {
                        return results;
                    })
                    .catch(function (error) {
                        errorState.catchError(error);
                    });
        };

        var getPostByName = function (name) {
            name = name.replace('é', 'e');
            return $http.get(serviceBase + 'posts?filter[name]=' + name)
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorState.catchError(error);
                });
        };

        var getPosts = function (postsPerPage, pageNumber, category, includeContent) {
            var url = serviceBase + 'posts?filter[post_status]=publish&filter[posts_per_page]=' + postsPerPage + '&page=' + pageNumber + '&fields=ID,title,excerpt,slug,category';
            if (includeContent) url = url + ',content';
            if (category && category.length > 0) {
                url = url + '&filter[category_name]=';
                for (var i = 0; i < category.length; i++) {
                    url = url + ',' + category[i];
                }             
            }               
            url = url.replace("'", "");
            return $http.get(url)
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorState.catchError(error);
                });
        };


        var getPostsByAuthor = function (authorId) {
            var url = serviceBase + 'posts?filter[post_status]=publish&filter[posts_per_page]=3&filter[author]=' + authorId + '&fields=ID,title,excerpt,slug';
            return $http.get(url)
                .then(function (results) {
                    return results;
                })
        };

        var getPostsByTags = function (tagArray) {
            var url = serviceBase + 'posts?filter[post_status]=publish&fields=ID,title,excerpt,slug';
            if (tagArray && tagArray.length > 0) {
                url = url + '&filter[tag]=';
                for (var i = 0; i < tagArray.length; i++) {
                    url = url + ',' + tagArray[i];
                }
            }
            url = url.replace("'", "");
            return $http.get(url)
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorState.catchError(error);
                });
        };

        var getBanners = function (numberOfBanners, category) {
            var url = serviceBase + 'posts?filter[post_status]=publish&filter[posts_per_page]=' + numberOfBanners + '&fields=ID,title,excerpt,slug,content';
            if (category && category.length > 0) {
                url = url + '&filter[category_name]=';
                for (var i = 0; i < category.length; i++) {
                    url = url + ',' + category[i];
                }
            }
            url = url.replace("'", "");
            return $http.get(url)
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorState.catchError(error);
                });
        };

        return {
            getPost: getPost,
            getPostByName: getPostByName,
            getPosts: getPosts,
            getPostsByTags: getPostsByTags,
            getPostsByAuthor: getPostsByAuthor,
            getBanners: getBanners
        };
    };

    var module = angular.module("cxcApp");
    module.factory('postService', ['$http', 'cxcService', 'errorState', postService]);

}());
