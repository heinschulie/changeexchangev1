'use strict';
(function () {

    var postService = function ($http, cxcService, errorService) {

        var serviceBase = cxcService.serviceBase;

        var getPost = function (postId) {
            return $http.get(serviceBase + 'posts/' + postId) //CHECK PROPER ENDPOINT 
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorService.catchError(error);
                });
        };

        var getPosts = function (postsPerPage, pageNumber, category) {
            var url = serviceBase + 'posts?filter[posts_per_page]=' + postsPerPage + '&page=' + pageNumber + '&fields=ID,title,excerpt';
            if (category && category.length > 0) {
                url = url + '&filter[category_name]=';
                for (var i = 0; i < category.length; i++) {
                    url = url + ',' + category[i];
                }             
            }               

            return $http.get(url)
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorService.catchError(error);
                });
        };

        var getBanners = function (numberOfBanners, category) {
            var url = serviceBase + 'posts?filter[posts_per_page]=' + numberOfBanners + '&fields=ID,title,excerpt';
            if (category && category.length > 0) {
                url = url + '&filter[category_name]=';
                for (var i = 0; i < category.length; i++) {
                    url = url + ',' + category[i];
                }
            }

            return $http.get(url)
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorService.catchError(error);
                });
        };

        return {
            getPost: getPost,
            getPosts: getPosts,
            getBanners: getBanners
        };
    };

    var module = angular.module("cxcApp");
    module.factory('postService', ['$http', 'cxcService', 'errorService', postService]);

}());
