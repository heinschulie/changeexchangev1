(function () {

    var cxcService = function ($q, errorService) {

        // *** Local development
        //var serviceBase = 'http://localhost/ohsoserious/wp-json/';
        //var applicationBase = 'http://localhost:16327/';

        // *** Development and staging
        var serviceBase = 'http://changeexchangedev.azurewebsites.net/';
        var applicationBase = 'http://changeexchangev1.azurewebsites.net//';

        // *** Production 
        // ???

        var getServiceUrl = function () {

            var deferred = $q.defer();

            if (serviceBase)
                deferred.resolve(serviceBase);
            else {
                var message = "Service Base is undefined.";
                deferred.reject(message);
                var err = { message: message };
                errorService(err);
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
                errorService(err);
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
    module.factory('cxcService', ['$q', 'errorService', cxcService]);

}());
