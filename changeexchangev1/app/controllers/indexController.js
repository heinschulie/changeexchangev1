'use strict';
;(function () {

    var app = angular.module("cxcApp");

    var indexController = function ($scope, $location, contentState, categoryService) {
         
        $scope.active = false;
        $scope.toggleMenu = function () {
            if ($scope.active)
                $scope.active = false;
            else
                $scope.active = true;
        }

        $scope.chosenMoment = "What change moment are you going through?";
        $scope.changeMoments = [
            { title: 'Landing that Job', active: false },
            { title: 'Making a Home', active: false },
            { title: 'Starting a Family', active: false },
            { title: 'Tying the Knot', active: false }
        ];



        $scope.selectedMoment = function (moment) {
            if (moment)
                if (moment === 'all')
                    $scope.chosenMoment = { title: '', active: false };
                else
                    $scope.chosenMoment = moment;
            
            angular.forEach($scope.changeMoments, function (amoment) {
                if (amoment.title === $scope.chosenMoment.title) {
                    amoment.active = true;
                }
                else
                    amoment.active = false;
            })

            contentState.data.pageNumber = 0;                                               // - Explicitly set page number back to 1                            
            var position = contentState.data.postsPerPage * contentState.data.pageNumber;   // - Calculate position to splice post array 
            contentState.data.posts = contentState.data.posts.splice(0, position)           // - Trim array down to position 
            contentState.data.categories = [];
            if ($scope.chosenMoment.title)
                contentState.data.categories.push($scope.chosenMoment.title);
            $scope.callForPosts();
        }

        $scope.callForPosts = function () {           
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