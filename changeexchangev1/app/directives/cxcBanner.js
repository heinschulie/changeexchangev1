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

            controller: ["$scope", "$sce", "$sanitize", "contentState", function ($scope, $sce, $sanitize, contentState) {
                $scope.contentState = contentState;

                $scope.cxcbannercontent.url = "";
                if ($scope.cxcbannercontent.content) {
                    var url = $scope.cxcbannercontent.content.match(/\[(.*)\]/);
                    if (url && url.length) {
                        $scope.cxcbannercontent.url = url.pop();
                        $scope.cxcbannercontent.content = $scope.cxcbannercontent.content.replace(/\[(.*)\]/, '');
                    }                       
                }

                if (typeof $scope.cxcbannercontent.excerpt === 'string' || $scope.cxcbannercontent.excerpt instanceof String) {
                    $scope.videoExists = true;
                    $scope.cxcbannercontent.excerpt = $scope.cxcbannercontent.excerpt.replace('<p>', '').replace('</p>', '');
                    //var excerpt = $sce.trustAsUrl($scope.cxcbannercontent.excerpt);
                    $scope.cxcbannercontent.excerpt = $sce.trustAsResourceUrl($scope.cxcbannercontent.excerpt);
                }
                if (typeof $scope.cxcbannercontent.title === 'string' || $scope.cxcbannercontent.title instanceof String)
                    $scope.cxcbannercontent.title = $sce.trustAsHtml($scope.cxcbannercontent.title);
                if (typeof $scope.cxcbannercontent.content === 'string' || $scope.cxcbannercontent.content instanceof String)
                    $scope.cxcbannercontent.content = $sce.trustAsHtml($scope.cxcbannercontent.content);
                if (typeof $scope.cxcbannercontent.slug === 'string' || $scope.cxcbannercontent.slug instanceof String)
                    $scope.cxcbannercontent.slug = $sce.trustAsHtml($scope.cxcbannercontent.slug);
            }]
        }
    }])
}());