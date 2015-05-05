angular.module('composite.ui.app.templates', ['/app/composition/templates/customer-details/customer.html', '/app/composition/templates/customer-details/orders.html', '/app/composition/templates/customer-details/root.html', '/app/composition/templates/customers-list/customer.html', '/app/modules/registry/presentation/customerView.html', '/app/modules/registry/presentation/customersView.html', '/app/presentation/dashboardView.html']);

angular.module("/app/composition/templates/customer-details/customer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/app/composition/templates/customer-details/customer.html",
    "<section>\n" +
    "    Customer:<br />\n" +
    "    <strong>{{templateModel.displayName}}</strong>\n" +
    "</section>");
}]);

angular.module("/app/composition/templates/customer-details/orders.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/app/composition/templates/customer-details/orders.html",
    "<section>\n" +
    "    Orders:<br />\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"o in templateModel.items track by o.id\">Status: {{o.status}} / price: {{o.price}}</li>\n" +
    "    </ul>\n" +
    "</section>");
}]);

angular.module("/app/composition/templates/customer-details/root.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/app/composition/templates/customer-details/root.html",
    "<section>\n" +
    "\n" +
    "    <div>\n" +
    "        <radical-item-template item-template-settings=\"{ templatesFolder: '^customer-details/' }\"\n" +
    "                               template-model=\"templateModel.customer\"></radical-item-template>\n" +
    "    </div>\n" +
    "\n" +
    "    <div>\n" +
    "        <radical-item-template item-template-settings=\"{ templatesFolder: '^customer-details/' }\"\n" +
    "                               template-model=\"templateModel.orders\"></radical-item-template>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("/app/composition/templates/customers-list/customer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/app/composition/templates/customers-list/customer.html",
    "<section>\n" +
    "    <a data-ng-href=\"#/customers/{{templateModel.id}}\">{{templateModel.displayName}}</a>\n" +
    "</section>");
}]);

angular.module("/app/modules/registry/presentation/customerView.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/app/modules/registry/presentation/customerView.html",
    "<section data-cg-busy=\"customer.isBusy\">\n" +
    "    Customer by id<br />\n" +
    "    <radical-item-template item-template-settings=\"{ templatesFolder: '^customer-details/' }\"\n" +
    "                           template-model=\"customer.details\"></radical-item-template>\n" +
    "</section>");
}]);

angular.module("/app/modules/registry/presentation/customersView.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/app/modules/registry/presentation/customersView.html",
    "<section data-cg-busy=\"customers.isBusy\">\n" +
    "    Customers\n" +
    "    <ul>\n" +
    "        <li data-ng-repeat=\"customer in customers.list track by customer.id\">\n" +
    "            <radical-item-template item-template-settings=\"{ templatesFolder: '^customers-list/' }\"\n" +
    "                                   template-model=\"customer\"></radical-item-template>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "</section>");
}]);

angular.module("/app/presentation/dashboardView.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/app/presentation/dashboardView.html",
    "<section>\n" +
    "    This is the dashboard.\n" +
    "</section>");
}]);
