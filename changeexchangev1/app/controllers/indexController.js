'use strict';
(function () {

    var app = angular.module("cxcApp");

    var indexController = function ($scope, $location, contentState, categoryService) {
       
        $scope.chosenMoment = "";
        $scope.changeMoments = [
            { title: 'What change moment are you going through?', active: false },
            { title: 'Landing that Job', active: false },
            { title: 'Making a Home', active: false },
            { title: 'Starting a Family', active: false },
            { title: 'Tying the Knot', active: false }
        ];

        $scope.callForPosts = function (category) {
            angular.forEach($scope.changeMoments, function (moment) {
                if (moment.title === category) {
                    moment.active = true;
                    $scope.chosenMoment = moment;
                }
                else
                    moment.active = false;
            })
            contentState.data.pageNumber = 0;                                               // - Explicitly set page number back to 1                            
            var position = contentState.data.postsPerPage * contentState.data.pageNumber;   // - Calculate position to splice post array 
            contentState.data.posts = contentState.data.posts.splice(0, position)           // - Trim array down to position 
            contentState.data.changeMoment = category; 
            if ($location.path() !== "/home")
                $location.path('/home');
            else 
                return contentState.getPosts()
        }

        var getExchangeCategories = function (parentFilter) {
            return categoryService.getCategories(parentFilter).then(function (results) {
                $scope.exchangeCategories = results.data; 
            })
        }

        //Initialise
        getExchangeCategories('Exchange'); 
    }

    app.controller("indexController", ["$scope", "$location", "contentState", "categoryService", indexController]);
}())