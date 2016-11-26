# My Boilerplate

Simple front-end boilerplate with everything needed to start the development of simple web pages/web apps

## Features

* SCSS compiler
* Autoprefixer
* CSS and Javascript concatenation and compression
* Image compression
* Browsersync
* Ability to manage dependencies in Asset Builder file, `assets/manifest.json`
* 10-column grid system
* Media query mixins 

### Project file structure

    .
    ├── assets
    │   ├── fonts
    │   ├── images
    │   ├── config.json
    │   ├── scripts
    │   │   └── main.js
    │   └── styles
    │       ├── base
    │       │   ├── _general.scss
    │       │   ├── _grid.scss
    │       │   ├── _mixins.scss
    │       │   └── _variables.scss
    │       ├── components
    │       │   ├── _buttons.scss
    │       │   ├── _fonts.scss
    │       │   └── _forms.scss
    │       ├── layout
    │       │   ├── _footer.scss
    │       │   ├── _header.scss
    │       │   └── _sections.scss
    │       └── main.scss
    ├── gulpfile.json
    ├── package.json
    └── public
        ├── .htaccess
        ├── 404.html
        ├── humans.txt
        ├── index.html
        └── robots.txt

## Install

### Requirements

* [NodeJS](https://nodejs.org/)
* [Gulp](http://gulpjs.com/)

### Install

Download / Clone repo and CD into the created folder

    $ git clone https://github.com/luism-s/myBoilerplate.git projectname 

    $ cd projectname/
    
Install Node dependencies

    $ npm install

Configure your virtualhost Url to feed browsersync (notes below).
 
#### Virtualhost and Browsersync

For Browsersync, you can configure your virtualhost URL either by using `assets/config.json` file or by a `.env` file. The difference is that by using `.env` each member of your team can use different virtualhost Url's. If you don't need this feature, you can stick with the `assets/config.json` option.

Using `assets/config.json`:

* Change `devUrl` variable in the config file.


Using `.env`:

* Copy the `.env.example` file to a new file and name it `.env`
    
* Open the `.env` file and change the `DEV_URL` variable.


## Use it

Run tasks once: 

    $ gulp

Clean 'public/assets' folder:

    $ gulp clean

Watch for changes:

    $ gulp watch

Build for production: 

    $ gulp build --production

## Acknowledgements 

This project is influenced by similar projects such as:
* [Sage](https://roots.io/sage/)
* [HTML5 Boilerplate](https://html5boilerplate.com/)
* [Front-endboilerplate](http://frontendboilerplate.com/)

## License

The MIT License (MIT)

Copyright (c) 2016 Luís Silva

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


*tl;dr*: Free as the rain