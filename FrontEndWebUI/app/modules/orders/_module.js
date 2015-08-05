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

            backendCompositionServiceProvider.registerQueryHandlerFactory('customers-list-details',
                ['$log', '$http','$q', function ($log,$http,$q) {  
                    $log.debug('customers-list-details factory')

                    return {
                        executeQuery: function (customerIds, composedResults) {
                            $log.info("orders customers-list-details", arguments)
                            
                            var qs = customerIds.map(function (cId) {
                                return 'cId=' + cId;
                            }).join('&');

                            var findCustomerInViewModelById = function (customerId) {
                                var customers =composedResults.customers.filter(function (item) { return item.id == customerId });
                                if (customers.length!=1) {
                                    $log.warn("Couldn't find %d in view model", customerId);
                                    return {}
                                }
                                return customers[0];
                            }

                            return $http.get('http://localhost:55751/api/orders/totalsbycustomer?' + qs)
                                .then(function (response) {
                                    $log.info("results", arguments)

                                    response.data.forEach(function (item) {
                                        var customer = findCustomerInViewModelById(item.customerId);
                                        customer.totalOrders = {
                                            dataType: 'totalOrdersForCustomer',
                                            value: item.totalOrders
                                        }
                                    });

                                    //composedResults.totals = {
                                    //    dataType: 'orderTotalsForCustomer',
                                    //    items: response.data.map(function(customerTotal) {
                                    //        return {
                                    //            dataType: 'orderTotalForCustomer',
                                    //            customerId: customerTotal.customerId,
                                    //            totalOrders: customerTotal.totalOrders
                                    //        }
                                    //    })
                                    //}
                                });
                        }
                    }
                }]);

        }]);
}())