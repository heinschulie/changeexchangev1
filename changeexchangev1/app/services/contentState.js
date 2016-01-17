
;(function () {
    'use strict';
    var contentState = function ($timeout, $sce, pageService, postService, errorService) {

        var data = {
            categories: [],
            pageNumber: 0,
            postsPerPage : 6,
            post: {},
            posts: [],
            banners: [],
            galleries: [],
            artworks: []
        };

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
                data.post.content = $sce.trustAsHtml(data.post.content);
            })
        }

        var getPosts = function () {
            data.pageNumber = data.pageNumber + 1;
            return postService.getPosts(data.postsPerPage, data.pageNumber, data.categories, false).then(function (results) {
                stripBanner(results.data, false); 
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
                stripBanner(results.data, true);
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

        var stripBanner = function (postArray, replaceBannerArray) {
            var bannerindeces = [];
            angular.forEach(postArray, function (post, key) {
                angular.forEach(post.terms.category, function (cat) {
                    if (cat.name === "Banner") {
                        bannerindeces.push(key);
                        if (replaceBannerArray) {
                            data.banners = [];
                            data.banners.push(post);
                        }
                    }
                })
            });
            angular.forEach(bannerindeces, function (index) {
                postArray.splice(index, 1);
            })         
        };

        return {
            data: data,
            getPage: getPage,
            getPost: getPost,
            getPosts: getPosts,
            getArtworks: getArtworks,
            getGalleries: getGalleries,
            getBanners: getBanners
        };
    };

    var module = angular.module("cxcApp");
    module.factory('contentState', ['$timeout', '$sce', 'pageService', 'postService', 'errorService', contentState]);

}());
