import render from 'fody';
import Logger from 'nightingale-logger';
import { createStore } from 'redux';
import AlpHelmetHtml from './AlpHelmetHtml';
import AlpReactApp from './AlpReactApp';
import AlpReduxApp from './AlpReduxApp';

export { AlpHelmetHtml, AlpReactApp, AlpReduxApp };
export { Helmet } from 'fody';
export { combineReducers } from 'redux';
export { connect } from 'react-redux';
import _createPureStatelessComponent from 'react-pure-stateless-component';
export { _createPureStatelessComponent as createPureStatelessComponent };
import _createAction from './createAction';
export { _createAction as createAction };
import _createReducer from './createReducer';
export { _createReducer as createReducer };
import _createLoader from './createLoader';
export { _createLoader as createLoader };
import _Script from './helmet/Script';
export { _Script as Script };
import _Stylesheet from './helmet/Stylesheet';
export { _Stylesheet as Stylesheet };
throw new Error('Not supposed to be loaded browser-side.');

var logger = new Logger('alp:react-redux');

// https://www.npmjs.com/package/babel-preset-modern-browsers
var agents = [{ name: 'Edge', regexp: /edge\/([\d]+)/i, modernMinVersion: 14 }, { name: 'Firefox', regexp: /firefox\/([\d]+)/i, modernMinVersion: 47 }, { name: 'Chrome', regexp: /chrom(?:e|ium)\/([\d]+)/i, modernMinVersion: 51 }, // also works for opera.
{ name: 'Safari', regexp: /version\/([\d\w.-]+).*safari/i, modernMinVersion: 10 }];

export default function alpReactRedux() {
  var Html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : AlpHelmetHtml;

  return function (app) {
    app.context.render = function (moduleDescriptor, data, _loaded) {
      var _this = this;

      logger.debug('render view', { data: data });

      if (!_loaded && moduleDescriptor.loader) {
        // const _state = data;
        return moduleDescriptor.loader(Object.create(null), data).then(function (data) {
          return _this.render(moduleDescriptor, data, true);
        });
      }

      if (moduleDescriptor.reducer) {
        this.store = createStore(moduleDescriptor.reducer, data);
      }

      this.body = render({
        Html: Html,
        App: moduleDescriptor.reducer ? AlpReduxApp : AlpReactApp,
        appProps: {
          store: this.store,
          context: this,
          moduleDescriptor: moduleDescriptor,
          get scriptName() {
            // TODO create alp-useragent with getter in context
            var ua = this.context.req.headers['user-agent'];

            if (agents.some(function (agent) {
              var res = agent.regexp.exec(ua);
              return res && res[1] >= agent.modernMinVersion;
            })) {
              return 'modern-browsers';
            }

            return 'es5';
          },
          initialBrowserContext: this.computeInitialContextForBrowser(),
          initialData: moduleDescriptor.reducer ? this.store.getState() : null
        },
        View: moduleDescriptor.View,
        props: moduleDescriptor.reducer ? undefined : data
      });
    };
  };
}

export function emitAction(to, action) {
  to.emit('redux:action', action);
}
//# sourceMappingURL=index.js.map