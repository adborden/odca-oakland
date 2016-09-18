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

## Filenames

I'm open to suggestions, but wanted to decode what the extensions mean within
the angular code. This was borrowed from some "best angular practices" guide.
One thing I like about it is that the module dependencies become really clear.
The thing I don't like is that you often have a few lines within a single file and
many files.

| Extension | Description |
| --------- | ----------- |
| `comp`    | Component   |
| `ctrl`    | Controller  |
| `directive` | Directive |
| `factory` | factory     |
| `html`    | HTML template |
| `service` | Service     |


## ng-annotate

The production build minifies the javascript with
[uglify-js](https://www.npmjs.com/package/uglify-js). In order for Angular's
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


## Angular vs Jekyll

You don't need to know much Jekyll for this project. All of the javascript and
Angular code lives under `/src`. The HTML pages at the root level of the project
are handled by Jekyll, but do very little besides bootstrapping the app.

Jekyll handles:
- scss compilation
- conversion of markdown pages

npm handles:
- copying third-party assets like bootstrap and jquery
- building javascript entrypoints


### Adding an entrypoint

Think of your entrypoint as your app bundle. By having multiple entrypoints, you
could load a different app bundle per page. Any `.js` file directly under `/src`
is considered to be an entrypoint and will be processed by the npm build
pipeline.


### Adding a new Jekyll page

It's unlikely you'll need to do this because all of the app routes are handled
by Angular. If there is a content heavy page, it could be created in markdown
and processed by Jekyll. This might make sense for things like the about page or
the FAQ.

The frontmatter controls how the page is processed. In particular, there are
three properties you'll care most about: `layout`, `title`, `javascript`.

`layout` specifies which layout to use from `/_layouts`. `title` specifies the
title of the page. `javascript` tells Jekyll to add a script tag for the
specified entrypoint's app bundle. For example, here's the 404 page:


```
---
layout: default
title: Not Found
javascript: 404
---
```

Jekyll uses the `default.html` to render the page, with the title "Not Found",
and includes a script tag to the app bundle built from `/src/404.js`.

Easy, right?


### Caveats

Both Jekyll and Angular use `{{ }}` for template expressions. If the template is
under `/src`, no problem, you're in javascript/Angular land so Angular will
evaluate the expression. If you're elsewhere in the project, it's probably
Jekyll rendering your template. In that case, you might want to escape a block
of text using Jekyll's `{% raw %}{% endraw %}` tags. It won't touch any `{{ }}`
inside the `raw` tag, so you can write Angular expressions that way.


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
