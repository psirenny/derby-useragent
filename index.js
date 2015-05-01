var UAParser = require('ua-parser-js');

module.exports = function (app, opts) {
  if (!opts) opts = {};
  if (!opts.path) opts.path = '$useragent';

  app.get('*', function (page, model, params, next) {
    var parser = new UAParser();
    parser.setUA(page.req.headers['user-agent']);
    var result = parser.getResult();
    for (key in result) {
      model.set(opts.path + '.' + key, result[key]);
    }
    next();
  });
};
