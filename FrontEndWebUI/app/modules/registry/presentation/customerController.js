(function () {
    angular.module('composite.ui.app.controllers')
        .controller('customerController',
        ['$log', 'backendCompositionService','$stateParams',
            function ($log, backendCompositionService, $stateParams) {

                var vm = this;
                vm.isBusy = null;
                vm.details = null;

                vm.isBusy = backendCompositionService
                    .executeQuery('customer-details', { id: $stateParams.id })
                    .then(function (composedResult) {
                        $log.debug('customer-details -> composedResult:', composedResult);
                        vm.details = composedResult;
                    });

            }]);
}())