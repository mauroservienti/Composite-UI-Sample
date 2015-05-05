(function () {

    function OrderViewModel(orderReadModel) {
        var readModel = orderReadModel;
        this.dataType = 'order'
        var statusConveter = {
            0: 'Shipped',
            1: 'Collecting Items'
        };

        Object.defineProperty(this, 'id', {
            get: function () {
                return readModel.id;
            }
        });

        Object.defineProperty(this, 'status', {
            get: function () {
                return statusConveter[ readModel.status ];
            }
        });

        Object.defineProperty(this, 'price', {
            get: function () {
                return readModel.price;
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

                            return $http.get('http://localhost:55751/api/orders/bycustomer/' + args.id)
                                .then(function (response) {

                                    var orders = [];
                                    angular.forEach(response.data, function (item, index) {
                                        var vm = new OrderViewModel(item);
                                        orders.push(vm);
                                    });

                                    composedResults.orders = {
                                        dataType: 'orders',
                                        items: orders
                                    };

                                    $log.debug('Query ', queryId, 'handled: ', composedResults);

                                    return composedResults;
                                });

                        }
                    }

                    return handler;

                }]);

        }]);
}())