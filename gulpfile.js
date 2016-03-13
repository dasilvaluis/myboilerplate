var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];


var gulp            = require('gulp'), 
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    minifyCSS       = require('gulp-minify-css'),
    gutil           = require('gulp-util'),
    concat          = require('gulp-concat'),
    sourceMaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    gulpSequence    = require('gulp-sequence').use(gulp),
    plumber         = require('gulp-plumber'),
    clean           = require('gulp-clean');

var devUrl = 'http://localhost/';
var publicPath = 'public',
    assetsFolder = 'assets';


gulp.task('images', function () {
    gulp.src('assets/images/**/{*.png,*.jpg,*.jpeg}')
        .pipe(plumber())
        .pipe(gulp.dest('public/dist/images'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src('assets/scripts/**/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('styles', function () {
    return gulp.src('assets/styles/main.scss')
        .pipe(plumber({
          errorHandler: function (err) {
            console.log(err);
            this.emit('end');
          }
        }))
        .pipe(sourceMaps.init())
        .pipe(sass({
              errLogToConsole: true,
              includePaths: [
                  'assets/styles/'
              ]
        }))
        .pipe(autoprefixer({
           browsers: autoPrefixBrowserList,
           cascade:  true
        }))
        .on('error', gutil.log)
        .pipe(concat('stylesheet.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('public/dist/styles'))
        .pipe(browserSync.stream());
});



gulp.task('deploy-files', ['images', 'scripts', 'styles'], function() {

    gulp.src( 'public/dist/images/**/{*.jpg,*.png}' )
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('public/assets/images'));


    gulp.src( 'public/dist/scripts/scripts.js' )
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest( 'public/dist/scripts' ));


    gulp.src( 'public/dist/styles/stylesheet.css' )
        .pipe(plumber())
        .pipe(minifyCSS())
        .pipe(gulp.dest( 'public/dist/styles' ));
});

gulp.task('clean', function () {
	return gulp.src('public/dist', {read: false})
		.pipe(clean());
});

gulp.task('refresh', gulpSequence( 'clean', 'default' ))

gulp.task('default', gulpSequence('images', 'scripts', 'styles') );

gulp.task('watch', ['images', 'scripts', 'styles'], function() {
    browserSync.init({
        files: ['public/**/*.html'],
        proxy: devUrl,
        notify: false
    });

    gulp.watch('assets/scripts/**/*', ['scripts']);
    gulp.watch('assets/styles/**/*', ['styles']);
    gulp.watch('assets/images/**/*', ['images']);
});

gulp.task('build', gulpSequence( 'deploy-files' ));
