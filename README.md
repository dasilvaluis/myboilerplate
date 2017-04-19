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
    ├── public                                  
    │   ├── assets                                   
    │   │   ├── scripts                              
    │   │   │   ├── main.js                          
    │   │   │   └── main.js.map                      
    │   │   └── styles                               
    │   │       ├── main.css                         
    │   │       └── main.css.map                     
    │   ├── grid.html                                
    │   ├── humans.txt                               
    │   ├── index.html                                       
    │   ├── 404.html                              
    │   └── robots.txt                                   
    └── src                                          
        ├── assets                                   
        │   ├── fonts                                
        │   ├── images                               
        │   ├── scripts                              
        │   │   └── main.js                          
        │   └── styles                               
        │       ├── base                             
        │       │   ├── _general.scss                
        │       │   ├── _grid.scss                   
        │       │   ├── _mixins.scss                 
        │       │   └── _variables.scss              
        │       ├── components                       
        │       │   ├── _buttons.scss                
        │       │   ├── _fonts.scss                  
        │       │   └── _forms.scss                  
        │       ├── layout                           
        │       │   ├── _footer.scss                 
        │       │   ├── _header.scss                 
        │       │   └── _sections.scss               
        │       └── main.scss                                  
        ├── gulp-tasks                               
        │   ├── build.js                             
        │   ├── clean.js                             
        │   ├── default.js                           
        │   ├── fonts.js                             
        │   ├── images.js                            
        │   ├── scripts.js                           
        │   ├── styles.js                            
        │   └── watch.js                    
        ├── config.json                              
        ├── gulpfile.js                             
        └── package.json                             
                                                 
## Install

### Requirements

* [NodeJS](https://nodejs.org/)
* [Gulp](http://gulpjs.com/)

### Install

Download / Clone repo and CD into the created folder

    $ git clone https://github.com/luism-s/myBoilerplate.git projectname 

    $ cd projectname/src
    
Install Node dependencies

    $ npm install

Configure your virtualhost Url to feed browsersync (notes below).
 
#### Virtualhost and Browsersync

For Browsersync, you can configure your virtualhost URL either by using `src/config.json` file or by a `src/.env` file. The difference is that by using `.env` each member of your team can use different virtualhost Url's. If you don't need this feature, you can stick with the `config.json` option.

Using `src/config.json`:

* Create your virtual domain using your local hosts file (for OSX it's in /etc/hosts)
* Change `devUrl` variable in the config file with your virtual domain


Using `src/.env`:

* Copy the `src/.env.example` file to a new file and name it `.env`
    
* Open the `src/.env` file and change the `DEV_URL` variable

* In `src/gulpfile.js`, in the `watch` task (l:103) change the `proxy` setting to `process.env.DEV_URL` instead of `config.devUrl`


## Use it

CD into the project folder

    $ cd projectname/src

Run tasks once: 

    $ gulp

Clean 'public/assets' folder:

    $ gulp clean

Watch for changes:

    $ gulp watch

Build for production: 

    $ gulp build --prod

Run [JSHint](http://jshint.com/) 

    $ gulp --lintjs

## Acknowledgements 

This project is influenced by similar projects such as:
* [Sage](https://roots.io/sage/)
* [HTML5 Boilerplate](https://html5boilerplate.com/)
* [Front-endboilerplate](http://frontendboilerplate.com/)

## Known Issues
Gulp watch will only listen to changes in assets folders that already have something inside in the beginning. If `assets/images/` is empty, it wont run the task when th first file is added. 
