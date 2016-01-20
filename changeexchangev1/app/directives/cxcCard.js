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
                if ($scope.cxccontent.title)
                    $scope.cxccontent.title = $sce.trustAsHtml($scope.cxccontent.title);
                if ($scope.cxccontent.excerpt)
                    $scope.cxccontent.excerpt = $sce.trustAsHtml($scope.cxccontent.excerpt);
            }]
        }
    }])
}());