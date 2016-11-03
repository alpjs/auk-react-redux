import render from 'fody';
import Logger from 'nightingale-logger';
import { createStore } from 'redux';
import AlpLayout from './layout/AlpLayout';
import AlpReactApp from './AlpReactApp';
import AlpReduxApp from './AlpReduxApp';


export { AlpReactApp, AlpReduxApp };
export { Helmet } from 'fody';
export { combineReducers } from 'redux';
export { connect } from 'react-redux';
import _createPureStatelessComponent from 'react-pure-stateless-component';
export { _createPureStatelessComponent as createPureStatelessComponent };

export { createAction, createReducer, createLoader } from './utils';
export { AlpHtml, AlpLayout, AlpHead, AlpBody } from './layout';

throw new Error('Not supposed to be loaded browser-side.');

var logger = new Logger('alp:react-redux');

// https://www.npmjs.com/package/babel-preset-modern-browsers
var agents = [{ name: 'Edge', regexp: /edge\/([\d]+)/i, modernMinVersion: 14 }, { name: 'Firefox', regexp: /firefox\/([\d]+)/i, modernMinVersion: 47 }, { name: 'Chrome', regexp: /chrom(?:e|ium)\/([\d]+)/i, modernMinVersion: 51 }, // also works for opera.
{ name: 'Safari', regexp: /version\/([\d\w.-]+).*safari/i, modernMinVersion: 10 }];

export default function alpReactRedux() {
  var Layout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : AlpLayout;

  return app => {
    app.context.render = function (moduleDescriptor, data, _loaded) {
      logger.debug('render view', { data });

      if (!_loaded && moduleDescriptor.loader) {
        // const _state = data;
        return moduleDescriptor.loader(Object.create(null), data).then(data => this.render(moduleDescriptor, data, true));
      }

      if (moduleDescriptor.reducer) {
        this.store = createStore(moduleDescriptor.reducer, data);
      }

      var version = this.config.get('version');
      var moduleIdentifier = moduleDescriptor && moduleDescriptor.identifier;

      this.body = render({
        Layout,
        layoutProps: {
          version,
          moduleIdentifier,
          scriptName: (() => {
            // TODO create alp-useragent with getter in context
            var ua = this.req.headers['user-agent'];

            if (agents.some(agent => {
              var res = agent.regexp.exec(ua);
              return res && res[1] >= agent.modernMinVersion;
            })) {
              return 'modern-browsers';
            }

            return 'es5';
          })(),
          initialBrowserContext: this.computeInitialContextForBrowser(),
          initialData: moduleDescriptor.reducer ? this.store.getState() : null
        },

        App: moduleDescriptor.reducer ? AlpReduxApp : AlpReactApp,
        appProps: {
          store: this.store,
          context: this
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