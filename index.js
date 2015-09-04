'use strict';

var _ = require('lodash');
var UAParser = require('ua-parser-js');

module.exports = function (options) {
  var defs = {path: '$useragent'};
  var opts = _.merge({}, defs, options || {});

  return function (page, model, params, next) {
    var parser = new UAParser();

    if (page.app.derby.util.isServer) {
      parser.setUA(page.req.headers['user-agent']);
    } else {
      parser.setUA(window.navigator.userAgent);
    }

    _.each(parser.getResult(), function (val, key) {
      model.set(opts.path + '.' + key, val);
    });

    next();
  };
};
