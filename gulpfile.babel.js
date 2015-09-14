'use strict';

/**
 * Module dependencies
 */
import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
// import swPrecache from 'sw-precache';
// import { output as pagespeed } from 'psi';
import pkg from './package.json';
import { files as PATH } from './server/config/config';


/**
 * Constants
 */
const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const join = path.join;
const DEFAULTS = {
  // url: 'some-url.com',
  browserSync: {
    proxy: 'http://localhost:3000',
    port: 4000,
    browser: ['google chrome'],
    startReloadDelay: 2000,
    logPrefix: 'BrowserSync',
    ghostMode: false,
    open: false,
  },
  autoprefixerBrowsers: [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 35',
    'chrome >= 40',
    'safari >= 8',
    'ios >= 8',
    'android >= 4.4',
    'bb >= 10'
  ]
};


/**
 * TypeScript config
 */
let tsProject = $.typescript.createProject('tsconfig.json', {
  typescript: require('typescript')
});


/**
 * Clean the dist folder
 */
gulp.task('clean', (callback) => {
  del([`${PATH.client.dist.all}/*`, '!' + PATH.client.dist.lib.all,
       `!${PATH.client.dist.lib.all}/*`], callback);
});

gulp.task('clean.all', (callback) => {
  del(PATH.client.dist.all, callback);
});


/**
 * Build development
 */
gulp.task('typescript', () => {
  let result = gulp.src([
      join(PATH.client.src.app, '**/*.ts'),
      '!' + join(PATH.client.src.app, '**/*_spec.ts')
    ])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.typescript(tsProject));

  return result.js
    .pipe($.sourcemaps.write())
    // .pipe($.changed(PATH.client.dist.app, {extension: '.js'}))
    .pipe(gulp.dest(PATH.client.dist.app));
});


/**
 * Libraries
 */
gulp.task('lib', function () {
  return gulp.src(PATH.client.src.lib.angular)
    .pipe($.changed(PATH.client.dist.lib.angular))
    .pipe(gulp.dest(PATH.client.dist.lib.angular));
});



/**
 * Copy html templates
 */
gulp.task('html', () => {
  return gulp.src(`${PATH.client.src.app}/**/*.html`)
    .pipe($.changed(PATH.client.dist.app))
    .pipe(gulp.dest(PATH.client.dist.app))
    .pipe($.size({title: 'html'}));
})


/**
 * Optimize images
 */
gulp.task('images', () => {
  return gulp.src(`${PATH.client.src.assets}/images/**/*`)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe($.changed(`${PATH.client.dist.assets}/images`))
    .pipe(gulp.dest(`${PATH.client.dist.assets}/images`))
    .pipe($.size({title: 'images'}));
});


// Lint JavaScript
// gulp.task('jshint', () => {
//   return gulp.src(`${PATH.client.src.app}/**/*.js`)
//     .pipe(reload({stream: true, once: true}))
//     .pipe($.jshint())
//     .pipe($.jshint.reporter('jshint-stylish'))
//     .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
// });


/**
 * Copy web fonts to dist
 */
gulp.task('fonts', () => {
  return gulp.src([`${PATH.client.src.assets}/fonts/**`])
    .pipe(gulp.dest(`${PATH.client.dist.assets}/fonts`))
    .pipe($.size({title: 'fonts'}));
});


/**
 * Compile and automatically prefix stylesheets
 */
gulp.task('styles', () => {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
      `${PATH.client.src.assets}/**/*.scss`,
    ])
    .pipe($.sass({precision: 10}).on('error', $.sass.logError))
    .pipe($.autoprefixer(DEFAULTS.autoprefixerBrowsers))
    .pipe(gulp.dest(PATH.client.dist.assets))
    .pipe($.size({title: 'styles'}));

    // TODO: add production styles.serve and put in a different task
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


/**
 * Watch for changes
 */
gulp.task('watch', () => {

  gulp
    .watch(`${PATH.client.src.app}/**/*.html`, () => {
      runSequence('html', reload);
    });

  gulp.watch(`${PATH.client.src.app}/**/*.ts`, () => {
    runSequence('typescript', reload);
  });

  gulp.watch(`${PATH.client.src.assets}/styles/**/*.scss`, ['styles']);
  gulp.watch(`${PATH.client.src.assets}/images/**/*.*`, ['images']);

});


