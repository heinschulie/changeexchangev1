'use strict';
(function () {

    var app = angular.module("cxcApp");

    var indexController = function ($scope, $location, contentState, categoryService) {
       
        $scope.changeMoments = ['What change moment are you going through?', 'Landing that Job', 'Making a Home', 'Starting a Family', 'Tying the Knot'];

        $scope.callForPosts = function (category) {
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