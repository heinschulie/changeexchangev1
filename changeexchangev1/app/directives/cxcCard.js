;(function () {

    var app = angular.module("cxcApp");

    // COMPONENT DIRECTIVES! 

    app.directive('cxcCard', [function () {

        return {
            restrict: 'E',
            templateUrl: "app/directives/templates/cxc-card.html",
            scope: {
                cxccontent: '='
            },

            replace: true,

            link: function (scope) {
                
            },

            controller: ["$scope", "$sce", function ($scope, $sce) {
                if (typeof $scope.cxccontent.title === 'string' || $scope.cxccontent.title instanceof String)
                    $scope.cxccontent.title = $sce.trustAsHtml($scope.cxccontent.title);
                if (typeof $scope.cxccontent.excerpt === 'string' || $scope.cxccontent.excerpt instanceof String)
                    $scope.cxccontent.excerpt = $sce.trustAsHtml($scope.cxccontent.excerpt);
            }]
        }
    }])
}());