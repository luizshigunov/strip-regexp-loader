'use strict';

var loaderUtils = require('loader-utils');

function constructRegex(key, value) {
  var rexp;

  switch (key) {
    case 'html':
      rexp = new RegExp('<!--[\\s\\S]*?-->', 'g');
      break;
    case 'debug':
      rexp = new RegExp('[\\t ]*\\/\\/>>debugStart[\\s\\S]*?\\/\\/>>debugEnd\\s*;?\\s*\\n?', 'g');
      break;
    case 'custom':
      rexp = new RegExp(value, 'gm');
      break;
  }
  return rexp;
}

function stripRegExps(context, source) {
  var options = context.options['strip-regexp-loader'] || loaderUtils.getOptions(context) || {};
  var stripRegexp = options.stripRegexp || {};

  for (var key in stripRegexp) {
    if (stripRegexp.hasOwnProperty(key) && stripRegexp[key]) {
      source = source.replace(constructRegex(key, stripRegexp[key]), '');
    }
  }

  if (context.cacheable) {
    context.cacheable(true);
  }

  return source;
}

module.exports = function (source, map) {
  this.callback(null, stripRegExps(this, source), map);
};
