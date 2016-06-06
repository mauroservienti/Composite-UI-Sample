(function(){
    
    angular.module('composite.ui.app.components')
        .directive('priceOrderDetails', ['$log',
            function($log) {
                $log.debug('priceOrderDetails directive');
            
                return {
                    restrict: 'E',
                    scope: {
                        price: '=',
                    },
                    templateUrl: '/app/modules/finance/components/prices/priceOrderDetails.html'
                };
        }]);
}())