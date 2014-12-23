var Q = require('q');
module.exports = function(){
  var self = this;

  self.load = function(){
    var deferred = Q.defer();
    deferred.resolve({
      "hook1": "echo 'ok'"
    });
    return deferred.promise;
  };
};
