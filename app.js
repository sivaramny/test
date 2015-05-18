
// most basic dependencies
var express = require('express')
  , http = require('http')
  , os = require('os')
  , path = require('path')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  ,errorHandler = require('express-error-handler');
 
// create the app
var app = express();
 
// configure everything, just basic setup
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.favicon());
  //app.use(express.logger('dev'));
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
 
// simple standard errorhandler
if ('development' == app.get('env')) {
  app.use(errorHandler());
}
 
//---------------------------------------
// mini app
//---------------------------------------
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views', 'index.html'));
});

var openConnections = [];


 
// simple route to register the clients
app.get('/stats', function(req, res) {
 
    // set timeout as high as possible
    req.socket.setTimeout(Infinity);
 
    // send headers for event-stream connection
    // see spec for more information
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');
 
    // push this res object to our global variable
    openConnections.push(res);
 
    // When the request is closed, e.g. the browser window
    // is closed. We search through the open connections
    // array and remove this connection.
    req.on("close", function() {
        var toRemove;
        for (var j =0 ; j < openConnections.length ; j++) {
            if (openConnections[j] == res) {
                toRemove =j;
                break;
            }
        }
        openConnections.splice(j,1);
        console.log(openConnections.length);
    });
});
 
setInterval(function() {
    // we walk through each connection
    openConnections.forEach(function(resp) {
        var d = new Date();
        resp.write('id: ' + d.getMilliseconds() + '\n');
        resp.write('data:' + createMsg() +   '\n\n'); // Note the extra newline
    });
 
}, 1000);
 
function createMsg() {
    msg = {};
 
    msg.hostname = os.hostname();
    msg.type = os.type();
    msg.platform = os.platform();
    msg.arch = os.arch();
    msg.release = os.release();
    msg.uptime = os.uptime();
    msg.loadaverage = os.loadavg();
    msg.totalmem = os.totalmem();
    msg.freemem = os.freemem();
 
    return JSON.stringify(msg);
}
 
// startup everything
app.listen(3000,  function(){
  console.log('Express listening on port', this.address().port);
});