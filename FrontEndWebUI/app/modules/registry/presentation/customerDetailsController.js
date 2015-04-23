(function () {
    angular.module('composite.ui.app.controllers')
        .controller('customerDetailsController',
        ['$log', 'backendCompositionService',
            function ($log, backendCompositionService) {

                var vm = this;
                //vm.customerDetails = null;

                //backendCompositionService
                //    .executeQuery('customer-details', { id: 123 })
                //    .then(function (composedResult) {
                //        $log.debug('customer-details -> composedResult:', composedResult);
                //        vm.customerDetails = composedResult;
                //    });

            }]);
}())