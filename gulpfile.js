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
    shell           = require('gulp-shell'),
    plumber         = require('gulp-plumber');

var devUrl = 'http://localhost/';
var devPath = 'app';
var buildPath = 'public';


gulp.task('images', function () {
    gulp.src(devPath + '/assets/images/**/{*.jpg,*.png}')
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(devPath + '/assets/images'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src(devPath + '/assets/scripts/src/**/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .on('error', gutil.log)
        .pipe(uglify())
        .pipe(gulp.dest(devPath + '/assets/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('styles', function () {
    return gulp.src(devPath + '/assets/styles/src/main.scss')
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
                  devPath + '/assets/styles/src/'
              ]
        }))
        .pipe(autoprefixer({
           browsers: autoPrefixBrowserList,
           cascade:  true
        }))
        .on('error', gutil.log)
        .pipe(concat('stylesheet.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(devPath + '/assets/styles'))
        .pipe(browserSync.stream());
});



gulp.task('deploy-files', ['images', 'scripts', 'styles'], function() {
    gulp.src(devPath + '/*')
        .pipe(plumber())
        .pipe(gulp.dest(buildPath));

    gulp.src(devPath + '/.*')
        .pipe(plumber())
        .pipe(gulp.dest(buildPath));


    gulp.src(devPath + '/assets/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(buildPath + '/assets/fonts'));


    gulp.src(devPath + '/assets/images/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(buildPath + '/assets/images'));


    gulp.src(devPath + '/assets/scripts/scripts.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(buildPath + '/assets/scripts'));


    gulp.src(devPath + '/assets/styles/stylesheet.css')
        .pipe(plumber())
        .pipe(minifyCSS())
        .pipe(gulp.dest(buildPath + '/assets/styles'));
});

gulp.task('clean', function() {
    return shell.task([
        'rm -r' + buildPath
    ]);
});

gulp.task('scaffold', function() {
  return shell.task([
      'mkdir ' + buildPath,
      'mkdir ' + buildPath + '/assets',
      'mkdir ' + buildPath + '/assets/fonts',
      'mkdir ' + buildPath + '/assets/images',
      'mkdir ' + buildPath + '/assets/scripts',
      'mkdir ' + buildPath + '/assets/styles'
    ]);
});

gulp.task('default', ['images', 'scripts', 'styles'], function() {});

gulp.task('watch', ['images', 'scripts', 'styles'], function() {
    browserSync.init({
        files: [devPath + '/**/*.php', devPath + '/**/*.html'],
        proxy: devUrl,
        notify: false
    });

    gulp.watch(devPath + '/assets/scripts/src/**/*', ['scripts']);
    gulp.watch(devPath + '/assets/styles/src/**/*', ['styles']);
    gulp.watch(devPath + '/assets/images/**/*', ['images']);
});

gulp.task('build', gulpSequence(    'clean',
                                    'scaffold',
                                    'deploy-files'
                                ));
