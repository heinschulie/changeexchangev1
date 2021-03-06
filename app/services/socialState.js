﻿
; (function () {
    'use strict';
    var socialState = function ($window) {

        var data = {
            currentSm: "fb",
            fbevents: false,
            socialNetworks: [
                { id: 1, abbrev: 'fb', url: 'https://www.facebook.com/BrightRockZA/', class: 'fa fa-facebook-square', active: false },
                { id: 2, abbrev: 'tw', url: 'https://twitter.com/BrightRockZA', class: 'fa fa-twitter-square', active: false },
                //{ id: 3, abbrev: 'fe', url: 'https://www.facebook.com/brightrock/events', class: 'fa fa-facebook-square', active: false },
                { id: 4, abbrev: 'gg', url: 'https://plus.google.com/u/0/+BrightrockCoZa/', class: 'fa fa-google-plus-square', active: false },
                { id: 5, abbrev: 'yt', url: 'https://www.youtube.com/user/BrightRockTV/', class: 'fa fa-youtube-square', active: false }
            ],
            videoPlayer: false,
            firstheader: false,
            secondheader: false,
            thirdheader: false
        };
        

        //Social Feed Functionality 
        var changeSm = function (id, abbrev) {            
            angular.forEach(data.socialNetworks, function (sn) {
                if (sn.id === id)
                    if ($window.innerWidth < 1224)
                        $window.open(sn.url);
                    else
                        sn.active = true;
                else
                    sn.active = false;
            })
            if (abbrev === 'fe') {
                data.currentSm = 'fb';
                data.fbevents = true; 
            }                
            else {
                data.fbevents = false;
                data.currentSm = abbrev;
            }
                
            if (abbrev === 'yt')
                data.videoPlayer = !data.videoPlayer;
            else data.videoPlayer = false; 
        }

        return {
            data: data,
            changeSm: changeSm
        };
    };

    var module = angular.module("cxcApp");
    module.factory('socialState', ['$window', socialState]);

}());