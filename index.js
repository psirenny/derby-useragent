'use strict';

var _ = require('lodash');
var UAParser = require('ua-parser-js');

module.exports = function (options) {
  var defs = {path: '$useragent'};
  var opts = _.merge({}, defs, options || {});

  return function (page, model, params, next) {
    var parser = new UAParser();

    if (!page.app.derby.util.isServer) {
      _.set(page, 'req.headers.user-agent', window.navigator.userAgent);
    }

    parser.setUA(page.req.headers['user-agent']);

    _.each(parser.getResult(), function (val, key) {
      model.set(opts.path + '.' + key, val);
    });

    next();
  };
};
