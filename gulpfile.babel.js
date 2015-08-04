  'use strict';
/**
 * Available gulp packages to gulp-load-plugins:
 * sass -- sass compiler
 * csso -- css optimizer/minifyer
 * autoprefixer -- css prefixer
 * if -- gulp if stream
 * imagemin -- image compresser
 * jshint -- js hinter
 * size -- log the file sizes
 * sourcemaps -- add sourcemaps useful after minification
 * uglify -- js/html minifyer
 * concat -- concat files together
 * nodemon -- nodemon for gulp
 * changed
 * cache
 */



/**
 *
 * WARNING:
 * Only serve:dev is tested and working for development
 * TODO:
 * finish production tasks
 *
 */



import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import pkg from './package.json';
// import swPrecache from 'sw-precache';
import {output as pagespeed} from 'psi';
const $ = gulpLoadPlugins();
const reload = browserSync.reload;



/**
 * Globals
 */
const PATH = {
  // TODO: Find a better dist path aproach
  public: {
    dir: './public',
    app: './public/app',
    src: './public/assets/src',
    dist: './public/assets/dist'
  },
  server: {
    dir: './server',
    bin: './bin/www'
  }
};
const DEFAULTS = {
  url: 'some-url.com',
  browserSync: {
    proxy: 'http://localhost:3000',
    port: 4000,
    browser: ['google-chrome']
  },
  autoprefixerBrowsers: [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ],
  browserSyncReloadDelay: 500
};


// Lint JavaScript
gulp.task('jshint', () => {
  return gulp.src(`${PATH.public.src}/scripts/**/*.js`)
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize images
gulp.task('images', () => {
  return gulp.src(`${PATH.public.src}/images/**/*`)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(`${PATH.public.dist}/images`))
    .pipe($.size({title: 'images'}));
});


/**
 * TODO: figure this out!!
 */
// Copy all files at the root level (app)
// gulp.task('copy', () => {
//   return gulp.src([
//     'app/*',
//     '!app/*.html',
//     'node_modules/apache-server-configs/dist/.htaccess'
//   ], {
//     dot: true
//   }).pipe(gulp.dest('dist'))
//     .pipe($.size({title: 'copy'}));
// });

// Copy web fonts to dist
gulp.task('fonts', () => {
  return gulp.src([`${PATH.public.src}/fonts/**`])
    .pipe(gulp.dest(`${PATH.public.dist}/fonts`))
    .pipe($.size({title: 'fonts'}));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    `${PATH.public.src}/**/*.scss`,
    // `${PATH.public.src}/styles/**/*.css`
  ])
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(DEFAULTS.autoprefixerBrowsers))
    .pipe(gulp.dest(PATH.public.dist))
    .pipe($.size({title: 'styles'}));

    /**
     * TODO: add production styles.serve and put in a different task
     */
    // .pipe($.changed('.tmp/styles', {extension: '.css'}))
    // .pipe($.sourcemaps.init())
    // .pipe(gulp.dest('.tmp'))
    // replace minifyCss with csso
    // .pipe($.if('*.css', $.minifyCss()))
    // Concatenate and minify styles
    // .pipe($.if('*.css', $.csso()))
    // .pipe($.sourcemaps.write())
    // .pipe(gulp.dest(PATH.public.dist))
    // .pipe($.size({title: 'styles'}));
});

// Concatenate and minify JavaScript
gulp.task('scripts', () => {
  return gulp.src([`${PATH.public.src}/scripts/main.js`])
    .pipe($.concat('main.min.js'))
    .pipe($.uglify({preserveComments: 'some'}))
    // Output files
    .pipe(gulp.dest(`${PATH.public.dist}/scripts`))
    .pipe($.size({title: 'scripts'}));
});


/**
 * TODO:
 * Setup a template watcher for angluar and server side templates
 */
