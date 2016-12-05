var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var browserSync     = require('browser-sync');
var autoprefixer    = require('gulp-autoprefixer');
var uglify          = require('gulp-uglify');
var cssnano         = require('gulp-cssnano');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var imagemin        = require('gulp-imagemin');
var gulpSequence    = require('gulp-sequence').use(gulp);
var plumber         = require('gulp-plumber');
var clean           = require('gulp-clean');
var dotenv          = require('dotenv').config();	 
var notify          = require('gulp-notify');
var gulpif          = require('gulp-if');
var argv            = require('minimist')(process.argv.slice(2));
var filelog         = require('gulp-filelog');
var jshint          = require('gulp-jshint');
var lazypipe        = require('lazypipe');

var prod    = argv.production,
    lintjs  = argv.lintjs;

var config  = require('./config.json'),
    deps    = config.dependencies,
    paths   = config.paths;

/**
 * Iterates over dependency lists and concatenates each path in an array
 * @param {array} list List of dependencies to be iterated
 * @param {string} def Default dependency to be injected in the end
 * @returns Array of dependencies paths
 */
var sources = function (list){
    var sources = [];
    list.forEach(function(dep) {
        sources.push(paths.source + dep);
    });
    return sources;
};

var finalize = function (directory) {
  return lazypipe()
    .pipe(gulp.dest, paths.dist + directory)
    .pipe(browserSync.stream)();
};

gulp.task('images', function () {
    gulp.src(deps.images)
        .pipe(gulpif(prod, imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(finalize('images'));
});

gulp.task('fonts', function () {
    
    return gulp.src(deps.fonts)
        .pipe(finalize('fonts'));
});

gulp.task('jshint', function() {
  return gulp.src(['gulpfile.js', 'assets/config.js'].concat(deps.js))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {

    return gulp.src(deps.js)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulpif(!prod, sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(gulpif(!prod, sourcemaps.write('.')))
        .pipe(gulpif(prod, uglify()))
        .pipe(finalize('scripts'));
});

gulp.task('styles', function() {

    return gulp.src(deps.css)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulpif(!prod, sourcemaps.init()))
        .pipe(gulpif('*.scss', sass({
            errLogToConsole: true,
            includePaths: ['.']
        })))
        .pipe(autoprefixer({
            browsers: autoPrefixBrowserList,
            cascade:  true
        }))
        .pipe(concat('main.css'))
        .pipe(gulpif(!prod, sourcemaps.write('.')))
        .pipe(gulpif(prod, cssnano()))
        .pipe(finalize('styles'));
});

gulp.task('default', function(callback){
    gulpSequence('clean', 'images', 'fonts', 'scripts', 'styles')(callback);
});

gulp.task('clean', function () {
	return gulp.src(paths.dist, {read: false} )
        .pipe(clean());
});

gulp.task('watch', ['default'], function() {
    browserSync.init({
        files: config.watch,
        proxy: config.devUrl,
        notify: false
    });

    gulp.watch(paths.source + 'config.json', ['default']);
    gulp.watch(paths.source + 'images/**/*', ['images']);
    gulp.watch(paths.source + 'fonts/**/*', ['fonts']);
    gulp.watch(paths.source + 'scripts/**/*', ['jshint', 'scripts']);
    gulp.watch(paths.source + 'styles/**/*', ['styles']);
});
