# Open Disclosure Oakland

Campaign finance data for Oakland.


## Prerequisites

This site uses [Jeykll][jekyll-site] to build and serve the website
and [npm][npm-site] to manage dependencies.

- Install npm with [Node][node-download]
- Install [Jekyll][jekyll-site]


## Usage

Install the dependencies and start the development server.

    $ npm install
    $ npm run serve

Open your browser to [http://localhost:4000/odca-oakland/](http://localhost:4000/odca-oakland/).

For development, you can rebuild the project as your files change.

    $ npm run watch


## ng-annotate

The production build minifies the javascript with
[uglify-js](https://www.npmjs.com/package/uglify-js). In order for angular's
dependency injection to work properly, functions must be properly annotated. We
use [ng-annotate](https://www.npmjs.com/package/ng-annotate) to do that. Most of
the time, `ng-annotate` is smart enough to annotate without any hints, but
occasionally gets this wrong. If your function is using dependency injection,
it's best practice to annotate the function using the `'ngInject'` statement.

```javascript
function ($scope, service) {
  'ngInject';
  
  // ...
}
```


--
_This prototype is based on
[jekyll-prototype](https://github.com/adborden/jekyll-prototype)._


[jekyll-site]: https://jekyllrb.com/
[node-download]: https://nodejs.org/en/download/
[npm-site]: https://www.npmjs.com/
[repo-url]: https://github.com/adborden/jekyll-prototype
