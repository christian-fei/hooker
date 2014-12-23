var http = require('http')
 , colors = require('colors')
 , ConfigReader = require('./modules/ConfigReader')
 , configReader = new ConfigReader


var HTTP_PORT = process.env.HOOKER_HTTP_PORT || 8080
  , CONFIG = process.env.HOOKER_CONFIG || 'config.json'
  , config = {}

configReader.read(CONFIG).then(function(_config){
  config = _config;
  startServer();
}, function(){
  console.log('failed to load configuration file['+CONFIG+']'.red.bold);
})

function startServer(){
  http.createServer(requestListener)
    .listen(HTTP_PORT,'0.0.0.0')
  console.log('HOOKER'.green + ' listening on http://0.0.0.0:'+HTTP_PORT);
}


function requestListener(req,res){
  logRequest(req);
  var errors = validateRequest(req,config);
  if( errors.length>0 ){
    res.end();
    errors.forEach(function(error){
      console.log('>> ' + error.red);
    })
    return;
  }
  console.log( 'valid request'.green );
  res.end();
}

function logRequest(req){
  var origin = req.headers.origin || '';
  var method = req.method;
  console.log(method.magenta + ' request from '.white + origin.green);
}

function validateRequest(req,config){
  var errors = [];
  var origin = req.headers.origin || '';
  var method = req.method;

  if(method.match(/^POST$/))
    errors.push('Request not POST ['+ method +']');
  if(config.allowed_origins.indexOf(origin)<0)
    errors.push('Request from not allowed origin ['+ origin +']');

  return errors;
}