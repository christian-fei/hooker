var Q = require('q');
var fs = require('fs')
var path = require('path')

module.exports = function(){
  var self = this;

  self.load = function(filelocation){
    var deferred = Q.defer();

    fs.readFile(path.join(__dirname,filelocation),'utf8', function(err,data){
      if(err){
        deferred.reject();
        return;
      }
      deferred.resolve(data);
    });

    return deferred.promise;
  };
};
