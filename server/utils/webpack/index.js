const isProd = process.env.NODE_ENV === 'production';

module.exports = (app) => {
  if (isProd) {
    require('./webpack-prod.js')(app);
  } else {
    require('./webpack-dev.js')(app);
  }
}

