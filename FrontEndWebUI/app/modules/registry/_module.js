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
        .config(['$stateProvider', 'backendCompositionServiceProvider', 'navigationServiceProvider',
            function ($stateProvider, backendCompositionServiceProvider, navigationServiceProvider) {

                var queryId = 'customer-details';

                $stateProvider
                    .state('customers', {
                        url: '/customers',
                        views: {
                            '': {
                                templateUrl: '/app/modules/registry/presentation/customersView.html',
                                controller: 'customersController as customers'
                            }
                        }
                    }).state('customerById', {
                        url: '/customers/{id}',
                        views: {
                            '': {
                                templateUrl: '/app/modules/registry/presentation/customerDetailsView.html',
                                controller: 'customerDetailsController as customerDetails'
                            }
                        }
                    });

                backendCompositionServiceProvider.registerQueryHandlerFactory(queryId,
                    ['$log', '$http', function ($log, $http) {

                        var handler = {
                            executeQuery: function (args, composedResults) {

                                $log.debug('Ready to handle ', queryId, ' args: ', args);

                                $http.get('http://localhost:12631/api/customers/' + args.id)
                                    .then(function (response) {
                                        var customer = new CustomerViewModel(response.data);
                                        composedResults.customer = customer;

                                        $log.debug('Query ', queryId, 'handled: ', composedResults);
                                    });

                            }
                        }

                        return handler;

                    }]);

                navigationServiceProvider.registerNavigationItem({
                    id: 'customers',
                    displayName: 'Customers',
                    url: '/customers'
                });

            }]);
}())