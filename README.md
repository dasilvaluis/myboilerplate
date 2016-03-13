Front End Boilerplate
==========================

Front-end boilerplate with everything you need to get started.

### Includes

* Sass compiler and minification
* Autoprefixer
* Javascript concatenation and compression
* Image compression
* Browsersync

### Folder Structure

.
+-- assets
|   +-- fonts
|   +-- images
|   +-- scripts
|   +-- styles
+-- public
|   +-- .htaccess
|   +-- 404.html
|   +-- index.html
|   +-- humans.txt
|   +-- robots.txt
|   +-- sitemap.xml
|   +-- crossdomain.xml
+-- .bowerrc
+-- .editorconfig
+-- bower.json
+-- gulpfile.js
+-- LICENSE
+-- package.json
+-- README.md

### Installation

* Download/Clone repo
* `npm install`
* `npm install -g gulp`
* `bower install`
* Change devUrl var in the gulpfile.js file for your own virtualhost URL


### Using

Run tasks once: 
* `gulp`

Clean 'dist' folder:
* `gulp clean`

Refresh 'dist' folder:
* `gulp refresh`

Watch for changes:
* `gulp watch`

Build for production: 
* `gulp build`