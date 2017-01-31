var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import _t from 'tcomb-forked';
/* global PRODUCTION */

export default function createAction(type, argsNamesOrHandler, data) {
  _assert(type, _t.String, 'type');

  _assert(argsNamesOrHandler, _t.union([_t.maybe(_t.list(_t.String)), _t.String, _t.Function]), 'argsNamesOrHandler');

  _assert(data, _t.maybe(_t.Object), 'data');

  if (argsNamesOrHandler && typeof argsNamesOrHandler !== 'function') {
    throw new Error('handler should be a function');
  }
  if (data) throw new Error('data is deprecated');


  let action;

  const typeofSecondArg = typeof argsNamesOrHandler;

  if (typeofSecondArg === 'function') {
    action = function action(...args) {
      return _extends({ type }, data, argsNamesOrHandler(...args));
    };
  } else {
    if (typeofSecondArg === 'string') {
      argsNamesOrHandler = argsNamesOrHandler.split(',');
    }

    if (argsNamesOrHandler) {
      action = function action(...args) {
        const action = _extends({ type }, data);
        args.forEach(function (value, index) {
          return action[argsNamesOrHandler[index]] = value;
        });
        return action;
      };
    } else {
      action = function action(args) {
        _assert(args, _t.maybe(_t.Object), 'args');

        return _extends({ type }, data, args);
      };
    }
  }

  action.type = type;
  action.toString = function () {
    return type;
  };

  return action;
}

function _assert(x, type, name) {
  if (_t.isType(type) && type.meta.kind !== 'struct') {
    if (!type.is(x)) {
      type(x, [name + ': ' + _t.getTypeName(type)]);
    }
  } else if (!(x instanceof type)) {
    _t.fail('Invalid value ' + _t.stringify(x) + ' supplied to ' + name + ' (expected a ' + _t.getTypeName(type) + ')');
  }

  return x;
}
//# sourceMappingURL=createAction.js.map