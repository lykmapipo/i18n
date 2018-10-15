'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const internationalization = require('i18n');
const { getString, getStrings } = require('@lykmapipo/env');


/* constants */
const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
const LOCALES = getStrings('LOCALES', [].concat(DEFAULT_LOCALE));
const BASE_PATH = getString('BASE_PATH', process.cwd());
const LOCALES_PATH = getString('LOCALES_PATH', path.join(BASE_PATH, 'locales'));


/* defaults */
const defaults = {
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  directory: LOCALES_PATH,
  objectNotation: true,
  queryParameter: 'lang'
};


/* helpers */
function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    let value = _.compact([].concat(objValue).concat(srcValue));
    value = _.uniq(value);
    return value;
  }
}


/* setup */
let _i18n = {}; // local scoped i18n register


/**
 * @name i18n
 * @function i18n
 * @description i18n factory
 * @param {Object} [options] valid node i18n options
 * @return {Object} i18n helpers
 * @see {@link https://github.com/mashpie/i18n-node#i18nconfigure}
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @public
 * @example
 *
 * const { __ } = require('@lykmapipo/i18n');
 *
 * __('hello'); // Hello
 * __('hello', 'sw'); // Mambo
 *
 */
function i18n(options) {

  // merge options
  const _options = _.mergeWith({}, defaults, options, customizer);

  // configure node i18n
  if (!_i18n || !_i18n.__ || _options.reset) {
    _options.register = _i18n;
    internationalization.configure(_options);
  }

  // export configured
  return i18n;

}


/**
 * @name reset
 * @function reset
 * @description reset i18n internals
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @public
 * @static
 * @example
 *
 * const { reset } = require('@lykmapipo/i18n');
 * reset();
 *
 */
i18n.reset = function reset() {

  // clear i18n instance
  if (_i18n && _i18n.__) {
    _i18n = null;
  }

};


/**
 * @name __
 * @function __
 * @description Translates a single phrase and adds it to locales if unknown.
 * Returns translated parsed and substituted string.
 * @param {String} phrase localized phrase
 * @param {String} [locale=en] locale to use in translation. Use default if not
 * provided
 * @param {Object} [options={}] data to use on parse and substitution
 * @return {String} translated parsed and substituted string
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @public
 * @static
 * @example
 *
 * const { __ } = require('@lykmapipo/i18n');
 *
 * __('hello'); // Hello
 * __('hello', 'sw'); // Mambo
 * __('greeting', { name: 'John' }); // Hello John
 * __('greeting', 'sw', { name: 'John' }); // Mambo John
 *
 */
i18n.__ = function translate(phrase, locale, options) {

  // ensure initialize
  i18n();

  // ensure params
  const _phrase = _.clone(phrase);
  const _locale =
    (_.isString(locale) ? _.clone(locale || DEFAULT_LOCALE) : DEFAULT_LOCALE);
  const _options =
    (_.isPlainObject(locale) ? _.merge({}, locale) : _.merge({}, options));

  // translate
  const translated =
    _i18n.__({ phrase: _phrase, locale: _locale }, _options);

  // return translated
  return translated;

};


/**
 * @name __l
 * @function __l
 * @description Provides list of translations for a given phrase in each
 * language
 * @param {String} phrase localized phrase
 * @return {String} translated parsed and substituted string
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @public
 * @static
 * @example
 *
 * const { __l } = require('@lykmapipo/i18n');
 *
 * __l('hello'); // --> [ 'Hello', 'Mambo' ]
 *
 */
i18n.__l = function translationList(phrase) {

  // ensure initialize
  i18n();

  // ensure params
  const _phrase = _.clone(phrase);

  // obtain translations
  const translates = _i18n.__l(_phrase);

  // return translates
  return translates;

};


/**
 * @name __h
 * @function __h
 * @description Provides hashed list of translations for a given phrase in
 * each language.
 * @param {String} phrase localized phrase
 * @return {String} translated parsed and substituted string
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @public
 * @static
 * @example
 *
 * const { __h } = require('@lykmapipo/i18n');
 *
 * __h('hello'); // --> [ { en: 'Hello' }, { sw: 'Mambo'}]
 *
 */
i18n.__h = function translationHashList(phrase) {

  // ensure initialize
  i18n();

  // ensure params
  const _phrase = _.clone(phrase);

  // obtain translations hash list
  const translates = _i18n.__h(_phrase);

  // return translates
  return translates;

};


/**
 * @name __n
 * @function __n
 * @description Plurals translation of a single phrase.
 * Singular and plural forms will get added to locales if unknown.
 * Returns translated parsed and substituted string based on last
 * count parameter.
 * @param {String} phrase localized phrase
 * @param {String} [locale=en] locale to use in translation. Use default if not
 * provided
 * @param {Number} [count=0] count to use on parse and substitution
 * @return {String} translated parsed and substituted string based on last
 * count parameter
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @public
 * @static
 * @example
 *
 * const { __ } = require('@lykmapipo/i18n');
 *
 * __n('You have %s message', 1); // You have 1 message
 * __n('You have %s message', 'sw', 1); // Una meseji 1
 * __n('You have %s message', 4); // You have 4 messages
 * __n('You have %s message', 'sw', 4); // Una meseji 4
 *
 */
i18n.__n = function pluralize(phrase, locale, count) {

  // ensure initialize
  i18n();

  // ensure params
  const _phrase = _.clone(phrase);
  const _locale =
    (_.isString(locale) ? _.clone(locale || DEFAULT_LOCALE) : DEFAULT_LOCALE);
  const _count =
    (_.isNumber(locale) ? _.clone(locale) : _.clone(count || 0));


  // pluralize
  // see https://github.com/mashpie/i18n-node#pluralization
  const _options =
    ({ singular: _phrase, plural: _phrase, locale: _locale, count: _count });
  const pluralized = _i18n.__n(_options);


  // return pluralized
  return pluralized;

};


/* exports i18n factory */
exports = module.exports = i18n;
