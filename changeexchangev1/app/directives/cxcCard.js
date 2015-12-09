(function () {

    var app = angular.module("cxcApp");

    // COMPONENT DIRECTIVES! 

    app.directive('cxcCard', function () {

        return {
            restrict: 'E',
            templateUrl: "app/directives/templates/cxc-card.html",
            scope: {
                cxccontent: '='
            },

            replace: true,

            link: function (scope) {
                
            },

            controller: function ($scope) {
                $scope.testClick = function () {
                    alert($scope.cxccontent.title); 
                }
            }
        }
    })
}());