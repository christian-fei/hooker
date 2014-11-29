function ConfigLoader(reader){
  var self = this;

  self.reader = reader;

  self.load = function(){
    return self.reader.load.apply(arguments);
  };
};

module.exports = ConfigLoader;
