const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const lazypipe = require('lazypipe');
const browserSync = require('browser-sync');
const config = require('../config.json');

// ### JS processing pipeline
// Example
// ```
// gulp.src(jsFiles)
//   .pipe(jsTasks('main.js')
//   .pipe(gulp.dest(paths.dist + 'scripts'))
// ```
function jsTasks(filename) {
  return lazypipe()
    .pipe(() => gulpif(enabled.maps, sourcemaps.init()))
    .pipe(concat, filename)
    .pipe(() => gulpif(enabled.minify, uglify({
      compress: { drop_debugger: enabled.stripJSDebug },
    })))
    .pipe(() => gulpif(enabled.maps, sourcemaps.write('.', {
      sourceRoot: `${config.paths.source}/scripts`,
    })))();
}

// ### ESLint
// `gulp eslint` - Lints configuration JSON and project JS.
// Configure linter options in eslint.json
gulp.task('eslint', () => {
  const output = gulp.src(config.jslintFiles)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint({ configFile: 'eslint.json' }))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(gulpif(enabled.failESLint, eslint.failAfterError()));
  return output;
});

// ### Scripts
// `gulp scripts` - Runs ESLint then compiles, combines, and optimizes JS
gulp.task('scripts', () => {
  const output = gulp.src(config.dependencies.js)
    .pipe(jsTasks('main.js'))
    .pipe(gulp.dest(`${config.paths.dist}/scripts`))
    .pipe(browserSync.stream());

    return output;
});
