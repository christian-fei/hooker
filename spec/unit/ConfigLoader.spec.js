describe("ConfigLoader", function(){
  var ConfigLoader = require('../../modules/ConfigLoader');
  var StubReader = require('../doubles/StubReader');

  var configLoader = new ConfigLoader(new StubReader);

  it("should load config when promise is resolved", function(done){
    configLoader.load('../config.sample.json')
    .then(function(config){
      expect( config ).toEqual( {"hook1": "echo 'ok'"} );
      done();
    });
  });
});
