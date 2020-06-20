import { expect } from '@lykmapipo/test-helpers';

import { withEnv, withDefaults, configure, reset, t, h, l, n } from '../../src';

describe('i18n', () => {
  const { BASE_PATH } = process.env;

  before(() => {
    process.env.BASE_PATH = `${__dirname}'/../fixtures`;
  });

  it('should use env variables options', () => {
    expect(withEnv).to.exist.and.be.a('function');
    const options = withEnv();
    expect(options.locales).to.exist;
    expect(options.defaultLocale).to.exist;
    expect(options.queryParameter).to.exist;
    expect(options.directory).to.exist;
    expect(options.objectNotation).to.exist;
  });

  it('should merge provided options with defaults', () => {
    expect(withDefaults).to.exist.and.be.a('function');
    let options = withDefaults();
    expect(options.locales).to.exist;
    expect(options.defaultLocale).to.exist;
    expect(options.queryParameter).to.exist;
    expect(options.directory).to.exist;
    expect(options.objectNotation).to.exist;

    options = withDefaults({ locales: ['sw'] });
    expect(options.locales).to.exist.and.include('sw');
    expect(options.defaultLocale).to.exist;
    expect(options.queryParameter).to.exist;
    expect(options.directory).to.exist;
    expect(options.objectNotation).to.exist;

    options = withDefaults({ defaultLocale: 'sw', locales: ['de'] });
    expect(options.locales).to.exist.and.include('sw');
    expect(options.locales).to.exist.and.include('de');
    expect(options.defaultLocale).to.exist.and.be.equal('sw');
    expect(options.queryParameter).to.exist;
    expect(options.directory).to.exist;
    expect(options.objectNotation).to.exist;
  });

  it('should expose configure factory', () => {
    expect(configure).to.exist;
    expect(configure).to.be.a('function');
    expect(configure.name).to.be.equal('configure');
    expect(configure).to.have.length(1);
  });

  it('should configure with defaults', () => {
    const i18n = configure();
    expect(i18n.t).to.exist.and.be.a('function');
    expect(i18n.n).to.exist.and.be.a('function');
    expect(i18n.l).to.exist.and.be.a('function');
    expect(i18n.h).to.exist.and.be.a('function');
    expect(i18n.mf).to.exist.and.be.a('function');
  });

  it('should ignore configure once initialize', () => {
    const i18n = configure();
    expect(i18n.t).to.exist.and.be.a('function');
    expect(i18n.n).to.exist.and.be.a('function');
    expect(i18n.l).to.exist.and.be.a('function');
    expect(i18n.h).to.exist.and.be.a('function');
    expect(i18n.mf).to.exist.and.be.a('function');
  });

  it('should re-configure with defaults', () => {
    const i18n = configure({ reset: true });
    expect(i18n.t).to.exist.and.be.a('function');
    expect(i18n.n).to.exist.and.be.a('function');
    expect(i18n.l).to.exist.and.be.a('function');
    expect(i18n.h).to.exist.and.be.a('function');
    expect(i18n.mf).to.exist.and.be.a('function');
  });

  it('should reset internals', () => {
    expect(reset).to.exist;
    expect(reset).to.be.a('function');
    expect(reset.name).to.be.equal('reset');
    expect(reset).to.have.length(0);
    expect(reset()).to.be.empty;
  });

  describe('', () => {
    // translation

    it('should translate', () => {
      expect(t).to.exist;
      expect(t).to.be.a('function');
      expect(t.name).to.be.equal('t');
      expect(t).to.have.length(3);
    });

    it('should translate(string) using default locale', () => {
      const translated = t('hello');
      expect(translated).to.exist;
      expect(translated).to.be.equal('Hello');
    });

    it('should translate(object) using default locale', () => {
      const translated = t('gender');
      expect(translated).to.exist;

      expect(translated.male).to.exist;
      expect(translated.male).to.equal('Male');
      expect(translated.male).to.be.equal(t('gender.male'));

      expect(translated.female).to.exist;
      expect(translated.female).to.be.equal('Female');
      expect(translated.female).to.be.equal(t('gender.female'));
    });

    it('should translate(string) using provided locale', () => {
      const translated = t('hello', 'sw');
      expect(translated).to.exist;
      expect(translated).to.be.equal('Mambo');
    });

    it('should translate(object) using provided locale', () => {
      const translated = t('gender', 'sw');
      expect(translated).to.exist;

      expect(translated.male).to.exist;
      expect(translated.male).to.equal('Mme');
      expect(translated.male).to.be.equal(t('gender.male', 'sw'));

      expect(translated.female).to.exist;
      expect(translated.female).to.be.equal('Mke');
      expect(translated.female).to.be.equal(t('gender.female', 'sw'));
    });

    it('should parse and translate(string) using default locale', () => {
      const translated = t('greeting', { name: 'John' });
      expect(translated).to.exist;
      expect(translated).to.be.equal('Hello John');
    });

    it('should parse and translate(string) using provided locale', () => {
      const translated = t('greeting', 'sw', { name: 'John' });
      expect(translated).to.exist;
      expect(translated).to.be.equal('Mambo John');
    });

    it('should obtain phrase translations list', () => {
      const translations = l('hello');
      expect(translations).to.exist;
      expect(translations).to.be.an('array');
      expect(translations).to.have.length(2);
      expect(translations).to.be.eql(['Hello', 'Mambo']);
    });

    it('should obtain phrase translations hash', () => {
      const translations = h('hello');
      expect(translations).to.exist;
      expect(translations).to.be.an('array');
      expect(translations).to.have.length(2);
      expect(translations).to.be.eql([{ en: 'Hello' }, { sw: 'Mambo' }]);
    });
  });

  describe('', () => {
    // pluralization

    it('should be able to pluralize', () => {
      expect(n).to.exist;
      expect(n).to.be.a('function');
      expect(n.name).to.be.equal('n');
      expect(n).to.have.length(3);
    });

    it('should pluralize using default locale', () => {
      const pluralized = n('You have %s message', 0);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('You have 0 messages');
    });

    it('should pluralize using default locale', () => {
      const pluralized = n('You have %s message', 1);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('You have 1 message');
    });

    it('should pluralize using default locale', () => {
      const pluralized = n('You have %s message', 10);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('You have 10 messages');
    });

    it('should pluralize using specified locale', () => {
      const pluralized = n('You have %s message', 'sw', 0);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('Una meseji 0');
    });

    it('should pluralize using specified locale', () => {
      const pluralized = n('You have %s message', 'sw', 1);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('Una meseji 1');
    });

    it('should pluralize using specified locale', () => {
      const pluralized = n('You have %s message', 'sw', 10);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('Una meseji 10');
    });
  });

  after(() => {
    process.env.BASE_PATH = BASE_PATH;
  });
});
