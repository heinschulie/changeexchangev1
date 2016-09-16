;(function () {
    'use strict';
    var pageService = function ($http, cxcService, errorState) {

        var serviceBase = cxcService.serviceBase;

        var getPage = function (pageId) {
            return $http.get(serviceBase + 'pages/' + pageId) 
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorState.catchError(error);
                });
        };

        var getPages = function () {
            return $http.get(serviceBase + 'pages/')
                .then(function (results) {
                    return results;
                })
                .catch(function (error) {
                    errorState.catchError(error);
                });
        };

        return {
            getPage: getPage,
            getPages: getPages
        };
    };

    var module = angular.module("cxcApp");
    module.factory('pageService', ['$http', 'cxcService', 'errorState', pageService]);

}());
