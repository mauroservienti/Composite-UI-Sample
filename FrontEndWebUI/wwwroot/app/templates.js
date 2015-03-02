angular.module('composite.ui.app.templates', ['/app/composition/templates/customer-details/customer.html', '/app/composition/templates/customer-details/orders.html', '/app/composition/templates/customer-details/root.html']);

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
