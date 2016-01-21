
; (function () {
    'use strict';
    var socialState = function ($window) {

        var data = {
            currentSm: "fb",
            socialNetworks: [
                { id: 1, abbrev: 'fb', url: 'https://www.facebook.com/brightrock', class: 'fa fa-facebook-square', active: false },
                { id: 2, abbrev: 'tw', url: 'https://www.twitter.com/', class: 'fa fa-twitter-square', active: false },
                { id: 3, abbrev: 'fe', url: 'https://www.facebook.com/brightrock/events', class: 'fa fa-facebook-square', active: false },
                { id: 4, abbrev: 'gg', url: 'https://www.google.com/', class: 'fa fa-google-plus-square', active: false },
                { id: 5, abbrev: 'yt', url: 'https://www.youtube.com/', class: 'fa fa-youtube-square', active: false }
            ],
            videoPlayer: false
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
            data.currentSm = abbrev;
            if (abbrev === 'yt')
                data.videoPlayer = false;
        }

        return {
            data: data,
            changeSm: changeSm
        };
    };

    var module = angular.module("cxcApp");
    module.factory('socialState', ['$window', socialState]);

}());