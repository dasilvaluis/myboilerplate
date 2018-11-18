var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var cssnano         = require('gulp-cssnano');
var sourcemaps      = require('gulp-sourcemaps');

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