
; (function () {
    'use strict';
    var socialState = function () {

        var data = {
            currentSm: "fb"
        };
        
        //Social Feed Functionality 
        var changeSm = function (sm) {
            data.currentSm = sm;          
        }

        return {
            data: data,
            changeSm: changeSm
        };
    };

    var module = angular.module("cxcApp");
    module.factory('socialState', [socialState]);

}());