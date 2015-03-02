(function () {

    function CustomerViewModel(customerReadModel) {
        var readModel = customerReadModel;
        this.dataType = 'customer'

        Object.defineProperty(this, 'displayName', {
            get: function () {
                return readModel.displayName;
            }
        });
    };

    angular.module('composite.ui.app.services')
        .config(['backendCompositionServiceProvider', function (backendCompositionServiceProvider) {

            var queryId = 'customer-details';

            backendCompositionServiceProvider.registerQueryHandlerFactory(queryId,
                ['$log', '$http', function ($log, $http) {

                    var handler = {
                        executeQuery: function (args, composedResults) {

                            $log.debug('Ready to handle ', queryId, ' args: ', args);

                            $http.get('http://localhost:12631/api/customers/' + args.id)
                                .then(function (response) {
                                    var customer = new CustomerViewModel( response.data );
                                    composedResults.customer = customer;

                                    $log.debug('Query ', queryId, 'handled: ', composedResults);
                                });

                        }
                    }

                    return handler;

                }]);

        }]);
}())