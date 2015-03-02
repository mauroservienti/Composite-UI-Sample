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

            }]);

}())