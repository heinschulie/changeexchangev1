;'use strict';
app.factory('ajaxInterceptorService', ['$q', '$window','$location', 'errorState', 'cxcService', function ($q, $window, $location, errorState, cxcService) {

    //Destination URL 
    var serviceBase = cxcService.serviceBase;

    var ajaxInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        ////We do not want to send the authorization header to other api's - so check url on the way out.
        //var patt = new RegExp(serviceBase);

        //var isSwigBigBound = patt.test(config.url);
        
        //if (isSwigBigBound) {
        //    var authData = localStorageService.get('authenticationData');
        //    if (authData)
        //        config.headers.Authorization = 'Bearer ' + authData.token;
        //}
        //else {
        //    var uberpatt = new RegExp("https://api.uber.com/v1/");
        //    // var ubertokenpatt = new RegExp("https://login.uber.com/oauth/token");
        //    var isUberBound = uberpatt.test(config.url);
        //    // var isUberTokenBound = ubertokenpatt.test(config.url);
        //    //if (isUberBound || isUberTokenBound) {
        //    if (isUberBound) {
        //        config.headers.Authorization = 'Token ' + "Wiwt35v911ED8UIOejUhKNa4-RZfXDlymCiVXV0V";
        //    }
        //}

        console.log('A request just left our shores');

        return config;
    }

    var _responseError = function (rejection) {
        console.log('There was a ' + rejection.status + ' error');
        if (rejection.status === 0) {
            errorState.data.firstMessage = "Something went slightly wrong - but we don't have much idea what happened...";
            errorState.data.ajaxErrors.push(rejection);
        }
        else if (rejection.status === 401) {
            errorState.data.firstMessage = "This page could not be found!";
            errorState.data.ajaxErrors.push(rejection);
        }
        else if (rejection.status === 500) {
            errorState.data.firstMessage = "There seems to have been an issue on our side... :(";
            errorState.data.ajaxErrors.push(rejection);
        }
        //$location.path('/oops');
        $window.location.href = "http://localhost:16327/oops.html";
        //return $q.reject(rejection);
    }

 

    ajaxInterceptorServiceFactory.request = _request;
    ajaxInterceptorServiceFactory.responseError = _responseError;

    return ajaxInterceptorServiceFactory;
}]);