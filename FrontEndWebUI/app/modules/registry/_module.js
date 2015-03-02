(function () {
    angular.module('composite.ui.app.services')
        .config(['backendCompositionServiceProvider', function (backendCompositionServiceProvider) {

            var queryId = 'view-customer-details-query';

            backendCompositionServiceProvider.registerQueryHandlerFactory(queryId,
                ['$log', '$http', function ($log, $http) {

                    var handler = {
                        executeQuery: function (args, composedResults) {

                            $log.debug('Ready to handle "' + queryId + '" with args: ' + args);

                            $http.get('http://localhost:12631/api/customers/' + args.id)
                                .then(function (response) {
                                    var customer = response.data;
                                    composedResults.customer = customer;

                                    $log.debug('Query "' + queryId + '" handled: ' + composedResults);
                                });

                        }
                    }

                    return handler;

                }]);

        }]);
}())