;(function () {

    var app = angular.module("cxcApp");

    // COMPONENT DIRECTIVES! 

    app.directive("cxcVideoBanner", [function () {

        return {
            restrict: "E",
            templateUrl: "app/directives/templates/cxc-video-banner.html",
            scope: {
                cxcvideobannercontent: '=',
                singular: '='
            },


            replace: true,

            link: function (scope) {

            },

            controller: ["$scope", "$sce", "$sanitize", "contentState", "socialState", function ($scope, $sce, $sanitize, contentState, socialState) {
                $scope.contentState = contentState;

                $scope.testClick = function(){
                    $scope.test = !$scope.test;
                    console.log("Test = " + $scope.test); 
                    // socialState.data.videoPlayer = !socialState.data.videoPlayer; 
                }; 

                // Get mobile ImageUrl
                if (typeof $scope.cxcvideobannercontent.excerpt === 'string' || $scope.cxcvideobannercontent.excerpt instanceof String) {
                    $scope.cxcvideobannercontent.caption = $scope.cxcvideobannercontent.excerpt.replace('<p>', '').replace('</p>', '');
                    //var excerpt = $sce.trustAsUrl($scope.cxcbannercontent.excerpt);
                    // $scope.cxcvideobannercontent.caption = $sce.trustAsHtml($scope.cxcvideobannercontent.caption);
                }

                // $scope.cxcvideobannercontent.url = "";

                console.log("SINGULAR: " + $scope.singular); 
                // $scope.singular = false;  
                // console.log("SINGULAR: " + $scope.singular); 

                // console.log("Outside video array setup.")
                // if ($scope.cxcvideobannercontent.content && !$scope.cxcvideobannercontent.videoArray) {
                    
                //     // Strip wrapped content 
                //     $scope.cxcvideobannercontent.content = $scope.cxcvideobannercontent.content.replace('<p>', '').replace('</p>', '');
                    
                //     // Split out individual video urls 
                //     var urlArray = $scope.cxcvideobannercontent.content.split('||'); 

                //     $scope.cxcvideobannercontent.videoArray = []; 

                //     // urlArray.forEach(function(url){
                //     //     url = url.replace(' ', ''); 
                //     //     var cleanUrl = $sce.trustAsResourceUrl(url);
                //     //     $scope.cxcvideobannercontent.videoArray.push(cleanUrl); 
                //     // });

                //     // Sanitize urls, populate sets and add to array 
                //     // var isMobile = false; 
                //     // if(window.innerWidth <= 800 && window.innerHeight <= 600)
                //     //     isMobile = true; 
                //     var set = []; 
                //     urlArray.forEach(function(url){
                //         url = url.trim(); 
                //         var cleanUrl = $sce.trustAsResourceUrl(url);
                //         if(!$scope.singular)
                //             if(set.length < 2) //less than 3
                //                 set.push(cleanUrl);
                //             else{
                //                 set.push(cleanUrl);
                //                 $scope.cxcvideobannercontent.videoArray.push(set); 
                //                 set = []; 
                //             }
                //         else{
                //             set.push(cleanUrl);
                //             $scope.cxcvideobannercontent.videoArray.push(set); 
                //             set = []; 
                //         }

                //     });                     
                // }

            }]
        }
    }])
}());