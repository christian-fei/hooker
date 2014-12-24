var http = require('http')
 , url = require('url')
 , querystring = require('querystring')
 , exec = require('child_process').exec
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
      console.log('>> ' + JSON.stringify(error).red);
    })
    return;
  }
  console.log( 'valid request'.green );
  executeCommandFor(req);
  res.end();
}

function logRequest(req){
  var origin = req.headers.origin || '';
  var method = req.method;
  console.log(method.magenta + ' request from '.white + origin.green);
}

function executeCommandFor(req){
  var command = getCommandFor(req);
  exec(command,
    function (error, stdout, stderr) {
      if( stdout )
        console.log('stdout: ' + stdout.white);
      if( stderr )
        console.log('stderr: ' + stderr.read);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
}

function getCommandFor(req){
  var hook = getHookFor(req);
  return config.hooks[hook];
}

function getHookFor(req){
  var origin = req.headers.origin || '';
  var query = url.parse(req.url).query;
  var queryObject = querystring.parse(query);
  return queryObject.hook;
}
function validateRequest(req,config){
  var errors = [];
  var origin = req.headers.origin || '';
  var method = req.method;

  var hook = getHookFor(req);

  if(!method.match(/^POST$/))
    errors.push('Request not POST ['+ method +']');
/*
  if(config.allowed_origins.indexOf(origin)<0)
    errors.push('Request from not allowed origin ['+ origin +']');
*/

  if( hook == undefined ){
    errors.push('No hook provided in the query')
  } else {
    if( !config.hooks[hook] )
      errors.push('Hook not found "'+ hook+'"');
  }

  return errors;
}
