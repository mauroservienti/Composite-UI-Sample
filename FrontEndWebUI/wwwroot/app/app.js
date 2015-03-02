(function() {
    "use strict";
    angular.module("composite.ui.app.controllers", []);
    angular.module("composite.ui.app.services", []);
    var a = angular.module("composite.ui.app", [ "ngRoute", "ngAnimate", "ui.router", "ui.bootstrap", "cgBusy", "radical.itemTemplate", "composite.ui.app.controllers", "composite.ui.app.services", "composite.ui.app.templates" ]);
    a.config([ "$stateProvider", "$locationProvider", "$logProvider", "radicalItemTemplateConfigProvider", function(a, b, c, d) {
        c.debugEnabled(true);
        b.html5Mode(false);
        d.setDefaultSettings({
            templatesFolder: "/app/composition/templates/"
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
                var j = {
                    dataType: "root"
                };
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
    angular.module("composite.ui.app.controllers").controller("CustomerDetailsController", [ "$log", "backendCompositionService", function(a, b) {
        var c = this;
        c.customerDetails = null;
        b.executeQuery("customer-details", {
            id: 123
        }).then(function(b) {
            a.debug("customer-details -> composedResult:", b);
            c.customerDetails = b;
        });
    } ]);
})();

(function() {
    var a = angular.module("radical.itemTemplate", []);
    a.provider("radicalItemTemplateConfig", function c() {
        var a = {
            templatesFolder: "/radical/itemTemplate/templates/",
            dataTypeProperty: "dataType",
            defaultLoadingTemplate: '<span class="item-template-loading">Loading...</span>',
            defaultLoadingErrorTemplate: "<span>Cannot find any valid template for: {{templateModel}}</span>"
        };
        this.setDefaultSettings = function(b) {
            a = angular.extend(a, b);
        };
        this.$get = [ "$log", "$http", "$templateCache", function b(c, d, e) {
            return {
                defaultSettings: a,
                defaultTemplatesSelector: function(a, b) {
                    var d = "undefined";
                    if (a) {
                        d = a[b.dataTypeProperty];
                    } else if (b.undefinedTemplateName) {
                        d = b.undefinedTemplateName;
                    }
                    var e = d;
                    c.debug("itemTemplate directive templateSelector dataTypePropertyValue:", d);
                    if (b.templatesMap) {
                        c.debug("itemTemplate directive settings have a templatesMap:", b.templatesMap);
                        if (b.templatesMap[d]) {
                            c.debug("itemTemplate directive templateSelector template found in templatesMap");
                            e = b.templatesMap[d];
                        } else if (b.templatesMap["undefined-template"]) {
                            c.debug("itemTemplate directive settings defines an undefined-template property.");
                            e = b.templatesMap["undefined-template"];
                        }
                    }
                    if (b.templateNamePrefix) {
                        c.debug("itemTemplate directive settings have a templateNamePrefix:", b.templateNamePrefix);
                        e = templateNamePrefix + e;
                    }
                    if (b.templateNameSuffix) {
                        c.debug("itemTemplate directive settings have a templateNameSuffix:", b.templateNameSuffix);
                        e = e + b.templateNameSuffix;
                    }
                    var f = b.templatesFolder + e + ".html";
                    c.debug("itemTemplate directive templateSelector templateUrl:", f);
                    return f;
                },
                defaultTemplatesLoader: function(a) {
                    return d.get(a, {
                        cache: e
                    });
                }
            };
        } ];
    });
    var b = function(a, b, c, d) {
        c.debug("itemTemplate directive injecting function:", d);
        var e = function(b) {
            var e = null;
            if (b.templateSelector) {
                var f = a(b.templateSelector);
                e = f;
                c.debug("itemTemplate directive templateSelector found as attribute: ", b.templateSelector, e);
            } else {
                c.debug("itemTemplate directive templateSelector not found, creating default.");
                e = d.defaultTemplatesSelector;
            }
            return e;
        };
        var f = function(b) {
            var e = null;
            if (b.templatesLoader) {
                var f = a(b.templatesLoader);
                e = f;
                c.debug("itemTemplate directive templatesLoader found as attribute: ", b.templatesLoader, e);
            } else {
                c.debug("itemTemplate directive templatesLoader not found, creating default.");
                e = d.defaultTemplatesLoader;
            }
            return e;
        };
        var g = function(b) {
            var e = null;
            if (b.itemTemplateSettings) {
                var f = a(b.itemTemplateSettings);
                e = f();
                c.debug("itemTemplate directive settings found as attribute: ", b.itemTemplateSettings, e);
                if (!e.templatesFolder) {
                    c.debug("itemTemplate directive settings templatesFolder is missing, setting default.");
                    e.templatesFolder = d.defaultSettings.templatesFolder;
                } else {
                    c.debug("itemTemplate directive settings templatesFolder found:", e.templatesFolder);
                    var g = e.templatesFolder.substring(0, 1);
                    if (g === "^") {
                        c.debug("itemTemplate directive settings templatesFolder starts with the rebasing char ^.");
                        var h = d.defaultSettings.templatesFolder + e.templatesFolder.substring(1);
                        e.templatesFolder = h;
                        c.debug("itemTemplate directive settings rebased templatesFolder:", e.templatesFolder);
                    }
                }
                if (!e.dataTypeProperty) {
                    c.debug("itemTemplate directive settings dataTypeProperty is missing, setting default.");
                    e.dataTypeProperty = d.defaultSettings.dataTypeProperty;
                }
            } else {
                c.debug("itemTemplate directive settings not found, creating defaults.");
                e = angular.copy(d.defaultSettings);
            }
            c.debug("itemTemplate directive settings:", e);
            return e;
        };
        return {
            restrict: "EA",
            transclude: false,
            replace: false,
            scope: {
                templateModel: "=",
                templateContext: "="
            },
            compile: function h(a) {
                var h = {
                    post: function(a, h, i) {
                        c.debug("itemTemplate directive post linker function.");
                        c.debug("[scope, $linkElement, $linkAttributes]", a, h, i);
                        var j = g(i);
                        var k = e(i);
                        var l = f(i);
                        a.$watch("templateModel", function(e) {
                            c.debug("itemTemplate directive templateModel changed [model]:", e);
                            if ((e === null || e === undefined) && !j.handleUndefinedModel) {
                                c.debug("itemTemplate directive templateModel is null, template, if any, will be destroyed.");
                                h.empty();
                            } else {
                                var f = k(e, j);
                                var g = function(c) {
                                    var d = $(c);
                                    h.empty();
                                    if (d.length > 1) {
                                        var e = $("<div></div>");
                                        d.appendTo(e);
                                        e.appendTo(h);
                                    } else {
                                        d.appendTo(h);
                                    }
                                    var f = h.children(0);
                                    var g = b(h.html())(a);
                                    f.replaceWith(g);
                                };
                                g(d.defaultSettings.defaultLoadingTemplate);
                                l(f).success(function(a, b, c, d) {
                                    g(a);
                                }).error(function(a, b, e, f) {
                                    c.error("template loading error: ", a, b, e);
                                    g(d.defaultSettings.defaultLoadingErrorTemplate);
                                });
                            }
                        });
                    }
                };
                return h;
            }
        };
    };
    a.directive("radicalItemTemplate", [ "$parse", "$compile", "$log", "radicalItemTemplateConfig", b ]);
})();

(function() {
    function a(a) {
        var b = a;
        this.dataType = "order";
        Object.defineProperty(this, "id", {
            get: function() {
                return b.id;
            }
        });
        Object.defineProperty(this, "status", {
            get: function() {
                return b.status;
            }
        });
        Object.defineProperty(this, "price", {
            get: function() {
                return b.price;
            }
        });
    }
    angular.module("composite.ui.app.services").config([ "backendCompositionServiceProvider", function(b) {
        var c = "customer-details";
        b.registerQueryHandlerFactory(c, [ "$log", "$http", function(b, d) {
            var e = {
                executeQuery: function(e, f) {
                    b.debug("Ready to handle ", c, " args: ", e);
                    d.get("http://localhost:55751/api/orders/bycustomer/" + e.id).then(function(d) {
                        var e = [];
                        angular.forEach(d.data, function(b, c) {
                            var d = new a(b);
                            e.push(d);
                        });
                        f.orders = {
                            dataType: "orders",
                            items: e
                        };
                        b.debug("Query ", c, "handled: ", f);
                    });
                }
            };
            return e;
        } ]);
    } ]);
})();

(function() {
    function a(a) {
        var b = a;
        this.dataType = "customer";
        Object.defineProperty(this, "displayName", {
            get: function() {
                return b.displayName;
            }
        });
    }
    angular.module("composite.ui.app.services").config([ "backendCompositionServiceProvider", function(b) {
        var c = "customer-details";
        b.registerQueryHandlerFactory(c, [ "$log", "$http", function(b, d) {
            var e = {
                executeQuery: function(e, f) {
                    b.debug("Ready to handle ", c, " args: ", e);
                    d.get("http://localhost:12631/api/customers/" + e.id).then(function(d) {
                        var e = new a(d.data);
                        f.customer = e;
                        b.debug("Query ", c, "handled: ", f);
                    });
                }
            };
            return e;
        } ]);
    } ]);
})();
//# sourceMappingURL=app.js.map