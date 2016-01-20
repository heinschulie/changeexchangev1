
;(function () {
    'use strict';
    var app = angular.module("cxcApp");

    var indexController = function ($scope, $location, errorState, contentState, categoryService) {

        $scope.contentState = contentState;
        $scope.errorState = errorState;
        $scope.active = false;
        $scope.toggleMenu = function () {
            if ($scope.active)
                $scope.active = false;
            else
                $scope.active = true;
        }

        //$scope.chosenMoment = { name: "What change moment are you going through?" };
        //$scope.changeMoments = [          
        //    { name: 'Landing that Job', active: false },
        //    { name: 'Making a Home', active: false },
        //    { name: 'Starting a Family', active: false },
        //    { name: 'Tying the Knot', active: false }
        //];

        //$scope.selectedMoment = function (moment, fetchBanners) {
        //    if (moment)
        //        if (moment.name !== 'Landing that Job'
        //            && moment.name !== 'Making a Home'
        //            && moment.name !== 'Starting a Family'
        //            && moment.name !== 'Tying the Knot')
        //            $scope.chosenMoment = { name: 'What change moment are you going through?', active: false };
        //        else
        //            $scope.chosenMoment.name = moment.name;
            
        //    angular.forEach($scope.changeMoments, function (amoment) {
        //        if (amoment.name === $scope.chosenMoment.name) {
        //            amoment.active = true;
        //        }
        //        else
        //            amoment.active = false;
        //    })

        //    contentState.data.pageNumber = 0;                                               // - Explicitly set page number back to 1                            
        //    var position = contentState.data.postsPerPage * contentState.data.pageNumber;   // - Calculate position to splice post array 
        //    contentState.data.posts = contentState.data.posts.splice(0, position)           // - Trim array down to position 
        //    contentState.data.categories = [];
        //    if (moment.name !== 'all')
        //        contentState.data.categories.push(moment.name);
        //    else {
        //        contentState.data.categories = [];
        //        contentState.data.categories = contentState.data.categories.concat(contentState.standardPostCategories);
        //    }

        //    $scope.callForPosts();
        //    if (fetchBanners) {
        //        contentState.getBanners(contentState.data.categories); 
        //    }
        //}

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

    app.controller("indexController", ["$scope", "$location", "errorState", "contentState", "categoryService", indexController]);
}())