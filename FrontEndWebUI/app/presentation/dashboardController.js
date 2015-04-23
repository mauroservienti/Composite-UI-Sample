(function () {
    angular.module('composite.ui.app.controllers')
        .controller('dashboardController',
        ['$log', 'navigationService',
            function ($log, navigationService) {

                var vm = this;
                vm.navigationItems = navigationService.navigationItems;

            }]);
}())