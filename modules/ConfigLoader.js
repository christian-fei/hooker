function ConfigLoader(reader){
  var self = this;

  self.reader = reader;

  self.load = function(){
    return self.reader.read.apply(arguments);
  };
};

module.exports = ConfigLoader;
