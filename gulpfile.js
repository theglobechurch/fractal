// Fractal
const fractal       = require('./fractal.js');
const logger        = fractal.cli.console;

// Gulp
const autoprefixer  = require('gulp-autoprefixer');
const babelify      = require('babelify');
const browserify    = require('browserify');
const buffer        = require('vinyl-buffer');
const concat        = require('gulp-concat');
const debug         = require('gulp-debug');
const del           = require('del');
const esLint        = require('gulp-eslint');
const glob          = require('glob');
const gulp          = require('gulp');
const gulpif        = require('gulp-if');
const gutil         = require('gulp-util');
const rename        = require('gulp-rename');
const responsive    = require('gulp-responsive-images');
const sass          = require('gulp-sass');
const sassGlob      = require('gulp-sass-glob');
const sassLint      = require('gulp-sass-lint');
const source        = require('vinyl-source-stream');
const sourcemaps    = require('gulp-sourcemaps');
const surge         = require('gulp-surge');
const svgmin        = require('gulp-svgmin');
const svgsymbols    = require('gulp-svg-symbols');
const uglify        = require('gulp-uglify');

// Paths
const paths = {
  src: `./src/`,
  dest: `${__dirname}/tmp/`,
  build: `${__dirname}/www/`,
  dist: `${__dirname}/dist/`
};

// Production var changed at deploy
let production = false;

// Deploy location:
const surgeURL = 'https://tgc-fractal.surge.sh';

//---
// Empty temp folders
function clean() {
  return del([paths.dest, paths.build]);
}


//---
// Setup a local server
function serve() {
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal online at: ${server.url}`);
  });
}


//---
// Create a static build of fractal
// Build location defined in `fractal.js`
function staticBuild() {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build complete');
  });
}


//---
// Deploy to surge
function deploy() {
  return surge({
    project: paths.build,
    domain: surgeURL
  });
}

//---
// Nom nom errors
function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
}

//---
// Style
function styles() {
  // Look at replacing a lot of this with postCSS
  return gulp.src(`${paths.src}/assets/styles/*.scss`)
    .pipe(sassGlob())
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', swallowError))
    .pipe(autoprefixer())
    .pipe(gulpif(!production, sourcemaps.write('./')))
    .pipe(gulp.dest(`${paths.dest}/assets/styles`));
}

//---
// SVG Icons
function svg() {
  return gulp.src(`${paths.src}/assets/svg/*.svg`)
    .pipe(svgmin({
      plugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(svgsymbols({
			svgAttrs: {
        'class': 's-svg-icon',
        'aria-hidden': `true`,
      },
			templates: ['default-svg'],
      title: false,
    }))
    .pipe(gulp.dest(`${paths.dest}/assets/svg`));
}

//---
// Images
function images() {
  return gulp.src([`${paths.src}/assets/img/**/*.{gif,jpg,jpeg,png}`,
                   `${paths.src}/components/**/img/*.{gif,jpg,jpeg,png}`])
    .pipe(debug({title: 'Image:'}))
    .pipe(responsive({
        '**/*': [{
            width: 400,
            height: 400,
            crop: 'center',
            rename: { suffix: '-square' }
        }, {
            width: 2560,
            height: 1440,
            crop: 'center',
            rename: { suffix: '-2560' }
        }, {
            width: 1920,
            height: 1080,
            crop: 'center',
            rename: { suffix: '-1920' }
        }, {
            width: 1280,
            height: 720,
            crop: 'center',
            rename: { suffix: '-1280' }
        }, {
            width: 960,
            height: 540,
            crop: 'center',
            rename: { suffix: '-960' }
        }, {
            width: 640,
            height: 360,
            crop: 'center',
            rename: { suffix: '-640' }
        }, {
            width: 320,
            height: 180,
            crop: 'center',
            rename: { suffix: '-320' }
        }],
    }, {
        quality: 70,
        progressive: true,
        withMetadata: false,
        overwrite: true,
        skipOnEnlargement: false,
        errorOnUnusedConfig: false,
        errorOnUnusedImage: false,
        errorOnEnlargement: false
    }))
    .pipe(gulp.dest(`${paths.dest}/assets/img`));
}

//---
// Block Assets
function blockAssets() {
  return gulp.src(`${paths.src}/components/**/assets/*`)
    .pipe(gulp.dest(`${paths.dest}/assets`));
}
//---
// Scripts
function scripts() {
  var appBundler = browserify({
    entries: `${paths.src}/assets/scripts/application.js`,
    debug: false
  });

  return appBundler
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(`${paths.dest}/assets/js`));
}

//---
// Prepare for release
function cleanReleaseFolder() {
  return del([paths.dist]);
}

function releaseSVG() {
  return gulp.src(`${paths.dest}/assets/svg/*.svg`)
    .pipe(rename('tgc-fractal.svg'))
    .pipe(gulp.dest(`${paths.dist}/svg`));
}

function releaseCSS() {
  return gulp.src(`${paths.dest}/assets/styles/globe_styles.css`)
    .pipe(rename('tgc-fractal.css'))
    .pipe(gulp.dest(`${paths.dist}/css`));
}

function releaseJS() {
  return gulp.src(`${paths.dest}/assets/js/bundle.js`)
    .pipe(rename('tgc-fractal.js'))
    .pipe(gulp.dest(`${paths.dist}/js`));
}

//---
// Linters
function sassLinter() {
  return gulp.src(`${paths.src}/**/*.scss`)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}

function jsLinter() {
  return gulp.src(`${paths.src}/**/*.js`)
    .pipe(esLint())
    .pipe(esLint.format())
}

function goProduction() {
  return new Promise(function(resolve, reject) {
    production = true;
    resolve();
  })
}

//---
// Watch
function watch() {
  serve();
  gulp.watch([
    `./src/assets/**/*.scss`,
    `./src/components/**/*.scss`
  ], styles);

  gulp.watch([
    `./src/assets/scripts/application.js`,
    `./src/components/**/*.js`
  ], scripts);

  gulp.watch(`./src/assets/svg/*.svg`, svg);
  gulp.watch([`./src/assets/img/**/*`, `./src/components/**/img/*.{gif,jpg,jpeg,png}`], images);
  gulp.watch([`./src/components/**/assets/*`], blockAssets);
}

const compile = gulp.series(clean, gulp.parallel(svg, styles, scripts, images, blockAssets));
const buildDistAssets = gulp.series(cleanReleaseFolder, gulp.parallel(releaseSVG, releaseCSS, releaseJS));
const linter = gulp.series(sassLinter, jsLinter);

gulp.task('dev', gulp.series(compile, watch));
gulp.task('build', gulp.series(compile, staticBuild));
gulp.task('deploy', gulp.series(compile, staticBuild, deploy));
gulp.task('dist', gulp.series(linter, compile, buildDistAssets, staticBuild, deploy, clean));
gulp.task('lint', gulp.series(linter));
gulp.task('build-dist-assets', gulp.series(goProduction, compile, buildDistAssets));
gulp.task('images', gulp.series(clean, images));
