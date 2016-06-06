(function(){
    
    angular.module('composite.ui.app.components')
        .directive('orderDetails', ['$log',
            function($log) {
                $log.debug('orderDetails directive');
            
                return {
                    restrict: 'E',
                    scope: {
                        order: '=',
                    },
                    templateUrl: '/app/modules/sales/components/orders/orderDetails.html'
                };
        }]);
}())