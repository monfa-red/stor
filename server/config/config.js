export default {

  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://'
         + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mn-s',
    options: {
      // user: '',
      // pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },

  secret: 'secret',

  http: {
    port: process.env.PORT || 3000
  },
  https: {
    port: false,
    // Paths to key and cert as string
    ssl: {
      key: './server/config/cert/key.pem',
      cert: './server/config/cert/cert.pem'
    }
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

  userTypes = ['admin', 'author', 'user'],

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
      views: 'server/modules/*/views/',
      routes: [
        'server/modules/!(core)/routes/**/*.js',
        'server/modules/core/routes/**/*.js'
      ],
      models: 'server/modules/*/models/**/*.js',
      strategies: 'server/modules/auth/strategies/**/*.js'
    },
    client: {
      static: 'public',
      lib: {
        js: [
          'public/lib/angular/angular.min.js',
          'public/lib/angular-resource/angular-resource.js',
          'public/lib/angular-new-router/dist/router.es5.js',
          'public/app/*module.js',
          'public/app/*.js',
          'public/app/shared/**/*.js',
          'public/app/**/*module.js',
          'public/app/**/*service.js',
          'public/app/**/*.js',
        ],
        sass: 'public/assets/src/**/*.scss',
        css: [
          'public/lib/material-design-lite/material.css',
          'public/assets/dist/*/**/*.css'
        ]
      }
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