//  // Scan your HTML for assets & optimize them
// gulp.task('html', () => {
//   const assets = $.useref.assets({searchPath: '{.tmp,app}'});
//
//   return gulp.src('app/**/*.html')
//     .pipe(assets)
//     // Remove any unused CSS
//     // Note: If not using the Style Guide, you can delete it from
//     // the next line to only include styles your project uses.
//     .pipe($.if('*.css', $.uncss({
//       html: [
//         'app/index.html'
//       ],
//       // CSS Selectors for UnCSS to ignore
//       ignore: [
//         /.navdrawer-container.open/,
//         /.app-bar.open/
//       ]
//     })))
//
//     // Concatenate and minify styles
//     // In case you are still using useref build blocks
//     .pipe($.if('*.css', $.minifyCss()))
//     .pipe(assets.restore())
//     .pipe($.useref())
//
//     // Minify any HTML
//     .pipe($.if('*.html', $.minifyHtml()))
//     // Output files
//     .pipe(gulp.dest('dist'))
//     .pipe($.size({title: 'html'}));
// });




gulp.task('nodemon', cb => {
  var called = false;
  return $.nodemon({
    script: PATH.server.bin,
    // watch core server file(s) that require server restart on change
    watch: ['app.js']
  })
    .on('start', () => {
      // ensure start only got called once
      if (!called) { cb() }
      called = true;
    })
    .on('restart', () => {
      // reload connected browsers after a slight delay
      setTimeout( () => {
        browserSync.reload({
          stream: false   //
        });
      }, DEFAULTS.browserSyncReloadDelay);
    });
});

gulp.task('browser-sync', ['nodemon'], () => {
  // browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'BrowserSync',
    // watch the following files; changes will be injected (css & images) or cause browser to refresh
    files: [`${PATH.public.dir}/**/*.*`, `${PATH.public.app}/**/*.js`],
    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: DEFAULTS.browserSync.proxy,
    // informs browser-sync to use the following port for the proxied app
    port: DEFAULTS.browserSync.port,
    // open the proxied app in chrome
    browser: DEFAULTS.browserSync.browser
  });
});


// Clean output directory
// .temp is removed for now
// gulp.task('clean', cb => del(['.tmp',`${PATH.public.dist}/*`, `!${PATH.public.dist}/.git`], {dot: true}, cb));
gulp.task('clean', cb => del([`${PATH.public.dist}/*`], {dot: true}, cb));


// Watch files for changes & reload
gulp.task('serve', ['styles', 'browser-sync'], () => {
  // gulp.watch([`${PATH.public.src}/**/*.html`], reload);
  gulp.watch([`${PATH.public.src}/styles/**/*.{scss,css}`], ['styles', reload]);
  gulp.watch([`${PATH.public.src}/scripts/**/*.js`], ['jshint']);
  gulp.watch([`${PATH.public.src}/images/**/*`], reload);
});


// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], () => {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,

    /**
     * TODO: Figure this out!!
     */
    server: 'dist',
    baseDir: 'dist'
  });
});

// Build production files, the default task
gulp.task('default', ['clean'], cb => {
  runSequence(
    'styles',
    // MODIFIED: not HTML task needed for MEAN Stack now, instead:
    // TODO-Later: make a task to optimize HTML templates!
    // TODO-Later: find a proper app structure to follow, copy task removed too
    // ['jshint', 'html', 'scripts', 'images', 'fonts', 'copy'],
    ['jshint','scripts', 'images'],
    // TODO-Later: findout what the f is a service worker you idot!
    // 'generate-service-worker',
    cb
  );
});

// Run PageSpeed Insights
gulp.task('pagespeed', cb => {
  // Update the below URL to the public URL of your site
  pagespeed(DEFAULTS.url, {
    strategy: 'mobile',
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', cb => {

  // const rootDir = 'dist';
  swPrecache({
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'monfa.red-project',
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${PATH.public.dist}/fonts/**/*.woff`,
      `${PATH.public.dist}/images/**/*`,
      `${PATH.public.dist}/scripts/**/*.js`,
      `${PATH.public.dist}/styles/**/*.css`,
      `${PATH.public.dist}/*.{html,json}`
    ],
    // Translates a static file path to the relative URL that it's served from.
    stripPrefix: path.join(PATH.public.dist, path.sep)
  }, (err, swFileContents) => {
    if (err) {
      cb(err);
      return;
    }

    const filepath = path.join(PATH.public.dist, 'service-worker.js');

    fs.writeFile(filepath, swFileContents, err => {
      if (err) {
        cb(err);
        return;
      }

      cb();
    });
  });
});

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
