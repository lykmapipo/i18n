'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* imports */
process.env.BASE_PATH = path.resolve(__dirname);
const i18n = require(path.join(__dirname, '..'));
const { __, __l, __h, __n } = i18n;


describe('i18n', () => { // translate

  it('should be a factory', () => {
    expect(i18n).to.exist;
    expect(i18n).to.be.a('function');
    expect(i18n.name).to.be.equal('i18n');
    expect(i18n).to.have.length(1);
  });

  describe('', () => {

    it('should be able to translate', () => {
      expect(__).to.exist;
      expect(__).to.be.a('function');
      expect(__.name).to.be.equal('translate');
      expect(__).to.have.length(3);
    });

    it('should translate(string) using default locale', () => {
      const translated = __('hello');
      expect(translated).to.exist;
      expect(translated).to.be.equal('Hello');
    });

    it('should translate(object) using default locale', () => {
      const translated = __('gender');
      expect(translated).to.exist;

      expect(translated.male).to.exist;
      expect(translated.male).to.equal('Male');
      expect(translated.male).to.be.equal(__('gender.male'));

      expect(translated.female).to.exist;
      expect(translated.female).to.be.equal('Female');
      expect(translated.female).to.be.equal(__('gender.female'));
    });

    it('should translate(string) using provided locale', () => {
      const translated = __('hello', 'sw');
      expect(translated).to.exist;
      expect(translated).to.be.equal('Mambo');
    });

    it('should translate(object) using provided locale', () => {
      const translated = __('gender', 'sw');
      expect(translated).to.exist;

      expect(translated.male).to.exist;
      expect(translated.male).to.equal('Mme');
      expect(translated.male).to.be.equal(__('gender.male', 'sw'));

      expect(translated.female).to.exist;
      expect(translated.female).to.be.equal('Mke');
      expect(translated.female).to.be.equal(__('gender.female',
        'sw'));
    });

    it('should parse and translate(string) using default locale', () => {
      const translated = __('greeting', { name: 'John' });
      expect(translated).to.exist;
      expect(translated).to.be.equal('Hello John');
    });

    it('should parse and translate(string) using provided locale', () => {
      const translated = __('greeting', 'sw', { name: 'John' });
      expect(translated).to.exist;
      expect(translated).to.be.equal('Mambo John');
    });

    it('should be able to obtain phrase translations list', () => {
      const translations = __l('hello');
      expect(translations).to.exist;
      expect(translations).to.be.an('array');
      expect(translations).to.have.length(2);
      expect(translations).to.be.eql(['Hello', 'Mambo']);
    });

    it('should be able to obtain phrase translations hash', () => {
      const translations = __h('hello');
      expect(translations).to.exist;
      expect(translations).to.be.an('array');
      expect(translations).to.have.length(2);
      expect(translations).to.be.eql([{ en: 'Hello' }, { sw: 'Mambo' }]);
    });

  });

  describe('', () => { // pluralization

    it('should be able to pluralize', () => {
      expect(__n).to.exist;
      expect(__n).to.be.a('function');
      expect(__n.name).to.be.equal('pluralize');
      expect(__n).to.have.length(3);
    });

    it('should pluralize using default locale', () => {
      const pluralized = __n('You have %s message', 0);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('You have 0 messages');
    });

    it('should pluralize using default locale', () => {
      const pluralized = __n('You have %s message', 1);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('You have 1 message');
    });

    it('should pluralize using default locale', () => {
      const pluralized = __n('You have %s message', 10);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('You have 10 messages');
    });

    it('should pluralize using specified locale', () => {
      const pluralized = __n('You have %s message', 'sw', 0);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('Una meseji 0');
    });

    it('should pluralize using specified locale', () => {
      const pluralized = __n('You have %s message', 'sw', 1);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('Una meseji 1');
    });

    it('should pluralize using specified locale', () => {
      const pluralized = __n('You have %s message', 'sw', 10);
      expect(pluralized).to.exist;
      expect(pluralized).to.equal('Una meseji 10');
    });

  });

});
