var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'layout/Stylesheet.jsx',
    _this = this;

import React from 'react';
import _t from 'tcomb-forked';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import assetUrl from './assetUrl';

var PropsType = _t.interface({
  href: _t.String
}, 'PropsType');

var ContextType = _t.interface({
  context: _t.interface({
    config: Map
  })
}, 'ContextType');

export default (function stylesheet(_ref, { context }) {
  var { href } = _ref;

  var props = _objectWithoutProperties(_ref, ['href']);

  _assert({
    href,
    props
  }, PropsType, '{ href, ...props }');

  _assert({
    context
  }, ContextType, '{ context }');

  var version = context.config.get('version');

  return React.createElement('link', _extends({ rel: 'stylesheet', href: assetUrl(href, version) }, props, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }));
});

function _assert(x, type, name) {
  if (false) {
    _t.fail = function (message) {
      console.warn(message);
    };
  }

  if (_t.isType(type) && type.meta.kind !== 'struct') {
    if (!type.is(x)) {
      type(x, [name + ': ' + _t.getTypeName(type)]);
    }
  } else if (!(x instanceof type)) {
    _t.fail('Invalid value ' + _t.stringify(x) + ' supplied to ' + name + ' (expected a ' + _t.getTypeName(type) + ')');
  }

  return x;
}
//# sourceMappingURL=Stylesheet.js.map