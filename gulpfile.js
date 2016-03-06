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

var devUrl = 'http://htmlboilerplate.dev/';
var devPath = 'app';
var buildPath = 'dist'


gulp.task('images', function(tmp) {
    gulp.src('app/assets/images/**/{*.jpg,*.png}')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('app/assets/images'));
});

gulp.task('scripts', function() {
    return gulp.src('app/assets/scripts/src/**/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .on('error', gutil.log)
        .pipe(uglify())
        .pipe(gulp.dest('app/assets/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return gulp.src('app/assets/styles/scss/main.scss')
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
                  'app/assets/styles/scss/'
              ]
        }))
        .pipe(autoprefixer({
           browsers: autoPrefixBrowserList,
           cascade:  true
        }))
        .on('error', gutil.log)
        .pipe(concat('stylesheet.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('app/assets/styles'))
        .pipe(browserSync.stream());
});

gulp.task('html-deploy', function() {
    gulp.src('app/*').pipe(plumber())
        .pipe(gulp.dest('dist'));

    gulp.src('app/.*').pipe(plumber())
        .pipe(gulp.dest('dist'));

//    gulp.src('app/assets/fonts/**/*')
//        .pipe(plumber())
//        .pipe(gulp.dest('dist/assets/fonts'));
});







gulp.task('images-deploy', function() {
    gulp.src('app/assets/images/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('styles-deploy', function() {
    return gulp.src('app/assets/styles/scss/main.scss')
        .pipe(plumber())
        .pipe(sass({
              includePaths: [
                  'app/assets/styles/scss',
              ]
        }))
        .pipe(autoprefixer({
          browsers: autoPrefixBrowserList,
          cascade:  true
        }))
        .pipe(concat('stylesheet.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/assets/styles'));
});


gulp.task('scripts-deploy', function() {
    return gulp.src('app/assets/scripts/src/**/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/scripts'));
});



gulp.task('clean', function() {
    return shell.task([
        'rm -r dist'
    ]);
});

gulp.task('scaffold', function() {
  return shell.task([
      'mkdir dist',
      'mkdir dist/assets',
      'mkdir dist/assets/fonts',
      'mkdir dist/assets/images',
      'mkdir dist/assets/scripts',
      'mkdir dist/assets/styles'
    ]);
});

gulp.task('default', ['scripts', 'styles'], function() {});

gulp.task('watch', ['scripts', 'styles'], function() {
    browserSync.init({
        files: ['app/**/*.php'],
        proxy: devUrl,
        notify: false
    });

    gulp.watch('app/assets/scripts/src/**', ['scripts']);
    gulp.watch('app/assets/styles/scss/**', ['styles']);
    gulp.watch('app/assets/images/**/*', ['images']);
});

gulp.task('deploy', gulpSequence(
                        'clean',
                        'scaffold',
                        ['scripts-deploy', 'styles-deploy', 'images-deploy'],
                        'html-deploy'
                    )
         );
