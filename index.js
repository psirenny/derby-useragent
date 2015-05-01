var _ = require('lodash');
var UAParser = require('ua-parser-js');

module.exports = function (app, options) {
  var defs = {path: '$useragent'};
  var opts = _.merge({}, defs, options || {});

  app.get('*', function (page, model, params, next) {
    var parser = new UAParser();
    parser.setUA(page.req.headers['user-agent']);
    var result = parser.getResult();
    _.each(parser.getResult(), function (val, key) {
      model.set(opts.path + '.' + key, val);
    });
    next();
  });
};
