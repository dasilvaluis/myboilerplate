var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

var gulp            = require('gulp'), 
    sass            = require('gulp-sass'),
    less            = require('gulp-less'),
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
    clean           = require('gulp-clean'),
    changed         = require('gulp-changed'),
    flatten         = require('gulp-flatten'),
    merge           = require('merge-stream');

var manifest = require('asset-builder')('./assets/manifest.json');

var path = manifest.paths,
    config = manifest.config,
    globs = manifest.globs,
    project = manifest.getProjectGlobs();


gulp.task('images', function () {
    gulp.src(path.source + 'images/**/{*.png,*.jpg,*.jpeg}')
        .pipe(plumber())
        .pipe(gulp.dest(path.dist + 'images'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src(globs.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(path.dist + 'fonts'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src(path.source + 'scripts/**/*.js' )
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest(path.dist + 'scripts' ))
        .pipe(browserSync.stream());
});


gulp.task('styles', ['wiredep'], function () {

    var cssStream = gulp.src(path.source + 'styles/**/*.css')
        .pipe(sourceMaps.init())
        .pipe(concat('css-files.css'))
        .pipe(sourceMaps.write());

    var sassStream = gulp.src(path.source + 'styles/main.scss' )
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
                  path.source + 'styles/'
              ]
        }))
        .pipe(autoprefixer({
           browsers: autoPrefixBrowserList,
           cascade:  true
        }))
        .on('error', gutil.log)
        .pipe(sourceMaps.write())
        .pipe(concat('sass-files.css'));


    return merge(sassStream, cssStream)
        .pipe(concat('stylesheet.css'))
        .pipe(gulp.dest(path.dist + 'styles') )
        .pipe(browserSync.stream());

});


gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;
  return gulp.src(project.css)
    .pipe(wiredep())
    .pipe(changed(path.source + 'styles', {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest(path.source + 'styles'));
});


gulp.task('default', gulpSequence('clean', 'images', 'fonts', 'scripts', 'styles') );

gulp.task('clean', function () {
	return gulp.src(path.dist, {read: false} )
		.pipe(clean());
});

gulp.task('watch', ['default'], function() {
    browserSync.init({
        files: ['public/**/*.html'],
        proxy: config.devURL,
        notify: false
    });

    gulp.watch(path.source + 'images/**/*', ['images']);
    gulp.watch(path.source + 'fonts/**/*', ['fonts']);
    gulp.watch(path.source + 'scripts/**/*', ['scripts']);
    gulp.watch(path.source + 'styles/**/*', ['styles']);
});

gulp.task('build', ['default'], function() {

    gulp.src(path.dist + 'images/**/{*.jpg,*.png}' )
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist + 'images' ));

    gulp.src(path.dist + 'scripts/scripts.js' )
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest( path.dist + 'scripts' ));

    gulp.src(path.dist + 'styles/stylesheet.css' )
        .pipe(plumber())
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.dist + 'styles' ));
});
