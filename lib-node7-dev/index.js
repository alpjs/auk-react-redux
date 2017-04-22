'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPureStatelessComponent = exports.classNames = exports.createLoader = exports.createReducer = exports.createAction = exports.connect = exports.combineReducers = exports.Helmet = exports.AlpReduxApp = exports.AlpReactApp = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'index.jsx';

var _redux = require('redux');

Object.defineProperty(exports, 'combineReducers', {
  enumerable: true,
  get: function () {
    return _redux.combineReducers;
  }
});

var _reactRedux = require('react-redux');

Object.defineProperty(exports, 'connect', {
  enumerable: true,
  get: function () {
    return _reactRedux.connect;
  }
});

var _utils = require('./utils');

Object.defineProperty(exports, 'createAction', {
  enumerable: true,
  get: function () {
    return _utils.createAction;
  }
});
Object.defineProperty(exports, 'createReducer', {
  enumerable: true,
  get: function () {
    return _utils.createReducer;
  }
});
Object.defineProperty(exports, 'createLoader', {
  enumerable: true,
  get: function () {
    return _utils.createLoader;
  }
});
Object.defineProperty(exports, 'classNames', {
  enumerable: true,
  get: function () {
    return _utils.classNames;
  }
});
Object.defineProperty(exports, 'createPureStatelessComponent', {
  enumerable: true,
  get: function () {
    return _utils.createPureStatelessComponent;
  }
});
exports.default = alpReactRedux;
exports.emitAction = emitAction;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

var _modernBrowsers = require('modern-browsers');

var _modernBrowsers2 = _interopRequireDefault(_modernBrowsers);

var _htmlLayout = require('./layout/htmlLayout');

var _htmlLayout2 = _interopRequireDefault(_htmlLayout);

var _AlpReactApp = require('./layout/AlpReactApp');

var _AlpReactApp2 = _interopRequireDefault(_AlpReactApp);

var _AlpReduxApp = require('./layout/AlpReduxApp');

var _AlpReduxApp2 = _interopRequireDefault(_AlpReduxApp);

var _reducers = require('./reducers');

var alpReducers = _interopRequireWildcard(_reducers);

var _types = require('./types');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const ReactComponentType = _flowRuntime2.default.tdz(() => _types.ReactComponentType);

const ModuleDescriptorType = _flowRuntime2.default.tdz(() => _types.ModuleDescriptorType);

const LayoutOptionsType = _flowRuntime2.default.tdz(() => _htmlLayout.LayoutOptionsType);

exports.AlpReactApp = _AlpReactApp2.default;
exports.AlpReduxApp = _AlpReduxApp2.default;
exports.Helmet = _reactHelmet2.default;


const logger = new _nightingaleLogger2.default('alp:react-redux');

const renderToStringApp = (App, appProps, View, props) => {
  const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.string());

  const app = _react2.default.createElement(
    App,
    _extends({}, appProps, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      }
    }),
    _react2.default.createElement(View, _extends({}, props, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      }
    }))
  );
  return _returnType.assert((0, _server.renderToString)(app));
};

const AppOptionsType = _flowRuntime2.default.type('AppOptionsType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('App', _flowRuntime2.default.ref(ReactComponentType)), _flowRuntime2.default.property('appProps', _flowRuntime2.default.object()), _flowRuntime2.default.property('View', _flowRuntime2.default.ref(ReactComponentType)), _flowRuntime2.default.property('props', _flowRuntime2.default.nullable(_flowRuntime2.default.object())), _flowRuntime2.default.property('layoutOptions', _flowRuntime2.default.nullable(_flowRuntime2.default.ref(LayoutOptionsType)))));

const renderHtml = _arg => {
  let { App, appProps, View, props, layoutOptions } = AppOptionsType.assert(_arg);

  const content = renderToStringApp(App, appProps, View, props);
  const helmet = _reactHelmet2.default.renderStatic();
  return `<!doctype html>\n${(0, _htmlLayout2.default)(helmet, content, layoutOptions)}`;
};

const OptionsType = _flowRuntime2.default.type('OptionsType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('layoutBody', _flowRuntime2.default.nullable(_flowRuntime2.default.function())), _flowRuntime2.default.property('appHOC', _flowRuntime2.default.nullable(_flowRuntime2.default.function())), _flowRuntime2.default.property('sharedReducers', _flowRuntime2.default.nullable(_flowRuntime2.default.object()))));

function alpReactRedux(_arg2 = {}) {
  let { layoutBody, appHOC, sharedReducers = {} } = OptionsType.assert(_arg2);

  const AlpReactAppLayout = appHOC ? appHOC(_AlpReactApp2.default) : _AlpReactApp2.default;
  const AlpReduxAppLayout = appHOC ? appHOC(_AlpReduxApp2.default) : _AlpReduxApp2.default;

  return app => {
    let _appType = _flowRuntime2.default.object();

    _flowRuntime2.default.param('app', _appType).assert(app);

    app.context.render = function (moduleDescriptor, data, _loaded) {
      let _moduleDescriptorType = _flowRuntime2.default.ref(ModuleDescriptorType);

      let _dataType = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('moduleDescriptor', _moduleDescriptorType).assert(moduleDescriptor);

      _flowRuntime2.default.param('data', _dataType).assert(data);

      logger.debug('render view', { data });

      if (!_loaded && moduleDescriptor.loader) {
        // const _state = data;
        return moduleDescriptor.loader(Object.create(null), data).then(data => this.render(moduleDescriptor, data, true));
      }

      const moduleHasReducers = !!(moduleDescriptor.reducer || moduleDescriptor.reducers);
      const reducer = moduleDescriptor.reducer ? moduleDescriptor.reducer : (0, _redux.combineReducers)(Object.assign({}, moduleDescriptor.reducers, alpReducers, sharedReducers));

      if (reducer) {
        this.store = (0, _redux.createStore)(reducer, Object.assign({ context: this }, data));
      }

      const version = _flowRuntime2.default.string().assert(this.config.get('version'));
      const moduleIdentifier = _flowRuntime2.default.nullable(_flowRuntime2.default.string()).assert(moduleDescriptor && moduleDescriptor.identifier);

      // eslint-disable-next-line no-unused-vars
      const _ref = moduleHasReducers ? this.store.getState() : {},
            { context: unusedContext } = _ref,
            initialData = _objectWithoutProperties(_ref, ['context']);

      // TODO create alp-useragent with getter in context
      const ua = this.req.headers['user-agent'];
      const name = (0, _modernBrowsers2.default)(ua) ? 'modern-browsers' : 'es5';

      this.body = renderHtml({
        layoutOptions: {
          layoutBody,
          version,
          moduleIdentifier,
          scriptName: name,
          styleName: name,
          initialBrowserContext: this.computeInitialContextForBrowser(),
          initialData: moduleHasReducers ? initialData : null
        },

        App: reducer ? AlpReduxAppLayout : AlpReactAppLayout,
        appProps: {
          store: this.store,
          context: this
        },

        View: moduleDescriptor.View,
        props: moduleHasReducers ? undefined : data
      });
    };
  };
}

const loggerWebsocket = logger.child('websocket');

function emitAction(to, action) {
  loggerWebsocket.debug('emitAction', action);
  to.emit('redux:action', action);
}
//# sourceMappingURL=index.js.map