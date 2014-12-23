var Q = require('q');
var fs = require('fs')
var path = require('path')

module.exports = function(){
  var self = this;

  self.read = function(filelocation){
    var deferred = Q.defer();

    fs.readFile(path.join(__dirname,filelocation),'utf8', function(err,data){
      if(err){ 
        return deferred.reject();
      }
      
      try {
        deferred.resolve(JSON.parse(data));
      }catch(e){
        deferred.reject();
      }
    });

    return deferred.promise;
  };
};
