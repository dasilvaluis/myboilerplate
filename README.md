# My Boilerplate

Simple front-end boilerplate with everything needed fto develop simple web pages/web apps

## Features

### Includes

* SASS compiler
* Autoprefixer
* CSS and Javascript concatenation and compression
* Image compression
* Browsersync
* Asset Builder
* .htaccess file from [H5BP](https://github.com/h5bp/server-configs-apache)

### Features

* Automatically inject JS, CSS/SASS from bower
* Ability to manage dependencies in Asset Builder file, `assets/manifest.json`

### File structure
    .
    ├── assets
    │   ├── fonts
    │   ├── images
    │   ├── manifest.json
    │   ├── scripts
    │   │   └── main.js
    │   └── styles
    │       ├── components
    │       │   ├── _buttons.scss
    │       │   └── _forms.scss
    │       ├── config
    │       │   ├── _media.scss
    │       │   ├── _mixins.scss
    │       │   ├── _overrides.scss
    │       │   └── _variables.scss
    │       ├── layout
    │       │   ├── _footer.scss
    │       │   └── _header.scss
    │       ├── main.scss
    │       └── pages
    ├── bower.json
    ├── gulpfile.js
    ├── LICENSE
    ├── package.json
    ├── public
    │   ├── 404.html
    │   ├── assets
    │   │   ├── scripts
    │   │   │   └── main.js
    │   │   └── styles
    │   │       └── main.css
    │   ├── crossdomain.xml
    │   ├── humans.txt
    │   ├── index.html
    │   ├── robots.txt
    │   └── sitemap.xml
    ├── README.md

### Bower dependencies
* [Susy](http://susy.oddbird.net/)
* [Normalize.css](https://necolas.github.io/normalize.css/)
* [jQuery](https://jquery.com/)
* [Selectivizr](http://selectivizr.com/)

## Install

### Requirements

* [NodeJS](https://nodejs.org/)
* [Gulp](http://gulpjs.com/)
* [Bower](http://bower.io/)

### Install

* Download / Clone repo
* `npm install`
* `bower install`
* Copy the `.env.example` file to a new file and name it `.env`
* Open the `.env` file and change `DEV_URL` variable value for your own virtualhost URL


## Use it

Run tasks once: 
* `gulp`

Clean 'public/assets' folder:
* `gulp clean`

Watch for changes:
* `gulp watch`

Build for production: 
* `gulp build`

List all gulp commands:
* `gulp -T`


## Acknowledgements 

This project is influenced by similar projects such as:
* [Sage](https://roots.io/sage/)
* [HTML5 Boilerplate](https://html5boilerplate.com/)
* [Front-endboilerplate](http://frontendboilerplate.com/)

## License

The MIT License (MIT)

Copyright (c) 2016

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


*tl;dr*: Free as the rain