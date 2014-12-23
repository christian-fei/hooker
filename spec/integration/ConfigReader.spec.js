describe("ConfigReader", function() {
  var ConfigReader;
  beforeEach(function() {
    ConfigReader = require('../../modules/ConfigReader');
  });

  it("should read config.example.json", function(done) {
    configReader = new ConfigReader();
    configReader.read('../config.example.json')
    .then(function(config){
      expect( config ).toEqual( {"deploy": "echo 'deploying'"} );
      done();
    });

  });
});