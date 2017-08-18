function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) keys.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(obj, i) && (target[i] = obj[i]); return target; }

import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import reactTreeWalker from 'react-tree-walker';
import Logger from 'nightingale-logger';
import isModernBrowser from 'modern-browsers';
import htmlLayout from './layout/htmlLayout';
import createAlpAppWrapper from './createAlpAppWrapper';
import createServerStore from './store/createServerStore';
import createModuleVisitor from './module/createModuleVisitor';

export { Helmet };
export { combineReducers } from 'redux';
export { connect } from 'react-redux';
export { createAction, createReducer, createLoader, classNames, createPureStatelessComponent, identityReducer } from './utils/index';
import _AlpModule from './module/AlpModule';
export { _AlpModule as AlpModule };
import _AlpReduxModule from './module/AlpReduxModuleServer';
export { _AlpReduxModule as AlpReduxModule };
import _Body from './layout/Body';
export { _Body as Body };
import _AppContainer from './layout/AppContainer';
export { _AppContainer as AppContainer };


const logger = new Logger('alp:react-redux');

const renderHtml = (app, options) => {
  const content = renderToString(app);
  const helmet = Helmet.renderStatic();
  return htmlLayout(helmet, content, options);
};

export default ((App, options = {}) => async ctx => {
  const version = ctx.config.get('version');
  // TODO create alp-useragent with getter in context
  const ua = ctx.req.headers['user-agent'];
  const name = isModernBrowser(ua) ? 'modern-browsers' : 'es5';

  const app = React.createElement(App);
  const moduleVisitor = createModuleVisitor();

  const PreRenderWrappedApp = createAlpAppWrapper(app, { context: ctx, store: { getState: () => ({ ctx }) } });
  await reactTreeWalker(React.createElement(PreRenderWrappedApp), moduleVisitor.visitor);


  const store = createServerStore(ctx, moduleVisitor.getReducers(), {
    sharedReducers: options.sharedReducers
  });

  const WrappedApp = createAlpAppWrapper(app, { context: ctx, store });

  // eslint-disable-next-line no-unused-vars
  const _store$getState = store.getState(),
        { ctx: removeCtxFromInitialData } = _store$getState,
        initialData = _objectWithoutProperties(_store$getState, ['ctx']);
  ctx.body = await renderHtml(React.createElement(WrappedApp), {
    version,
    scriptName: options.scriptName === void 0 ? name : options.scriptName,
    styleName: options.styleName === void 0 ? name : options.styleName,
    polyfillFeatures: options.polyfillFeatures,
    initialData
  });
});

const loggerWebsocket = logger.child('websocket');

export function emitAction(to, action) {
  loggerWebsocket.debug('emitAction', action), to.emit('redux:action', action);
}
//# sourceMappingURL=index.js.map