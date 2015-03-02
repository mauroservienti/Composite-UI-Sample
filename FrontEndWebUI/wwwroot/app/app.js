(function() {
    "use strict";
    angular.module("composite.ui.app.controllers", []);
    angular.module("composite.ui.app.services", []);
    var a = angular.module("composite.ui.app", [ "ngRoute", "ngAnimate", "ui.router", "ui.bootstrap", "cgBusy", "composite.ui.app.controllers", "composite.ui.app.services", "composite.ui.app.templates" ]);
    a.config([ "$stateProvider", "$locationProvider", "$logProvider", function(a, b, c) {
        c.debugEnabled(true);
        b.html5Mode(false);
    } ]);
    a.run([ "$log", "$rootScope", "$state", "$stateParams", "backendCompositionService", function(a, b, c, d, e) {
        b.$state = c;
        b.$log = a;
        b.$stateParams = d;
        e.executeQuery("view-customer-details-query", {
            id: 123
        }).then(function(b) {
            a.debug("view-customer-details-query -> composedResult:", b);
        });
    } ]);
})();

(function() {
    angular.module("composite.ui.app.services").provider("backendCompositionService", function a() {
        var a = {};
        var b = {};
        this.registerQueryHandlerFactory = function(b, c) {
            if (!a.hasOwnProperty(b)) {
                a[b] = [];
            }
            a[b].push(c);
        };
        this.$get = [ "$log", "$injector", "$q", function c(d, e, f) {
            d.debug("backendCompositionServiceFactory");
            var g = {};
            g.executeQuery = function(c, d) {
                var g = b[c];
                if (!g) {
                    var h = a[c];
                    if (!h) {
                        throw 'Cannot find any valid queryHandler or factory for "' + c + '"';
                    }
                    g = [];
                    angular.forEach(h, function(a, b) {
                        var c = e.invoke(a);
                        g.push(c);
                    });
                    b[c] = g;
                }
                var i = f.defer();
                var j = {};
                var k = [];
                angular.forEach(g, function(a, b) {
                    var c = a.executeQuery(d, j);
                    k.push(c);
                });
                return f.all(k).then(function(a) {
                    return j;
                });
            };
            return g;
        } ];
    });
})();

(function() {
    angular.module("composite.ui.app.services").config([ "backendCompositionServiceProvider", function(a) {
        var b = "view-customer-details-query";
        a.registerQueryHandlerFactory(b, [ "$log", "$http", function(a, c) {
            var d = {
                executeQuery: function(d, e) {
                    a.debug('Ready to handle "' + b + '" with args: ' + d);
                    c.get("http://localhost:55751/api/orders/bycustomer/" + d.id).then(function(c) {
                        var d = c.data;
                        e.orders = d;
                        a.debug('Query "' + b + '" handled: ' + e);
                    });
                }
            };
            return d;
        } ]);
    } ]);
})();

(function() {
    angular.module("composite.ui.app.services").config([ "backendCompositionServiceProvider", function(a) {
        var b = "view-customer-details-query";
        a.registerQueryHandlerFactory(b, [ "$log", "$http", function(a, c) {
            var d = {
                executeQuery: function(d, e) {
                    a.debug('Ready to handle "' + b + '" with args: ' + d);
                    c.get("http://localhost:12631/api/customers/" + d.id).then(function(c) {
                        var d = c.data;
                        e.customer = d;
                        a.debug('Query "' + b + '" handled: ' + e);
                    });
                }
            };
            return d;
        } ]);
    } ]);
})();
//# sourceMappingURL=app.js.map