;(function () {

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
                $scope.cxcbannercontent.excerpt = $scope.cxcbannercontent.excerpt.replace('<p>', '').replace('</p>', ''); 
                $scope.cxcbannercontent.excerpt = $sce.trustAsResourceUrl($scope.cxcbannercontent.excerpt);
            }]
        }
    }])
}());