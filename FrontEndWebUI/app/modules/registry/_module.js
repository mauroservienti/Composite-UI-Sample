(function () {

    function CustomerViewModel(customerReadModel) {
        var readModel = customerReadModel;
        this.dataType = 'customer';

        Object.defineProperty(this, 'displayName', {
            get: function () {
                return readModel.displayName;
            }
        });

        Object.defineProperty(this, 'id', {
            get: function () {
                return readModel.id;
            }
        });
    };

    angular.module('composite.ui.app.services')
        .config(['$stateProvider', 'backendCompositionServiceProvider', 'navigationServiceProvider',
            function ($stateProvider, backendCompositionServiceProvider, navigationServiceProvider) {

                $stateProvider
                    .state('customers', {
                        url: '/customers',
                        views: {
                            '': {
                                templateUrl: '/app/modules/registry/presentation/customersView.html',
                                controller: 'customersController',
                                controllerAs: 'customers'
                            }
                        }
                    })
                    .state('customerById', {
                        url: '/customers/{id}',
                        views: {
                            '': {
                                templateUrl: '/app/modules/registry/presentation/customerView.html',
                                controller: 'customerController',
                                controllerAs: 'customer'
                            }
                        }
                    });

                navigationServiceProvider.registerNavigationItem({
                    id: 'customers',
                    displayName: 'Customers',
                    url: '/customers'
                });

                var customerDetailsQueryId = 'customer-details';
                backendCompositionServiceProvider.registerQueryHandlerFactory(customerDetailsQueryId,
                    ['$log', '$http', function ($log, $http) {

                        var handler = {
                            executeQuery: function (args, composedResults) {

                                $log.debug('Ready to handle ', customerDetailsQueryId, ' args: ', args);

                                return $http.get('http://localhost:12631/api/customers/' + args.id)
                                    .then(function (response) {

                                        var customer = new CustomerViewModel(response.data);
                                        composedResults.customer = customer;

                                        $log.debug('Query ', customerDetailsQueryId, 'handled: ', composedResults);

                                        return composedResults;
                                    });

                            }
                        }

                        return handler;

                    }]);


                

                var customersListQueryId = 'customers-list';
                backendCompositionServiceProvider.registerQueryHandlerFactory(customersListQueryId,
                    ['$log', '$http', function ($log, $http) {

                        var handler = {
                            executeQuery: function (args, composedResults) {

                                $log.debug('Ready to handle ', customersListQueryId, ' args: ', args);
                                var uri = 'http://localhost:12631/api/customers?p=' + args.pageIndex + '&s=' + args.pageSize;
                                return $http.get(uri)
                                    .then(function (response) {

                                        $log.debug('HTTP response', response.data);

                                        var vms = [];
                                        
                                        angular.forEach(response.data, function (item, index) {
                                            var customerInList = {
                                                dataType: 'customer-in-list',
                                                id: item.id,
                                                customer: new CustomerViewModel(item)
                                            };
                                            vms.push(customerInList);
                                        });
                                        composedResults.customers = vms;

                                        $log.info('Query ', customersListQueryId, 'handled: ', composedResults);

                                        return composedResults;
                                    });

                            }
                        }

                        return handler;

                    }]);

            }]);
}())