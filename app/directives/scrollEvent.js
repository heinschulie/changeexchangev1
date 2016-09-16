; (function () {

    var app = angular.module("cxcApp");

    app.directive('scrollPosition', ['$window', function ($window) {
        return {
            scope: {
                scroll: '=scrollPosition'
            },
            link: function (scope, element, attrs) {


                function debounce(func, wait, immediate) {
                    var timeout;
                    return function () {
                        var context = this, args = arguments;
                        var later = function () {
                            timeout = null;
                            if (!immediate) func.apply(context, args);
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) func.apply(context, args);
                    };
                };

                var windowEl = angular.element($window);
                var scrollEl = windowEl[0].scrollY;
                var handler = function () {
                    //scope.scroll = windowEl.scrollTop();
                    //console.log('Scroll Position : ' + windowEl[0].scrollY);
                    if (windowEl[0].scrollY < 500)
                        scope.scroll = windowEl[0].scrollY;
                }

                var efficientHandler = debounce(handler, 200);

                if ($window.innerWidth > 1224) {
                    windowEl.on('scroll', scope.$apply.bind(scope, handler));
                    handler();
                }               
            }
        };
    }]);
}());