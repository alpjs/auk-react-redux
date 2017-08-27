import BrowserAppContainer from 'alp-dev/BrowserAppContainer';
import contentLoaded from 'content-loaded';
import React from 'react';
import { render } from 'react-dom';
import Helmet from 'react-helmet';
import reactTreeWalker from 'react-tree-walker';
import Logger from 'nightingale-logger';
import createAlpAppWrapper from './createAlpAppWrapper';
import createBrowserStore from './store/createBrowserStore';
import createBrowserModuleStoreReducer from './store/createBrowserModuleStoreReducer';
import createModuleVisitor from './module/createModuleVisitor';
import { ReduxActionType as _ReduxActionType } from './types';

import t from 'flow-runtime';
const ReduxActionType = t.tdz(() => _ReduxActionType);
export { Helmet };
export { combineReducers } from 'redux';
export { connect } from 'react-redux';
export { createAction, createReducer, createLoader, classNames, createPureStatelessComponent, identityReducer } from './utils/index';
import _AlpModule from './module/AlpModule';
export { _AlpModule as AlpModule };
import _AlpReduxModule from './module/AlpReduxModuleBrowser';
export { _AlpReduxModule as AlpReduxModule };
import _Body from './layout/Body';
export { _Body as Body };
import _AppContainer from './layout/AppContainer';
export { _AppContainer as AppContainer };


const logger = new Logger('alp:react-redux');

const renderApp = App => render(React.createElement(App), document.getElementById('react-app'));

const preRender = async (ctx, appElement) => {
  const moduleVisitor = createModuleVisitor();

  const PreRenderWrappedApp = createAlpAppWrapper(appElement, {
    context: ctx,
    store: { getState: () => ({ ctx }) }
  });
  await reactTreeWalker(React.createElement(PreRenderWrappedApp), moduleVisitor.visitor);

  return moduleVisitor.getReducers();
};

export default (function browser(app) {
  app.reduxReducers = {
    loading: (state = 0, action) => {
      let _stateType = t.nullable(t.number());

      let _actionType = t.ref(ReduxActionType);

      t.param('state', _stateType).assert(state);
      t.param('action', _actionType).assert(action);

      if (action.meta && action.meta.loading !== undefined) {
        return state + (action.meta.loading ? 1 : -1);
      }
      return state;
    }
  };
  app.reduxMiddlewares = [];

  return {
    renderApp: async (App, { middlewares = [], sharedReducers } = {}) => {
      let store;
      let moduleStoreReducer;

      const createStore = (ctx, moduleReducers) => {
        moduleStoreReducer = createBrowserModuleStoreReducer(moduleReducers);
        const store = createBrowserStore(app, ctx, moduleStoreReducer.reducer, {
          middlewares,
          sharedReducers
        });
        app.store = store;
        window.store = store;
        return store;
      };

      const ctx = app.createContext();

      const render = async App => {
        let appElement = React.createElement(App);

        appElement = React.createElement(BrowserAppContainer, {}, appElement);


        const moduleReducers = await preRender(ctx, appElement);

        store = createStore(ctx, moduleReducers);


        const WrappedApp = createAlpAppWrapper(appElement, {
          context: ctx,
          store,
          setModuleReducers: reducers => moduleStoreReducer.set(store, reducers)
        });

        await contentLoaded();
        renderApp(WrappedApp);
        logger.success('rendered');
      };

      await render(App);

      return render;
    }
  };
});
//# sourceMappingURL=browser.js.map