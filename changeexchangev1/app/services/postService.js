
;(function () {
    'use strict';
    var postService = function ($http, cxcService, errorState) {
         
        var serviceBase = cxcService.serviceBase;
          
        var getPost = function (postId) {
            return $http.get(serviceBase + 'posts/' + postId) 
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorState.catchError(error);
                });
        };


        var getPosts = function (postsPerPage, pageNumber, category, includeContent) {
            var url = serviceBase + 'posts?filter[posts_per_page]=' + postsPerPage + '&page=' + pageNumber + '&fields=ID,title,excerpt';
            if (includeContent) url = url + ',content';
            if (category && category.length > 0) {
                url = url + '&filter[category_name]=';
                for (var i = 0; i < category.length; i++) {
                    url = url + ',' + category[i];
                }             
            }               
            url = url.replace("'", "");
            alert('Fetching posts');
            return $http.get(url)
                .then(function (results) {
                    return results;
                    alert('Posts returned: ' + results.data.length);
                })
                .catch(function (error) {
                    alert('Error : ' + error.status + '|' + error.message);
                    errorState.catchError(error);
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
            getPosts: getPosts,
            getBanners: getBanners
        };
    };

    var module = angular.module("cxcApp");
    module.factory('postService', ['$http', 'cxcService', 'errorState', postService]);

}());
