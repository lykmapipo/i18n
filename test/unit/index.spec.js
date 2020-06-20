import { expect } from '@lykmapipo/test-helpers';

import { withEnv, withDefaults, configure } from '../../src';

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

  after(() => {
    process.env.BASE_PATH = BASE_PATH;
  });
});
