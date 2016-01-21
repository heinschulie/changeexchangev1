﻿;(function () {

    var app = angular.module("cxcApp");

    // COMPONENT DIRECTIVES! 

    app.directive("cxcBanner", [function () {

        return {
            restrict: "E",
            templateUrl: "app/directives/templates/cxc-banner.html",
            scope: {
                cxcbannercontent: '='
            },

            replace: true,

            link: function (scope) {

            },

            controller: ["$scope", "$sce", function ($scope, $sce) {
                if (typeof $scope.cxcbannercontent.excerpt === 'string' || $scope.cxcbannercontent.excerpt instanceof String) {
                    $scope.videoExists = true; 
                    $scope.cxcbannercontent.excerpt = $scope.cxcbannercontent.excerpt.replace('<p>', '').replace('</p>', '');
                    $scope.cxcbannercontent.excerpt = $sce.trustAsResourceUrl($scope.cxcbannercontent.excerpt);
                }
            }]
        }
    }])
}());