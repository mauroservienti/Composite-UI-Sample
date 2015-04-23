# Composite-UI-Sample

The overall goal of these set of sample aims to show, in the simplest form possible to keep them simple, the concepts expressed in [The secret of better UI composition](http://particular.net/blog/secret-of-better-ui-composition) blog post.

## API

`OrdersApi` and `RegistryApi` mocks, with no real data storage, 2 sample back-end APIs that expose data related, at the business level, to each other. In this case the `RegistryApi` owns all the registry related data, and the `OrdersApi` owns order context bound data that have the notion of the related customer via the `CustomerId` attribute.

## Front-ends

#### `FrontEndWebUI` using AngularJS