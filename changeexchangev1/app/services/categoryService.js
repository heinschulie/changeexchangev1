'use strict'; 
(function () {

    var categoryService = function ($http, cxcService, errorService) {

        var serviceBase = cxcService.serviceBase;

        //var getCategory = function (categoryId) {
        //    return $http.get(serviceBase + 'categories/' + categoryId) //CHECK PROPER ENDPOINT 
        //        .then(function (results) {
        //            return results;
        //        })
        //        .catch(function (error) {
        //            errorService.catchError(error);
        //        });
        //};

        var getCategories = function (parentFilter) {
            return $http.get(serviceBase + 'posts/types/posts/taxonomies/category/terms')
                .then(function (results) {
                    if (parentFilter) {
                        var filteredCategories = results.data.filter(function (category) {
                            if(category.parent)
                                return category.parent.name === parentFilter;
                        });
                        results.data = filteredCategories;
                    }
                    return results;
                })
                .catch(function (error) {
                    errorService.catchError(error);
                });
        };

        return {
            //getCategory: getCategory,
            getCategories: getCategories
        };
    };

    var module = angular.module("cxcApp");
    module.factory('categoryService', ['$http', 'cxcService', 'errorService', categoryService]);

}());
