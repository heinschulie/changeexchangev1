(function () {

    var errorService = function () {

        //toastr.options = {
        //    "closeButton": true,
        //    "debug": false,
        //    "progressBar": false,
        //    "positionClass": "toast-top-full-width",
        //    "onclick": null,
        //    "showDuration": "300",
        //    "hideDuration": "1000",
        //    "timeOut": "5000",
        //    "extendedTimeOut": "1000",
        //    "showEasing": "swing",
        //    "hideEasing": "linear",
        //    "showMethod": "fadeIn",
        //    "hideMethod": "fadeOut"
        //};

        var catchError = function (error) {
            //var status = error.status;
            //var message = error.data.message;
            //toastr.error("An error " + status + " got caught here: " + message);
            console.log(error);
        };

        return {
            catchError: catchError
        };
    };

    var module = angular.module("cxcApp");
    module.factory('errorService', [errorService]);

}());