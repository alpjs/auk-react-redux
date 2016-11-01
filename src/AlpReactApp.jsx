/* eslint-disable prefer-template */
/* global window */
import { Helmet, App as DefaultApp } from 'fody/src';
import uneval from './uneval';
import assetUrl from './helmet/assetUrl';
import type { ReactNodeType, ModuleDescriptorType } from './types';

type PropsType = {
  children: ReactNodeType,
  context: Object,
  moduleDescriptor: ModuleDescriptorType,
  scriptName: ?string,
  initialData: ?Object,
};

export default ({
  children,
  context,
  moduleDescriptor,
  scriptName,
  initialData,
  initialBrowserContext,
}: PropsType): ReactNodeType => {
  const version: string = context.config.get('version');
  const moduleIdentifier: ?string = moduleDescriptor && moduleDescriptor.identifier;
  if (!version) throw new Error('Invalid version');

  return (
    <DefaultApp context={context}>
      <div className="react-app">
        <Helmet
          meta={[
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          ]}
          link={[
            { rel: 'stylesheet', href: assetUrl('/index.css', version) },
            { rel: 'stylesheet', href: assetUrl('/styles.css', version) },
          ]}
          script={[
            { src: 'https://polyfill.io/v2/polyfill.min.js?features=default,es6,localStorage,fetch,Intl&unknown=polyfill' },
            { innerHTML: BROWSER ? '' : (
              (`${moduleIdentifier ? `window.MODULE_IDENTIFIER='${moduleIdentifier}';` : ''}`)
              + `window.SCRIPT_NAME='${scriptName}';`
              + `window.VERSION='${version}';`
              + `window.initialData=${uneval(initialData)};`
              + (!initialBrowserContext ? '' : (
                  `window.initialBrowserContext=${uneval(initialBrowserContext)};`
              ))
            ) },
            { defer: undefined, src: assetUrl(`/${BROWSER ? window.SCRIPT_NAME : scriptName}.js`, version) },
          ]}
        />
        {children}
      </div>
    </DefaultApp>
  );
};