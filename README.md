Front End Boilerplate
==========================

Front-end boilerplate with everything you need to get started.

### Includes

* Sass compiler
* Autoprefixer
* CSS and Javascript concatenation and compression
* Image compression
* Browsersync


### Installation

* Download/Clone repo
* `npm install`
* `npm install -g gulp`
* `bower install`
* Change devUrl var in the gulpfile.js file for your own project URL


### Using
Development mode: 
* `gulp`

For deploynment: 
* `gulp deploy`

### Notes
##### PHP Files

The gulp script is ready to work with .html as well as .php files. However, if you change the `404.hmtl` to `404.php`, you must also change the reference `ErrorDocument` in the `.htaccess` file to `404.php` as well.