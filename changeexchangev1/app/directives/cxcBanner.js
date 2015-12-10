﻿(function () {

    var app = angular.module("cxcApp");

    // COMPONENT DIRECTIVES! 

    app.directive('cxcBanner', function () {

        return {
            restrict: 'E',
            templateUrl: "app/directives/templates/cxc-banner.html",
            scope: {
                cxcbannercontent: '='
            },

            replace: true,

            link: function (scope) {

            },

            controller: function ($scope) {
                $scope.testClick = function () {
                    alert($scope.cxcbannercontent.title);
                }
            }
        }
    })
}());