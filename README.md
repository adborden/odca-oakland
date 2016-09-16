[![Build Status](https://travis-ci.org/adborden/odca-oakland.svg?branch=master)](https://travis-ci.org/adborden/odca-oakland)
[![Dependency Status](https://gemnasium.com/badges/github.com/adborden/odca-oakland.svg)](https://gemnasium.com/github.com/adborden/odca-oakland)
[![Code Climate](https://codeclimate.com/github/adborden/odca-oakland/badges/gpa.svg)](https://codeclimate.com/github/adborden/odca-oakland)

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


## License

odca-oakland Campaign finance data for Oakland
Copyright (C) 2016  CA Civic Lab

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.


--
_This prototype is based on
[jekyll-prototype](https://github.com/adborden/jekyll-prototype)._


[jekyll-site]: https://jekyllrb.com/
[node-download]: https://nodejs.org/en/download/
[npm-site]: https://www.npmjs.com/
