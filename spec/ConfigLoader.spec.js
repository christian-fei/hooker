describe("ConfigLoader", function(){
  var ConfigLoader = require('../modules/ConfigLoader');
  var StubReader = require('./doubles/StubReader');

  var configLoader = new ConfigLoader(new StubReader);

  it("should pass", function(){
    var config = configLoader.load('../config.sample.json');

    expect( config ).toEqual( {} );
  });

});
