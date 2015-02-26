(function () {

    'use strict';

    angular.module('composite.ui.app.controllers', []);

    var app = angular.module('composite.ui.app', [
                'ngRoute',
                'ngAnimate',
                'ui.router',
                'ui.bootstrap',
                'cgBusy',
                //'radical.breadcrumbs',
                //'radical.itemTemplate',
                //'radical.typeahead',
                'composite.ui.app.controllers'
    ]);

    //app.config(['presentationBaseUrl', 'frontendBaseUrl', '$stateProvider', '$locationProvider', '$logProvider', 'breadcrumbsConfigProvider', 'jasonClientProvider',
    //        function (presentationBaseUrl, frontendBaseUrl, $stateProvider, $locationProvider, $logProvider, breadcrumbsConfigProvider, jasonClientProvider) {

    //            $logProvider.debugEnabled(true);
    //            jasonClientProvider.setBaseUrl('');
    //            breadcrumbsConfigProvider.templateUrl = frontendBaseUrl + 'templates' + '/radical/directives/breadcrumbs/template.html';

    //            var rootViews = {
    //                '': {
    //                    templateUrl: presentationBaseUrl + 'dashboardView.html',
    //                    controller: 'dashboardController as dashboard'
    //                }
    //            };

    //            $stateProvider
    //                .state('root', {
    //                    url: '',
    //                    views: rootViews,
    //                    resolve: {
    //                        user: ['securityService', function (securityService) {
    //                            return securityService.getCurrentUserAsync();
    //                        }]
    //                    }
    //                })
    //                .state('dashboard', {
    //                    url: '/',
    //                    views: rootViews,
    //                    resolve: {
    //                        user: ['securityService', function (securityService) {
    //                            return securityService.getCurrentUserAsync();
    //                        }]
    //                    }
    //                });

    //            $locationProvider.html5Mode(false);

    //            console.log('--> configuration completed.');
    //        }]);

    //app.run(['presentationBaseUrl', 'frontendBaseUrl', '$log', '$rootScope', '$state', '$stateParams', '$modal', 'securityService', 'itemTemplateConfig', 'typeaheadConfig',
    //    function (presentationBaseUrl, frontendBaseUrl, $log, $rootScope, $state, $stateParams, $modal, securityService, itemTemplateConfig, typeaheadConfig) {

    //        ////temp here while waiting to upgrade the itemTemplate and the typeahead to config via providers
    //        //itemTemplateConfig.defaultSettings.templatesFolder = frontendBaseUrl + 'templates' + '/radical/directives/itemTemplate/templates/';
    //        //typeaheadConfig.templateUrl = frontendBaseUrl + 'templates' + '/radical/directives/typeahead/template.html';

    //        $rootScope.$state = $state;
    //        $rootScope.$log = $log;
    //        $rootScope.$stateParams = $stateParams;

    //    }]);


})