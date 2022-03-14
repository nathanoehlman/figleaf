const { expect } = require('chai');
const figleaf = require('..');
const defaultPath = __dirname + '/config/pathed';

describe('FigLeaf', function () {
  it('should be able to get configuration data from supplied path', function () {
    const config1 = figleaf({paths: [defaultPath], refresh: true});
    expect(config1.type).equal('pathed');

    // Should be able to get cached config
    const config2 = figleaf();
    expect(config2).equal(config1);
  });

  it('should be able to get configuration data from a path supplied in an environment variable before paths', function () {
    process.env.FIGLEAF_CONFIG = __dirname + '/config/environment';
    let config = figleaf({env: 'FIGLEAF_CONFIG', paths: [__dirname + '/config/pathed'], refresh: true});
    expect(config.type).equal('environment');
  });

  it('should be able to get configuration data specific to a NODE_ENV variable', function () {
    process.env.NODE_ENV = 'test';
    const config = figleaf({paths: [__dirname + '/config/pathed'], refresh: true});
    expect(config.type).equal('pathed');
    expect(config.variable).equal('This is a test');
  });
});