/**
 * Reload node serverside app
 */
gulp.task('nodemon', cb => {
  var called = false;
  return $.nodemon({
      script: PATH.server.init,
      ext: 'js',
      ignore: [
        `${PATH.client.src.all}/*`,
        `${PATH.client.dist.all}/*`
      ]
    })
    .on('start', () => {
      // ensure start only got called once
      if (!called) cb()
      called = true;
    })
    .on('restart', () => {
      // reload connected browsers after a slight delay
      setTimeout(() => {
        reload({
          stream: false
        });
      }, DEFAULTS.browserSync.startReloadDelay);
    });
});


/**
 * Reload browsers
 */
gulp.task('browser-sync', () => {
  browserSync.init({
    notify: false,
    logPrefix: DEFAULTS.browserSynclogPrefix,
    // watch changes will be injected (css & images) or cause browser to refresh
    files: [
        `${PATH.client.dist.assets}/styles/*.css`,
        `${PATH.client.dist.assets}/images/*.*`
    ],
    proxy: DEFAULTS.browserSync.proxy,
    port: DEFAULTS.browserSync.port,
    ghostMode: DEFAULTS.browserSync.ghostMode,
    open: DEFAULTS.browserSync.open,
    // browser: DEFAULTS.browserSync.browser
  });
});


/**
 * Default task for development (will change!)
 */
gulp.task('default', () => {
  runSequence(
    'clean',
    ['styles', 'images', 'html', 'lib', 'typescript'],
    'nodemon',
    'browser-sync',
    'watch'
  );
});


/**
 * Bump application version
 */
gulp.task('bump', () => {
  gulp.src(['./bower.json', './package.json'])
  .pipe($.bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});
gulp.task('bump.minor', () => {
  gulp.src(['./bower.json', './package.json'])
  .pipe($.bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});
gulp.task('bump.major', () => {
  gulp.src(['./bower.json', './package.json'])
  .pipe($.bump({type:'major'}))
  .pipe(gulp.dest('./'));
});




// Concatenate and minify JavaScript
// gulp.task('scripts', () => {
//   return gulp.src([`${PATH.public.src}/scripts/main.js`])
//     .pipe($.concat('main.min.js'))
//     .pipe($.uglify({preserveComments: 'some'}))
//     // Output files
//     .pipe(gulp.dest(`${PATH.public.dist}/scripts`))
//     .pipe($.size({title: 'scripts'}));
// });



 // Scan your HTML for assets & optimize them
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



// // Run PageSpeed Insights
// gulp.task('pagespeed', cb => {
//   // Update the below URL to the public URL of your site
//   pagespeed(DEFAULTS.url, {
//     strategy: 'mobile',
//     // By default we use the PageSpeed Insights free (no API key) tier.
//     // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
//     // key: 'YOUR_API_KEY'
//   }, cb);
// });
//
// // See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// // an in-depth explanation of what service workers are and why you should care.
// // Generate a service worker file that will provide offline functionality for
// // local resources. This should only be done for the 'dist' directory, to allow
// // live reload to work as expected when serving from the 'app' directory.
// gulp.task('generate-service-worker', cb => {
//
//   // const rootDir = 'dist';
//   swPrecache({
//     // Used to avoid cache conflicts when serving on localhost.
//     cacheId: pkg.name || 'monfa.red-project',
//     staticFileGlobs: [
//       // Add/remove glob patterns to match your directory setup.
//       `${PATH.client.dist.assets}/fonts/**/*.woff`,
//       `${PATH.client.dist.assets}/images/**/*`,
//       `${PATH.client.dist.assets}/scripts/**/*.js`,
//       `${PATH.client.dist.assets}/styles/**/*.css`,
//       `${PATH.client.dist.assets}/*.{html,json}`
//     ],
//     // Translates a static file path to the relative URL that it's served from.
//     stripPrefix: path.join(PATH.client.dist.assets, path.sep)
//   }, (err, swFileContents) => {
//     if (err) {
//       cb(err);
//       return;
//     }
//
//     const filepath = path.join(PATH.client.dist.assets, 'service-worker.js');
//
//     fs.writeFile(filepath, swFileContents, err => {
//       if (err) {
//         cb(err);
//         return;
//       }
//
//       cb();
//     });
//   });
// });

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
