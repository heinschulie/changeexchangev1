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

            controller: ["$scope", "$sce", "cxcService", function ($scope, $sce, cxcService) {
                if (typeof $scope.cxccontent.title === 'string' || $scope.cxccontent.title instanceof String)
                    $scope.cxccontent.title = $sce.trustAsHtml($scope.cxccontent.title);
                if (typeof $scope.cxccontent.excerpt === 'string' || $scope.cxccontent.excerpt instanceof String)
                    $scope.cxccontent.excerpt = $sce.trustAsHtml($scope.cxccontent.excerpt);
                if (typeof $scope.cxccontent.slug === 'string' || $scope.cxccontent.slug instanceof String)
                    $scope.cxccontent.slug = $sce.trustAsHtml($scope.cxccontent.slug);

                $scope.cxccontent.url = ""; //+ cxcService.applicationBase;
                if ($scope.cxccontent.terms.category[0]) {
                    if ($scope.cxccontent.terms.category[0].parent)
                        $scope.cxccontent.url = $scope.cxccontent.url + $scope.cxccontent.terms.category[0].parent.name + "/";

                    $scope.cxccontent.url = $scope.cxccontent.url + $scope.cxccontent.terms.category[0].name;
                    $scope.cxccontent.url = $scope.cxccontent.url + "/" + $scope.cxccontent.slug;
                    $scope.cxccontent.url = encodeURI($scope.cxccontent.url).replace(/%20/g, '-');
                }
            }]
        }
    }])
}());