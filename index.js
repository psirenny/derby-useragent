'use strict';

var _ = require('lodash');
var UAParser = require('ua-parser-js');

module.exports = function (options) {
  var defs = {path: '$useragent'};
  var opts = _.merge({}, defs, options || {});
  var uaparser = new UAParser();

  return function (page, model, params, next) {
    if (page.app.derby.util.isServer) {
      uaparser.setUA(page.req.headers['user-agent']);
    } else {
      uaparser.setUA(window.navigator.userAgent);
    }

    _.each(uaparser.getResult(), function (val, key) {
      model.set(opts.path + '.' + key, val);
    });

    next();
  };
};
