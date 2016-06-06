# Composite-UI-Sample

The overall goal of these set of sample aims to show, in the simplest form possible to keep them simple, the concepts expressed in [The secret of better UI composition](http://particular.net/blog/secret-of-better-ui-composition) blog post.

## API

`Sales.API`, `Finance.API` and `Customers.API` expose data owned by 3 different bounded context, or services in the SOA terminology. In this sample `Customers` owns all the registry related data, `Sales` owns Orders and finally `Finance` owns prices and credit card information.

## Front-end

* `FrontEnd.SPA` is an AngularJS (1.x) based single page application.

## Getting started

### API Projects

Configure `Visual Studio` to run the following projects as startup projects:

* `Sales.API`
* `Finance.API`
* `Customers.API`

### Single page application

The single page application requires `Node.js`, `bower` and `grunt` to be built and served locally:

* Install `Node.js` if not already installed
* Install `bower` globally running at a `Node` command prompt `npm install -g bower`
* Install `grunt` globally running at a `Node` command prompt `npm install -g grunt`

Open a `Node` command prompt and run `grunt serve` to build the single page application and serve it using the grung default web server, the application will be available at `http://localhost:9000`
