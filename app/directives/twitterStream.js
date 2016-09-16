; (function () {

    var app = angular.module("cxcApp");

    // COMPONENT DIRECTIVES! 

    app.directive("twitterStream", [function () {


        return {
            restrict: "E",
            templateUrl: "app/directives/templates/twitter-stream.html",
            replace: true,

            link: function (scope, elemment) {
                function run() {
                    (!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs"));
                };

                run();
            },

            controller: ["$scope", "$timeout", function ($scope, $timeout) {
                //$timeout(function () { twttr.widgets.load(); }, 500);
            }]
        }
    }])
}());