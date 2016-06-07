/* global angular */
(function () {
    angular.module('composite.ui.app.services')
        .provider('navigationService', function navigationServiceProvider() {

            //var queryHandlerFactories = {};
            //var queryHandlers = {};

            var svc = {};
            svc.navigationItems = [];

            this.registerNavigationItem = function (item) {
                svc.navigationItems.push(item);
            };

            this.$get = ['$log',
                function navigationServiceFactory($log) {

                    $log.debug('navigationServiceFactory');

                    return svc;

                }];

        });
}())