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


var config = {
        devURL: 'http://localhost/',
		assetsFolder: 'assets',
		publicFolder: 'src'
	}

gulp.task('images', function () {
    gulp.src(config.AssetsFolder + '/images/**/{*.png,*.jpg,*.jpeg}')
        .pipe(plumber())
        .pipe(gulp.dest(config.publicFolder + '/dist/images'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src(config.AssetsFolder + '/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(config.publicFolder + '/dist/fonts' ));
});

gulp.task('scripts', function () {
    return gulp.src(config.AssetsFolder + '/scripts/**/*.js' )
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest(config.publicFolder + '/dist/scripts' ))
        .pipe(browserSync.stream());
});

gulp.task('styles', function () {
    return gulp.src(config.AssetsFolder + '/styles/main.scss' )
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
                  config.AssetsFolder + '/styles/'
              ]
        }))
        .pipe(autoprefixer({
           browsers: autoPrefixBrowserList,
           cascade:  true
        }))
        .on('error', gutil.log)
        .pipe(concat('stylesheet.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(config.publicFolder + '/dist/styles') )
        .pipe(browserSync.stream());
});


gulp.task('clean', function () {
	return gulp.src(config.publicFolder + '/dist', {read: false} )
		.pipe(clean());
});

gulp.task('refresh', gulpSequence( 'clean', 'default' ))

gulp.task('default', gulpSequence('images', 'fonts', 'scripts', 'styles') );

gulp.task('watch', ['default'], function() {
    browserSync.init({
        files: [config.publicFolder + '/**/*.html'],
        proxy: config.devURL,
        notify: false
    });

    gulp.watch(config.AssetsFolder + '/images/**/*', ['images']);
    gulp.watch(config.AssetsFolder + '/fonts/**/*', ['fonts']);
    gulp.watch(config.AssetsFolder + '/scripts/**/*', ['scripts']);
    gulp.watch(config.AssetsFolder + '/styles/**/*', ['styles']);
});

gulp.task('build', ['default'], function() {

    gulp.src(config.publicFolder + '/dist/images/**/{*.jpg,*.png}' )
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.publicFolder + '/assets/images' ));

    gulp.src(config.publicFolder + '/dist/scripts/scripts.js' )
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest( config.publicFolder + '/dist/scripts' ));

    gulp.src(config.publicFolder + '/dist/styles/stylesheet.css' )
        .pipe(plumber())
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.publicFolder + '/dist/styles' ));

});
