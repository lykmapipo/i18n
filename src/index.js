import path from 'path';
import isFunction from 'lodash/isFunction';
import { firstValue, mergeObjects, sortedUniq } from '@lykmapipo/common';
import { getString, getStringSet } from '@lykmapipo/env';
import I18N from 'i18n';

// local scoped i18n register
let i18n = {};

// TODO: grab staticCatalog from env(I18N_STATIC_CATALOGUE),
// and merge with provided

/**
 * @function withEnv
 * @name withEnv
 * @description Grab defaults from environment variables.
 * @returns {object} environment options
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * withEnv();
 * // => { defaultLocale: 'en', locales: ['en', ...], ... };
 */
export const withEnv = () => {
  // grab base path
  const BASE_PATH = getString('BASE_PATH', process.cwd());

  // grab default locale
  const defaultLocale = firstValue(
    getString('I18N_DEFAULT_LOCALE'), // node
    getString('DEFAULT_LOCALE'), // legacy
    getString('REACT_APP_I18N_DEFAULT_LOCALE'), // react
    'en' // fallback
  );

  // grab locales
  const locales = sortedUniq([
    ...getStringSet('I18N_LOCALES'), // node
    ...getStringSet('LOCALES'), // legacy
    ...getStringSet('REACT_APP_I18N_LOCALES'), // react
    ...[defaultLocale], // fallback
  ]);

  // grab query parameter
  const queryParameter = firstValue(
    getString('I18N_QUERY_PARAMETER'), // node
    getString('QUERY_PARAMETER'), // legacy
    getString('REACT_APP_I18N_QUERY_PARAMETER'), // react
    'lang' // fallback
  );

  // grab directory
  const directory = firstValue(
    getString('I18N_DIRECTORY'), // node
    getString('LOCALES_PATH'), // legacy
    getString('REACT_APP_I18N_DIRECTORY'), // react
    path.join(BASE_PATH, 'locales') // fallback
  );

  // grab directory
  const objectNotation = firstValue(
    getString('I18N_OBJECT_NOTATION'), // node
    getString('OBJECT_NOTATION'), // legacy
    getString('REACT_APP_I18N_OBJECT_NOTATION'), // react
    true // fallback
  );

  // TODO: staticCatalog

  // return
  return { locales, defaultLocale, queryParameter, directory, objectNotation };
};

/**
 * @function withDefaults
 * @name withDefaults
 * @description Merge provided options with defaults.
 * @param {object} [optns={}] provided options
 * @returns {object} merged options
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const optns = { locales: [...] };
 * const options = withDefaults(optns);
 * // => { locales: ['en', ...], ... };
 */
export const withDefaults = (optns = {}) => {
  // TODO: staticCatalog
  // TODO: isNode vs isBrowser

  // grab defaults
  let {
    locales,
    defaultLocale,
    queryParameter,
    directory,
    objectNotation,
  } = mergeObjects(withEnv());

  // merge defaults
  defaultLocale = firstValue(optns.defaultLocale, defaultLocale);
  locales = sortedUniq(
    [].concat(optns.locales).concat(locales).concat(defaultLocale)
  );
  directory = firstValue(optns.directory, directory);
  queryParameter = firstValue(optns.queryParameter, queryParameter);
  objectNotation = firstValue(optns.objectNotation, objectNotation);

  // TODO: staticCatalog

  // return options
  return { locales, defaultLocale, queryParameter, directory, objectNotation };
};

/**
 * @name configure
 * @function configure
 * @description i18n factory
 * @param {object} [optns] valid i18n options
 * @param {boolean} [optns.reset] reset i18n
 * @returns {object} i18n helpers
 * @see {@link https://github.com/mashpie/i18n-node#i18nconfigure}
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @public
 * @example
 *
 * import { configure } from '@lykmapipo/i18n';
 *
 * const i18n = configure({ ... });
 *
 * i18n.__('hello'); // Hello
 * i18n.__('hello', 'sw'); // Mambo
 *
 * i18n.t('hello'); // Hello
 * i18n.t('hello', 'sw'); // Mambo
 */
export const configure = (optns) => {
  // merge options
  const options = withDefaults(optns);

  // TODO: staticCatalog

  // configure node i18n
  const isInitialized = isFunction(i18n.t);
  const shouldReset = options.reset;
  if (!isInitialized || shouldReset) {
    options.register = i18n;
    options.api = {
      __: 't',
      __n: 'n',
      __l: 'l',
      __h: 'h',
      __mf: 'mf',
    };
    I18N.configure(options);
  }

  // export configured
  return i18n;
};

/**
 * @function reset
 * @name reset
 * @description Reset i18n internals
 * @returns {object} i18n helpers
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { reset } from '@lykmapipo/i18n';
 *
 * reset();
 * //=> undefined
 *
 */
export const reset = () => {
  i18n = {};
  return i18n;
};
