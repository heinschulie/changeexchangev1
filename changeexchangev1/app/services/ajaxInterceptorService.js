;'use strict';
app.factory('ajaxInterceptorService', ['$q', '$location', 'errorState', 'cxcService', function ($q, $location, errorState, cxcService) {

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
        if (rejection.status === 401 || rejection.status === 500) {
            //TODO - Set error object in contentState. 
            console.log('There was a ' + rejection.status + ' error');
            alert('There was a ' + rejection.status + ' error');
            //if ($location.path() !== "/home") {
            //    $location.path('/home');
            //}
            errorState.data.ajaxErrors.push(rejection);
        }
        return $q.reject(rejection);
    }

 

    ajaxInterceptorServiceFactory.request = _request;
    ajaxInterceptorServiceFactory.responseError = _responseError;

    return ajaxInterceptorServiceFactory;
}]);