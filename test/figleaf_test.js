var should = require('chai').should(),
	figleaf = require('..'),
	defaultPath = __dirname + '/config/pathed';
    
describe('FigLeaf', function(){
    
    it('should be able to get configuration data from supplied path', function(done) {

    	var config = figleaf({ paths: [ defaultPath ], refresh: true });
    	config.type.should.equal('pathed');

    	// Should be able to get cached config
    	config = figleaf();
    	config.type.should.equal('pathed');

        return done();    	

    });

    it('should be able to get configuration data from a path supplied in an environment variable before paths', function(done) {

    	process.env.FIGLEAF_CONFIG = __dirname + '/config/environment';

    	var config = figleaf({ env: 'FIGLEAF_CONFIG', paths: [__dirname + '/config/pathed'], refresh: true });
    	config.type.should.equal('environment');

        return done();
    });

    it('should be able to get configuration data specific to a NODE_ENV variable', function(done) {

    	process.env.NODE_ENV = 'test';
    	var config = figleaf({paths: [__dirname + '/config/pathed'], refresh: true });
    	config.type.should.equal('pathed');
    	config.variable.should.equal('This is a test');
        return done();
    });
    
});