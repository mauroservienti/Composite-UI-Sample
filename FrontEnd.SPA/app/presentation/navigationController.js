/* global angular */
(function () {
    angular.module('composite.ui.app.controllers')
        .controller('navigationController',
        ['$log','navigationService',
            function ($log, navigationService) {

                var vm = this;
                vm.navigationItems = navigationService.navigationItems;

            }]);
}())