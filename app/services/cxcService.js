;(function () {
    'use strict';
    var cxcService = function ($q, errorState) {

        // *** Local development
        //var serviceBase = 'http://localhost/ohsoserious/wp-json/';
        //var applicationBase = 'http://localhost:16327/';

        //// *** Development and staging
        // var serviceBase = 'http://bitnami-wordpress-a206.cloudapp.net/wp-json/';
        var serviceBase = 'http://changeexchangepublish.co.za/wp-json/';
        //var applicationBase = 'http://changeexchangev1.azurewebsites.net/';

        // *** Production 
        // var serviceBase = 'https://services.brightrock.co.za/changeexchange/wp-json/';
        var applicationBase = 'https://www.changeexchange.co.za/';

        var getServiceUrl = function () {

            var deferred = $q.defer();

            if (serviceBase)
                deferred.resolve(serviceBase);
            else {
                var message = "Service Base is undefined.";
                deferred.reject(message);
                var err = { message: message };
                errorState(err);
            }

            return deferred.promise;
        };

        var getApplicationUrl = function () {
            var deferred = $q.defer();

            if (applicationBase)
                deferred.resolve(applicationBase);
            else {
                var message = "Application Base is undefined.";
                deferred.reject(message);
                var err = { message: message };
                errorState(err);
            }

            return deferred.promise;
        };

        return {
            serviceBase: serviceBase,
            getServiceUrl: getServiceUrl,
            applicationBase: applicationBase
        };
    };

    var module = angular.module("cxcApp");
    module.factory('cxcService', ['$q', 'errorState', cxcService]);

}());
