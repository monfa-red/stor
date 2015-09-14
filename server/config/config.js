export default {

  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://'
         + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/stor',
    options: {
      // user: '',
      // pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },

  secret: 'secret',
  // jwt token expiration time in minutes
  tokenExpiration: 60 * 5,

  http: {
    port: process.env.PORT || 3000
  },
  https: {
    port: false,
    // Paths to key and cert as string
    key: './server/config/cert/key.pem',
    cert: './server/config/cert/cert.pem'
  },

  // log: {
  //   // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
  //   format: 'dev',
  //   // Stream defaults to process.stdout
  //   // Uncomment to enable logging to a log on the file system
  //   options: {
  //     //stream: 'access.log'
  //   },
	app: {
    title: 'Stor',
    description: 'Open-Source Modern Full-Stack JavaScript e-commerce Application',
    keywords: 'stor, ecommerce, mean, es2015, angular2, express, node.js, mongodb',
    googleAnalyticsTrackingID:
      process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },

  templateEngine: 'swig',

  userTypes : ['admin', 'author', 'user'],

  // Session details
  // session expiration is set by default to 24 hours
  // sessionExpiration: 24 * (60 * 1000),
  // sessionSecret should be changed for security measures and concerns
  // sessionSecret: 'STOR',
  // sessionKey is set to the generic sessionId key used by PHP applications
  // for obsecurity reasons
  // sessionKey: 'sessionId',
  // sessionCollection: 'sessions',
  // logo: 'PATH/TO/SRC/logo.png',
  favicon: 'PATH/TO/SRC/favicon.ico',

  //files
  //TODO: structure will change, it's just for test
  files: {
    server: {
      init: './index',
      all: 'server',
      views: 'server/core/*/views/',
      routes: [
        // 'server/api/!(core)/routes/**/*.js',
        'server/api/*/routes/**/*.js',
        'server/core/auth/routes/**/*.js',
        'server/core/system/routes/**/*.js'
      ],
      models: 'server/api/*/models/**/*.js',
      strategies: 'server/core/auth/strategies/**/*.js'
      // strategies: 'server/api/auth/strategies/**/*.js'
    },
    client: {
      src: {
        all: 'client',
        app: 'client/app',
        assets: 'client/assets',
        lib: {
          all: '',
          angular: [
            // Order is quite important here for the HTML tag injection.
            './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
            './node_modules/es6-module-loader/dist/es6-module-loader-dev.js',
            './node_modules/es6-module-loader/dist/es6-module-loader-dev.js.map',
            './node_modules/reflect-metadata/Reflect.js',
            './node_modules/reflect-metadata/Reflect.js.map',
            './node_modules/systemjs/dist/system.src.js',
            'client/app/system.config.js',
            './node_modules/angular2/bundles/angular2.dev.js',
            './node_modules/angular2/bundles/router.dev.js',
            './node_modules/angular2/bundles/router.dev.js.map',
            './node_modules/angular2/bundles/http.dev.js'
          ]
        }
      },
      dist: {
        all: 'dist',
        app: 'dist/app',
        assets: 'dist/assets',
        lib: {
          all: 'dist/lib',
          angular: 'dist/lib/angular',
          js: [
            'dist/app/*module.js',
            'dist/app/*.js',
            'dist/app/shared/**/*.js',
            'dist/app/**/*module.js',
            'dist/app/**/*service.js',
            'dist/app/**/*.js'
          ],
          css: [
            'dist/lib/material-design-lite/material.css',
            'dist/assets/styles/**/*.css'
          ]
        }
      },
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/api/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/api/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/api/auth/google/callback'
  },

  oAuthFailureRedirect: '/auth/signup',

}
