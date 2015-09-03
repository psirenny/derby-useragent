Derby Useragent
===============

User agent detection for [Derby JS](http://derbyjs.com). Works on the server or the browser.

Installation
------------

    npm install derby-useragent --save

Usage
-----

Add the middleware:

    var app = derby.createApp('...', __filename);
    app.get('*', require('derby-useragent')());

Access the useragent data:

    app.get('*', function (page, model, params, next) {
      var supportedBrowsers = ['Chrome', 'Firefox', 'Safari'];
      var currentBrowser = model.get('$useragent.browser.name');
      if (!_.includes(supportedBrowsers, currentBrowser)) return next();
      page.render();
    });

Options
-------

**path** - Specify the path to set useragent data. Defaults to **$useragent**.
