'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'layout/AlpLayout.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _types = require('fody/types');

var _fody = require('fody');

var _AlpHead = require('./AlpHead');

var _AlpHead2 = _interopRequireDefault(_AlpHead);

var _AlpBody = require('./AlpBody');

var _AlpBody2 = _interopRequireDefault(_AlpBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = (_ref) => {
  var _assert2 = _assert(_ref, _types.LayoutPropsType, '{ helmet, content, ...props }');

  let helmet = _assert2.helmet,
      content = _assert2.content,
      props = _objectWithoutProperties(_assert2, ['helmet', 'content']);

  _assert({
    helmet,
    content,
    props
  }, _types.LayoutPropsType, '{ helmet, content, ...props }');

  return _assert((() => {
    return _react2.default.createElement(
      _fody.Html,
      { helmet: helmet, __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      },
      _react2.default.createElement(_AlpHead2.default, _extends({ helmet: helmet }, props, {
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      })),
      _react2.default.createElement(
        _AlpBody2.default,
        {
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 9
          }
        },
        _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: content }, __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 10
          }
        })
      )
    );
  })(), _types.ReactElementType, 'return value');
};

function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _tcombForked2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcombForked2.default.getTypeName(type) + ')';
  }

  if (_tcombForked2.default.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcombForked2.default.getTypeName(type)]);

      _tcombForked2.default.fail(message());
    }
  } else if (!(x instanceof type)) {
    _tcombForked2.default.fail(message());
  }

  return x;
}
//# sourceMappingURL=AlpLayout.js.map