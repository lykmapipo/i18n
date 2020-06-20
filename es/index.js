import path from 'path';
import clone from 'lodash/clone';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import trim from 'lodash/trim';
import { firstValue, sortedUniq, mergeObjects } from '@lykmapipo/common';
import { getString, getStringSet, getObject } from '@lykmapipo/env';
import I18N from 'i18n';

// local scoped i18n registry
let i18n = {};

/**
 * @function withEnv
 * @name withEnv
 * @description Grab defaults from environment variables
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
const withEnv = () => {
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

  // grab staticCatalog
  const staticCatalog = firstValue(
    getObject('I18N_STATIC_CATALOG'), // node
    getObject('STATIC_CATALOG'), // legacy
    getObject('REACT_APP_I18N_STATIC_CATALOG'), // react
    undefined // fallback
  );

  // return
  return mergeObjects({
    locales,
    defaultLocale,
    queryParameter,
    directory,
    objectNotation,
    staticCatalog,
  });
};

/**
 * @function withDefaults
 * @name withDefaults
 * @description Merge provided options with defaults
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
const withDefaults = (optns = {}) => {
  // TODO: isNode vs isBrowser

  // grab defaults
  let {
    locales,
    defaultLocale,
    queryParameter,
    directory,
    objectNotation,
    staticCatalog,
  } = mergeObjects(withEnv());

  // merge defaults
  defaultLocale = firstValue(optns.defaultLocale, defaultLocale);
  locales = sortedUniq(
    [].concat(optns.locales).concat(locales).concat(defaultLocale)
  );
  directory = firstValue(optns.directory, directory);
  queryParameter = firstValue(optns.queryParameter, queryParameter);
  objectNotation = firstValue(optns.objectNotation, objectNotation);

  staticCatalog = mergeObjects(staticCatalog, optns.staticCatalog);
  staticCatalog = isEmpty(staticCatalog) ? undefined : staticCatalog;

  // return options
  return mergeObjects({
    locales,
    defaultLocale,
    queryParameter,
    directory,
    objectNotation,
    staticCatalog,
  });
};

/**
 * @name configure
 * @function configure
 * @description i18n factory
 * @param {object} [optns={}] valid i18n options
 * @param {boolean} [optns.reset=false] reset i18n
 * @returns {object} i18n helpers
 * @see {@link https://github.com/mashpie/i18n-node#i18nconfigure}
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.2.0
 * @version 0.1.0
 * @license MIT
 * @public
 * @example
 *
 * import { configure } from '@lykmapipo/i18n';
 *
 * const i18n = configure({ ... });
 *
 * i18n.t('hello'); // => Hello
 * i18n.t('hello', 'sw'); // => Mambo
 */
const configure = (optns) => {
  // merge options
  const options = withDefaults(optns);

  // configure node i18n
  const isInitialized = isFunction(i18n.t);
  const shouldReset = optns && optns.reset;
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
 * // => undefined
 *
 */
const reset = () => {
  i18n = {};
  return i18n;
};

/**
 * @name t
 * @function t
 * @description Translates a single phrase and adds it to locales if unknown
 * @param {string} phrase localized phrase
 * @param {string} [locale=en] locale to use in translation or default
 * @param {object} [optns={}] data to use on parse and substitution
 * @returns {string} translated parsed and substituted string
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { t } from '@lykmapipo/i18n';
 *
 * t('hello'); // => Hello
 * t('hello', 'sw'); // => Mambo
 * t('greeting', { name: 'John' }); // => Hello John
 * t('greeting', 'sw', { name: 'John' }); // => Mambo John
 *
 */
const t = (phrase, locale, optns) => {
  // ensure initialize
  configure();

  // obtain defaults
  const { defaultLocale } = withDefaults();

  // ensure params
  const localPhrase = clone(phrase);
  const localLocale = isString(locale)
    ? clone(trim(locale) || defaultLocale)
    : defaultLocale;
  const options = isPlainObject(locale)
    ? mergeObjects(locale)
    : mergeObjects(optns);

  // translate
  const translated = i18n.t(
    { phrase: localPhrase, locale: localLocale },
    options
  );

  // return translated
  return translated;
};

/**
 * @name l
 * @function l
 * @description Provides list of translations for a given phrase in
 * each language
 * @param {string} phrase localized phrase
 * @returns {string} translated parsed and substituted string
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { l } from '@lykmapipo/i18n';
 *
 * l('hello');
 * // => [ 'Hello', 'Mambo' ]
 *
 */
const l = (phrase) => {
  // ensure initialize
  configure();

  // ensure params
  const localPhrase = clone(phrase);

  // obtain translations
  const translates = i18n.l(localPhrase);

  // return translates
  return translates;
};

/**
 * @name h
 * @function h
 * @description Provides hashed list of translations for a given phrase in
 * each language.
 * @param {string} phrase localized phrase
 * @returns {string} translated parsed and substituted string
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { h } from '@lykmapipo/i18n';
 *
 * h('hello');
 * // => [ { en: 'Hello' }, { sw: 'Mambo'} ]
 *
 */
const h = (phrase) => {
  // ensure initialize
  configure();

  // ensure params
  const localPhrase = clone(phrase);

  // obtain translations hash list
  const translates = i18n.h(localPhrase);

  // return translates
  return translates;
};

/**
 * @name n
 * @function n
 * @description Plurals translation of a single phrase
 *
 * Note: Singular and plural forms will get added to locales if unknown
 *
 *
 * @param {string} phrase localized phrase
 * @param {string} [locale=en] locale to use in translation or default
 * @param {number} [count=0] count to use on parse and substitution
 * @returns {string} translated parsed and substituted string based on last
 * count parameter
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { n } from '@lykmapipo/i18n';
 *
 * n('You have %s message', 1); // => You have 1 message
 * n('You have %s message', 'sw', 1); // => Una meseji 1
 * n('You have %s message', 4); // => You have 4 messages
 * n('You have %s message', 'sw', 4); // => Una meseji 4
 *
 */
const n = (phrase, locale, count) => {
  // ensure initialize
  configure();

  // obtain defaults
  const { defaultLocale } = withDefaults();

  // ensure params
  const localPhrase = clone(phrase);
  const localLocal = isString(locale)
    ? clone(trim(locale) || defaultLocale)
    : defaultLocale;
  const localCount = isNumber(locale) ? clone(locale) : clone(count || 0);

  // pluralize
  // see https://github.com/mashpie/i18n-node#pluralization
  const options = {
    singular: localPhrase,
    plural: localPhrase,
    locale: localLocal,
    count: localCount,
  };
  const pluralized = i18n.n(options);

  // return pluralized
  return pluralized;
};

/**
 * @name catalog
 * @function catalog
 * @description Provide a whole transalation catalog of a given locale
 * @param {string} [locale] locale to obtain catalog for.
 * @returns {object} translation catalog
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.2.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { catalog } from '@lykmapipo/i18n';
 *
 * catalog();
 * // => { en: { ... }, sw: { ... }, ... };
 *
 * catalog('en');
 * // => { en: { ... } };
 *
 */
const catalog = (locale) => {
  // ensure initialize
  configure();

  // obtain locales catalog
  const localeCatalog = i18n.getCatalog(locale);

  // return localeCatalog
  return mergeObjects(localeCatalog);
};

export { catalog, configure, h, l, n, reset, t, withDefaults, withEnv };
