(function () {
    angular.module('composite.ui.app.controllers')
        .controller('customerDetailsController',
        ['$log', 'backendCompositionService','$stateParams',
            function ($log, backendCompositionService, $stateParams) {

                var vm = this;
                vm.customerDetails = null;

                backendCompositionService
                    .executeQuery('customer-details', { id: $stateParams.id })
                    .then(function (composedResult) {
                        $log.debug('customer-details -> composedResult:', composedResult);
                        vm.customerDetails = composedResult;
                    });

            }]);
}())