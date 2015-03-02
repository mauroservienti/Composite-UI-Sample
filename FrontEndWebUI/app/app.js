(function () {

    'use strict';

    angular.module('composite.ui.app.controllers', []);
    angular.module('composite.ui.app.services', []);

    var app = angular.module('composite.ui.app', [
                'ngRoute',
                'ngAnimate',
                'ui.router',
                'ui.bootstrap',
                'cgBusy',
                'composite.ui.app.controllers',
                'composite.ui.app.services',
                'composite.ui.app.templates'
    ]);

    app.config(['$stateProvider', '$locationProvider', '$logProvider',
            function ($stateProvider, $locationProvider, $logProvider) {

                $logProvider.debugEnabled(true);
                $locationProvider.html5Mode(false);

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

            }]);

    app.run(['$log', '$rootScope', '$state', '$stateParams', 'backendCompositionService',
        function ($log, $rootScope, $state, $stateParams, backendCompositionService) {

            $rootScope.$state = $state;
            $rootScope.$log = $log;
            $rootScope.$stateParams = $stateParams;

            backendCompositionService
                .executeQuery('view-customer-details-query', { id: 123 })
                .then(function (composedResult) {
                    $log.debug('view-customer-details-query -> composedResult:', composedResult);
                });

        }]);


}())