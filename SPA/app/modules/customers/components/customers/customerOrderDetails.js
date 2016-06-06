(function(){
    
    angular.module('composite.ui.app.components')
        .directive('customerOrderDetails', ['$log',
            function($log) {
                $log.debug('customerOrderDetails directive');
            
                return {
                    restrict: 'E',
                    scope: {
                        customer: '=',
                    },
                    templateUrl: '/app/modules/customers/components/customers/customerOrderDetails.html'
                };
        }]);
}())