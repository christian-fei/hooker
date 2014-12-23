var Q = require('q');
module.exports = function(){
  var self = this;

  self.read = function(){
    var deferred = Q.defer();
    deferred.resolve({
      "hook1": "echo 'ok'"
    });
    return deferred.promise;
  };
};
