global.gulp            = require('gulp');
global.plumber         = require('gulp-plumber');
global.notify          = require('gulp-notify');
global.gulpif          = require('gulp-if');
global.filelog         = require('gulp-filelog');
global.lazypipe        = require('lazypipe');

var clean           = require('gulp-clean');
var browserSync     = require('browser-sync');
var dotenv          = require('dotenv').config();	 
var argv            = require('minimist')(process.argv.slice(2));
var gulpSequence    = require('gulp-sequence').use(gulp);

global.prod    = argv.production,
global.lintjs  = argv.lintjs;

global.config  = require('./config.json'),
global.deps    = config.dependencies,
global.paths   = config.paths;

global.finalize = function (directory) {
    return lazypipe()
        .pipe(gulp.dest, paths.dist + directory)
        .pipe(browserSync.stream)();
};

require('require-dir')('./gulp-tasks');

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

    gulp.watch('config.json', ['default']);
    gulp.watch(paths.source + 'images/**/*', ['images']);
    gulp.watch(paths.source + 'fonts/**/*', ['fonts']);
    gulp.watch(paths.source + 'scripts/**/*', ['scripts']);
    gulp.watch(paths.source + 'styles/**/*', ['styles']);
});
