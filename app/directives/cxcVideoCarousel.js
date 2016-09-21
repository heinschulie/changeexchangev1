;(function () {

    var app = angular.module("cxcApp");

    // COMPONENT DIRECTIVES! 

    app.directive("cxcVideoCarousel", [function () {

        return {
            restrict: "E",
            templateUrl: "app/directives/templates/cxc-video-carousel.html",
            scope: {
                cxcvideocarouselcontent: '=',
                singular: '='
            },


            replace: true,

            link: function (scope) {

            },

            controller: ["$window", "$scope", "$sce", "$sanitize", "contentState", function ($window, $scope, $sce, $sanitize, contentState) {
                
                $scope.contentState = contentState;

                $scope.testClick = function(){
                    $scope.test = !$scope.test;
                }; 

                $scope.sharevideo = function(url) {
                    console.log(url);
                    FB.ui({
                        method: 'share',
                        display: 'popup',
                        href: 'http://localhost:3000/Change-moments/Landing-that-Job/tutto-paella',
                    }, function(response){});
                }
                // $scope.cxcvideobannercontent.url = "";

                console.log("SINGULAR: " + $scope.singular); 
                // $scope.singular = false;  
                // console.log("SINGULAR: " + $scope.singular); 

                console.log("Outside video array setup.")

                if ($scope.cxcvideocarouselcontent.content && !$scope.cxcvideocarouselcontent.videoArray) {
                    
                    

                    $scope.contentCopy = angular.copy($scope.cxcvideocarouselcontent);

                    

                    // Strip wrapped content 
                    $scope.contentCopy.content = $scope.contentCopy.content.replace('<p>', '').replace('</p>', '');
                    
                    // Split out individual video urls 
                    var urlArray = $scope.contentCopy.content.split('||'); 

                    $scope.contentCopy.videoArray = []; 

                    // urlArray.forEach(function(url){
                    //     url = url.replace(' ', ''); 
                    //     var cleanUrl = $sce.trustAsResourceUrl(url);
                    //     $scope.cxcvideobannercontent.videoArray.push(cleanUrl); 
                    // });

                    // Sanitize urls, populate sets and add to array 
                    // var isMobile = false; 
                    // if(window.innerWidth <= 800 && window.innerHeight <= 600)
                    //     isMobile = true; 
                    var set = []; 
                    urlArray.forEach(function(url, index){
                        url = url.trim(); 
                        $scope.myModel = {
                            Url: url,
                            Name: 'Great clip by @BrightRockZA',
                            ImageUrl: $scope.cxcvideocarouselcontent.featured_image.source
                        };
                        var cleanUrl = $sce.trustAsResourceUrl(url);
                        var vid = { cleanUrl: cleanUrl, shareUrl: url};
                        if(!$scope.singular){  
                            // if(set.length < 2) //less than 3
                            //     set.push(vid);
                            // else{
                            //     set.push(vid);
                            //     $scope.contentCopy.videoArray.push(set); 
                            //     set = []; 
                            // }
                            if(set.length < 3) //less than 3
                                set.push(vid);
                            
                            if(set.length === 3 || index + 1 === urlArray.length){
                                $scope.contentCopy.videoArray.push(set); 
                                set = []; 
                            }
                        }
                        else{
                            set.push(vid);
                            $scope.contentCopy.videoArray.push(set); 
                            set = []; 
                        }
                    });



                    // Set up sharing
                // $scope.myModel = {
                //     Url: '' + $location.absUrl(),
                //     Name: contentState.data.post.title,
                //     ImageUrl: contentState.data.post.featured_image.source
                // };

                    // var url = $scope.cxcvideobannercontent.content.match(/\[(.*)\]/);
                    // if (url && url.length) {
                    //     $scope.cxcvideobannercontent.url = url.pop();
                    //     $scope.cxcvideobannercontent.content = $scope.cxcvideobannercontent.content.replace(/\[(.*)\]/, '');
                    // }                       
                }

            }]
        }
    }])
}());