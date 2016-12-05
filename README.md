# My Boilerplate

Simple front-end boilerplate with everything needed to start the development of simple web pages/web apps

## Features

* SCSS compiler
* Autoprefixer
* CSS and Javascript concatenation and compression
* Image compression
* Browsersync
* Ability to manage dependencies in `config.json`
* 10-column grid system
* Media query mixins 
* Javascript Linter

### Project file structure

    .
    ├── assets
    │   ├── fonts
    │   ├── images
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
    ├── config.json
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

For Browsersync, you can configure your virtualhost URL either by using `config.json` file or by a `.env` file. The difference is that by using `.env` each member of your team can use different virtualhost Url's. If you don't need this feature, you can stick with the `config.json` option.

Using `config.json`:

* Change `devUrl` variable in the config file


Using `.env`:

* Copy the `.env.example` file to a new file and name it `.env`
    
* Open the `.env` file and change the `DEV_URL` variable

* In `gulpfile.js`, in the `watch` task (l:103) change the `proxy` setting to `process.env.DEV_URL` instead of `config.devUrl`


## Use it

Run tasks once: 

    $ gulp

Clean 'public/assets' folder:

    $ gulp clean

Watch for changes:

    $ gulp watch

Build for production: 

    $ gulp build --production

Run [JSHint](http://jshint.com/) 

    $ gulp --lintjs

## Acknowledgements 

This project is influenced by similar projects such as:
* [Sage](https://roots.io/sage/)
* [HTML5 Boilerplate](https://html5boilerplate.com/)
* [Front-endboilerplate](http://frontendboilerplate.com/)

## TODO
Find a way to not apply run JSHint in vendor files