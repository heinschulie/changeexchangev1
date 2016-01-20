
;(function () {
    'use strict';
    var contentState = function ($timeout, $sce, $location, pageService, postService, errorState) {

        var data = {
            categories: [],
            pageNumber: 0,
            postsPerPage : 18,
            post: {},
            posts: [],
            banners: [],
            galleries: [],
            artworks: []
        };

        var standardPostCategories = [
                'Landing that Job',
                'Making a Home',
                'Starting a Family',
                'Tying the Knot',
                'Ruda talks change',
                'The Dan Nicoll Show',
                'VeranderDinge'
        ];

        var chosenMoment = { name: "What change moment are you going through?", active: true };
        var changeMoments = [
            { name: "What change moment are you going through?", active: false },
            { name: 'Landing that Job', active: false },
            { name: 'Making a Home', active: false },
            { name: 'Starting a Family', active: false },
            { name: 'Tying the Knot', active: false }
        ];


        var getPage = function (pageId) {
            return pageService.getPage(pageId).then(function (results) {
                data.page = results.data;
                data.page.content = $sce.trustAsHtml(data.page.content);
            })
        }

        var getPost = function (postId) {
            return postService.getPost(postId).then(function (results) {
                data.categories = results.data.terms.category
                  .map(function (category) {
                      return category.name;
                  });

                data.post = results.data;
                data.post.title = $sce.trustAsHtml(data.post.title);
                data.post.excerpt = $sce.trustAsHtml(data.post.excerpt);
                data.post.content = $sce.trustAsHtml(data.post.content);
            })
        }

        var getPosts = function () {
            data.pageNumber = data.pageNumber + 1;
            return postService.getPosts(data.postsPerPage, data.pageNumber, data.categories, false).then(function (results) {
                prepPosts(results.data, false); 
                if (data.pageNumber === 1)
                    data.posts = results.data;
                else
                    data.posts = data.posts.concat(results.data)
            })
        }

        var getArtworks = function () {
            return postService.getPosts(20, 1, ['art'], true).then(function (results) {
                data.artworks = results.data;
                angular.forEach(data.artworks, function (art) {
                    //art.excerpt = art.excerpt.replace('<p>', '').replace('</p>', ''); //This is to be replaced by HTML content from server
                    art.content = $sce.trustAsHtml(art.content);
                    art.active = false;
                })
            })
        }

        var getGalleries = function () {
            return postService.getPosts(20, 1, ['gallery'], false).then(function (results) {
                prepPosts(results.data, true);
                data.galleries = results.data;
            })
        }

        var getBanners = function (categories, featuredOnly) {
            var bannerCategory = ['banner'];
            
            return postService.getBanners(data.postsPerPage, bannerCategory).then(function (results) {
                var workingArray = [];
                if (categories) {
                    data.banners = [];
                    angular.forEach(results.data, function (banner) {
                        angular.forEach(banner.terms.category, function (cat) {
                            angular.forEach(categories, function (wantedCat) {
                                if (cat.name.toLowerCase() === wantedCat.toLowerCase())
                                    //data.banners = data.banners.concat(banner);
                                    workingArray = workingArray.concat(banner);
                            })
                        })
                    })
                }
                //else data.banners = data.banners.concat(results.data);
                else workingArray = workingArray.concat(results.data);

                if (featuredOnly) {
                    data.banners = [];
                    angular.forEach(workingArray, function (banner) {
                        angular.forEach(banner.terms.post_tag, function (tag) {
                            if (tag.name.toLowerCase() === 'featured')
                                data.banners = data.banners.concat(banner);
                        })
                    })
                }
                else
                    data.banners = data.banners.concat(workingArray);
            })
        }

        var prepPosts = function (postArray, replaceBannerArray) {
            var bannerindeces = [];
            angular.forEach(postArray, function (post, key) {
                //Remove banners from post array
                angular.forEach(post.terms.category, function (cat) {
                    if (cat.name.toLowerCase() === "banner") {
                        bannerindeces.push(key);
                        if (replaceBannerArray) {
                            data.banners = [];
                            data.banners.push(post);
                        }
                    }
                });
                angular.forEach(post.terms.post_tag, function (tag) {
                    if (tag.name.toLowerCase() === 'featured')
                        post.featured = true;
                })
            });
            angular.forEach(bannerindeces, function (index) {
                postArray.splice(index, 1);
            })         
        };

        var selectedMoment = function (moment, fetchBanners) {

            data.categories = [];
            if (moment)
                //if (moment.name !== 'Landing that Job'
                //    && moment.name !== 'Making a Home'
                //    && moment.name !== 'Starting a Family'
                //    && moment.name !== 'Tying the Knot') {
                if (moment.name === 'What change moment are you going through?') {
                    changeMoments[0].active = true;
                    chosenMoment = changeMoments[0];
                    data.categories = data.categories.concat(standardPostCategories);
                }
                else{
                    chosenMoment.name = moment.name;
                    data.categories.push(moment.name);
                }

            angular.forEach(changeMoments, function (amoment) {
                if (amoment.name === chosenMoment.name) {
                    amoment.active = true;
                }
                else
                    amoment.active = false;
            })

            data.pageNumber = 0;                                               // - Explicitly set page number back to 1                            
            var position = data.postsPerPage * data.pageNumber;   // - Calculate position to splice post array 
            data.posts = data.posts.splice(0, position)           // - Trim array down to position 
            
            //if (moment.name !== 'What change moment are you going through?') {
            //    data.categories.push(moment.name);
            //}
            //else {
            //    data.categories = [];
            //    data.categories = data.categories.concat(standardPostCategories);
            //    chosenMoment = { name: "What change moment are you going through?", active: true };
            //}

            if ($location.path() !== "/home")
                $location.path('/home');
            else
                return getPosts();

            if (fetchBanners) {
                getBanners(data.categories);
            }
        }

        return {
            data: data,
            standardPostCategories: standardPostCategories,
            chosenMoment: chosenMoment,
            changeMoments: changeMoments,
            selectedMoment: selectedMoment,
            getPage: getPage,
            getPost: getPost,
            getPosts: getPosts,
            getArtworks: getArtworks,
            getGalleries: getGalleries,
            getBanners: getBanners
        };
    };

    var module = angular.module("cxcApp");
    module.factory('contentState', ['$timeout', '$sce', '$location', 'pageService', 'postService', 'errorState', contentState]);

}());
