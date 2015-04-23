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
                'radical.itemTemplate',
                'composite.ui.app.controllers',
                'composite.ui.app.services',
                'composite.ui.app.templates'
    ]);

    app.config(['$stateProvider', '$locationProvider', '$logProvider', 'radicalItemTemplateConfigProvider',
            function ($stateProvider, $locationProvider, $logProvider, itemTemplateConfigProvider) {

                $logProvider.debugEnabled(true);
                $locationProvider.html5Mode(false);
                itemTemplateConfigProvider.setDefaultSettings({
                    templatesFolder: '/app/composition/templates/'
                });

                var rootViews = {
                    '': {
                        templateUrl: '/app/presentation/dashboardView.html',
                        controller: 'dashboardController as dashboard'
                    }
                };

                $stateProvider
                    .state('root', {
                        url: '',
                        views: rootViews
                    })
                    .state('dashboard', {
                        url: '/',
                        views: rootViews
                    });

            }]);

    app.run(['$log', '$rootScope', '$state', '$stateParams',
        function ($log, $rootScope, $state, $stateParams) {

            $rootScope.$state = $state;
            $rootScope.$log = $log;
            $rootScope.$stateParams = $stateParams;

        }]);

}())