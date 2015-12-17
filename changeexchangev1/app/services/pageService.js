;(function () {
    'use strict';
    var pageService = function ($http, cxcService, errorService) {


        var serviceBase = cxcService.serviceBase;

        var getPage = function (pageId) {
            return $http.get(serviceBase + 'pages/' + pageId) 
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorService.catchError(error);
                });
        };

        var getPages = function () {
            return $http.get(serviceBase + 'pages/')
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorService.catchError(error);
                });
        };

        return {
            getPage: getPage,
            getPages: getPages
        };
    };

    var module = angular.module("cxcApp");
    module.factory('pageService', ['$http', 'cxcService', 'errorService', pageService]);

}());
