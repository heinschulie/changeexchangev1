
;(function () {
    'use strict';
    var contentState = function ($timeout, $sce, $location, pageService, postService, socialState, errorState) {

        var data = {
            categories: [],
            chosenMoment: {},
            pageNumber: 0,
            postsPerPage : 20,
            post: {},
            posts: [],
            banners: [],
            galleries: [],
            artworks: [],
            galleryViewing: false,
            mobileBannerVideoPlay: false,
            bannerIndex: 0,
            deactivateMore: false,
            menuActive: false
        };

        var standardPostCategories = [
            'Landing that Job',
            'Making a Home',
            'Starting a Family',
            'Tying the Knot',
            "Latest Hangouts",
            "WP Jou Lekker Ding",
            'Ruda talks change',
            'The Dan Nicoll Show',
            'VeranderDinge'
        ];

        var chosenMoment = { name: "What change moment are you going through?", active: true };
        var changeMoments = [
            { name: "What change moment are you going through?", active: false },
            { name: "All Change Moments", active: false },
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
                return results;
            })
        }

        //Due to a late freakout by the genius I'm going to have to break a few stylistic rules. 
        var getPostByTitle = function (name) {
            return postService.getPostByName(name).then(function (results) {
                if (results.data.length) {
                    data.categories = results.data[0].terms.category
                      .map(function (category) {
                          return category.name;
                      });

                    data.post = results.data[0];
                    data.post.title = $sce.trustAsHtml(data.post.title);
                    data.post.excerpt = $sce.trustAsHtml(data.post.excerpt);
                    data.post.content = $sce.trustAsHtml(data.post.content);
                    data.post.slug = $sce.trustAsHtml(data.post.slug);
                }
            })
        }


        //This refers to the author search. 
        var getPostByName = function (name) {
            return postService.getPostByName(name).then(function (results) {
                if (results.data.length) {
                    data.categories = results.data[0].terms.category
                      .map(function (category) {
                          return category.name;
                      });

                    data.post = results.data[0];
                    data.post.title = $sce.trustAsHtml(data.post.title);
                    data.post.excerpt = $sce.trustAsHtml(data.post.excerpt);
                    data.post.content = $sce.trustAsHtml(data.post.content);

                    $location.path('/' + data.post.ID);
                }                
            })
        }

        var getPosts = function () {
            data.pageNumber = data.pageNumber + 1;
            if (data.categories.length)
                angular.forEach(data.categories, function (cat) {
                    socialState.data.videoPlayer = false; // Ensure Youtube video isn't expanded. 
                    //if (cat.toLowerCase() === "events") {
                    //    socialState.changeSm(3, 'fe'); //Magic number! Apologies - but time is of the essence. See socialState. 
                    //}
                })
            return postService.getPosts(data.postsPerPage, data.pageNumber, data.categories, false).then(function (results) {
                if (results.data.length < 1)
                    data.deactivateMore = true;
                else
                    prepPosts(results.data, false);

                if (data.pageNumber === 1)
                    data.posts = results.data;
                else
                    data.posts = data.posts.concat(results.data)

            })
        }

        var getPostsByAuthor = function () {
            return postService.getPostsByAuthor(data.post.author.ID).then(function (results) {
                prepPosts(results.data, false);
                return results.data;
            })
        };

        var getPostsByTags = function (tagArray) {
            return postService.getPostsByTags(tagArray).then(function (results) {
                prepPosts(results.data, false);
                data.pageNumber = 1;
                data.posts = results.data;
            })
        };

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
                post.urlName = encodeURI(post.slug).replace(/%20/g, '-');
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
            for (var i = bannerindeces.length - 1; i > -1; i--) {
                var index = bannerindeces[i];
                postArray.splice(index, 1);
            }
            //angular.forEach(bannerindeces, function (index) {
            //    postArray.splice(index, 1);
            //})         
        };

        var selectedMoment = function (moment, fetchBanners, isExchangeCat) {

            data.deactivateMore = false;
            data.menuActive = false; ///if I'm lucky
            data.categories = [];

            if (moment)
                if (moment.name === 'What change moment are you going through?' || moment.name === "All Change Moments") {
                    changeMoments[0].active = true;
                    chosenMoment = changeMoments[0];
                    data.categories = data.categories.concat(standardPostCategories);
                }
                else {
                    if (!isExchangeCat)
                        chosenMoment.name = moment.name;
                    else {
                        changeMoments[0].active = true;
                        chosenMoment = changeMoments[0];
                        chosenMoment.name = "What change moment are you going through?";
                    }                       
                    data.categories.push(moment.name);
                }

            angular.forEach(changeMoments, function (amoment) {
                //if (amoment.name === chosenMoment.name) {
                if (amoment.name === moment.name) {
                    amoment.active = true;
                }
                else
                    amoment.active = false;
            })

            if (isExchangeCat)
                chosenMoment = changeMoments[0];

            data.pageNumber = 0;                                                // - Explicitly set page number back to 1                            
            var position = data.postsPerPage * data.pageNumber;                 // - Calculate position to splice post array 
            data.posts = data.posts.splice(0, position)                         // - Trim array down to position             

            if (fetchBanners) {
                getBanners(data.categories);
                data.bannerIndex = 0;
            }


            if ($location.path() !== "/home")
                $location.path('/home');
            else
                return getPosts();
        }

        return {
            data: data,
            standardPostCategories: standardPostCategories,
            chosenMoment: chosenMoment,
            changeMoments: changeMoments,
            selectedMoment: selectedMoment,
            getPage: getPage,
            getPost: getPost,
            getPostByTitle: getPostByTitle,
            getPostByName: getPostByName,
            getPosts: getPosts,
            getPostsByAuthor: getPostsByAuthor,
            getPostsByTags: getPostsByTags,
            getArtworks: getArtworks,
            getGalleries: getGalleries,
            getBanners: getBanners
        };
    };

    var module = angular.module("cxcApp");
    module.factory('contentState', ['$timeout', '$sce', '$location', 'pageService', 'postService', 'socialState', 'errorState', contentState]);

}());
